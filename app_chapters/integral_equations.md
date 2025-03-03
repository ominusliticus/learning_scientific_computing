# Integral Equations

In this chapter, we will discuss Fredholm integral equations of the second kind.
These lend themselves well to iterative methods without a need to descretize your integration domain.
Solutions obtained by such an iterative method go by the name of _Liouville-Neumann series_.
We will start with a one-dimensional example comparing two discretization methods to evaluate the integral over the integration domain.
Then, we will introduce terminology and formalsm that should let you tackle $d$-dimensional integral equations.
Solving coupled Fredholm integral equations of the second kind will follow a similar logic.

## The one-dimensional case

Our Fredholm integral equation takes the form

$$
\phi(x)= f(x) + \lambda \int_a^b K(x, y) \phi(y) dy,
$$ (1-d-fredholm)

where $\phi(x)$ is the function we are looking for and $K(x, y)$ is called the _kernel_.
If $f(x) \equiv 0$, the integral equation become a first kind type integral equation, and is no longer amenable to the procedure we layout below.
If either $a$, or $b$ are unbounded, the integral equation is said to be _singular_.
For now, we assume these values are finite.
The constant $\lambda$, controls how quickly the iterative process converges to the solution, i.e., it determines the radius of convergence.
If the the integral equation is linear ($\phi(x)$ only appears with exponent 1), then $\lambda$ is called the _eigenvalue_ fo the kernel.

As an example, we will solve the separable integral equation with $K(x,y)= xy$ and $f(x) = x$.
This integral equation has the solution 

$$
\phi(x) = \frac{3x}{3 -\lambda}.
$$ (exact-soln-1d)

From the solution, we can tell that the radius of convergence is 3.

The Liouville-Neumann series is very simple: it says the solution is given by

$$
\phi(x) = \sum_{n=0}^\infty \lambda^n u_n(x),
$$ (liouville-neumann-1d)

where $u_n(x)$ is given by 

$$
u_n(x) = \int_a^b \cdots \int_a^b K(x, y_n) \cdots K(x, y_1) f(y_1) dy_1 \cdots dy_n,
$$ (liouvill-neumann-1d-summand)

and $u_0(x) = f(x)$.


### The simple discretization

A simple discretization of integration domain amounts to splitting the interval $[a,b]$ up into $N$ even chunks.
The first iteration is simple $u_0(x_i) = f(x_i)$, for $i={1,\ldots,N}$.
Each subsequent update uses Riemann sums to evaluate the integral

$$
u_n(x_i) = \sum_{j=1}^N K(x_i, y_j) u_{n-1}(y_j) \Delta y.
$$ (liouville-neumann-1d-summand-riemann)

This solution improves in accuracy with the larger number of subdivisions $N$.
Written in code, we have

``````{margin}
```{note}
In the code snippet, we use a different definition for $u_n(x)$, call it $\bar u_n(x)$.
The two are related by $\bar u_n(x) = \lambda^n u_n(x)$.
This allows us to write $\phi(x) = \sum_n \bar u_n(x0)$.
This is, in our opinion, much cleaner.
```
``````
```c++
#include <array>
#include <algorithm>
#include <cmath>

// InitialCondition - is a template parameter that represent a function with one argument of the 
//                    the type T
// Kernel           - is a template parameter that represent a function with two arguments, both 
//                    of type T
// bins             - is non-type templatew parameter that keeps track of the number of 
//                    subdivisions in the integration region, and is made a compile constant to 
//                    minimize allocation calls.
template<int bins, typename T, typename InitialCondition, typename Kernel>
static inline std::array<T, bins + 1> 
liouville_neumann_series(
    InitialCondition initial_condition_func,
    Kernel kernel_func,
    T lower_limit,
    T upper_limit,
    T lambda,
    int max_iteration) 
{
    using vec = std::array<T, bins + 1>;
    vec domain;
    vec soln;
    vec u_n;
    vec u_old;

    auto delta = (upper_limit - lower_limit) / static_cast<T>(bins);
    std::ranges::generate(domain, [n=0, lower_limit, delta]() mutable {
            return lower_limit + static_cast<T>(n++) * delta; });

    std::ranges::generate(soln, [n=0, initial_condition_func, &domain]() mutable {
            return initial_condition_func(domain[n++]); });
    copy_array(soln, u_old);

    auto integration = [kernel_func, lambda, &domain, delta](auto const& func, auto index) {
        auto integral = static_cast<T>(0.0);
        auto n = 0;
        // Riemann sum over integration domain
        for (auto const&  value : domain)
            integral += lambda * kernel_func(domain[index], value) * func[n++] * delta;

        return integral;
    };
    for (int iteration = 0; iteration < max_iteration; ++iteration)
    {
        auto k = 0;
        for (auto& value : u_n)
        {
            value = integration(u_old, k);
            soln[k] += value;
            ++k;
        }
        copy_array(u_n, u_old);
    }

    return soln; 
}
```

where we have introduced the convenience function

```c++
template<template<typename, auto> class Array, typename T, auto N>
static inline void 
copy_array(const Array<T, N>& source, Array<T, N>& target)
{
    auto n = 0;
    for (auto const& value : source)
        target[n++] = value;
}
```

Further below, we will preform a comparison with the analytic result.o


### Using quadrature

This implementation is not too different, in fact, a lot of the code can be reused.
We use Gauss-Legendre roots $\{\xi_i\}$ and weights $\{w_i\}$.
The roots $\{\xi_i\}$, $i=1,\ldots,N$, to represents the evaluation points in an interval $[-1,1]$.
The points in the interval $[a,b]$ are then $x_i = \frac{1}{2}[(a - b) \xi_i + (a + b)]$.
The first iteration is initialzed as be before, however, the subsequent updates now become

$$
u_n(x_i) = \frac{b - a}{2}\sum_{j=1}^N w_jK(x_i, y_j) u_{n-1}(y_j)
$$ (liouville-neumann-1d-summand-quadrature)

to calculate the roots, given the integer $N$, we use the `get_root_and_wweights` function
we introduced in the {ref}`Numerical Integration <ch:numerical_integration>` chapter.
The factor of $(b - a)/2$ arise from the Jacobian of changing the integration variables from $x_i$ to 
$\xi_i$ (this detail is hidden in the formula we have written).

```c++
template<int bins, typename T, typename InitialCondition, typename Kernel>
static inline std::array<T, bins + 1> 
liouville_neumann_series_quadrature(
    InitialCondition initial_condition_func,
    Kernel kernel_func,
    T lower_limit,
    T upper_limit,
    T lambda,
    int max_iteration) 
{
    using vec = std::array<T, bins + 1>;
    vec domain;
    vec soln;
    vec u_n;
    vec u_old;

    integration::get_roots_and_weights<double>(bins + 1);
    using integration::roots;
    using integration::weights;

    std::ranges::generate(domain, [n=0, lower_limit, upper_limit]() mutable {
            return 0.5 * ((upper_limit - lower_limit) * roots[n++] 
                + (upper_limit + lower_limit)); });

    std::ranges::generate(soln, [n=0, initial_condition_func, &domain]() mutable {
            return initial_condition_func(domain[n++]); });
    copy_array(soln, u_old);

    auto integration = [kernel_func, lambda, &domain, lower_limit, upper_limit](
            auto const& func,
            auto index) {
        auto integral = static_cast<T>(0.0);
        auto n = 0;
        // Riemann sum over integration domain
        for (auto const&  value : domain)
            integral += lambda * kernel_func(domain[index], value) * func[n] * weights[n++];

        return integral * (upper_limit - lower_limit) / 2.0;
    };
    for (int iteration = 0; iteration < max_iteration; ++iteration)
    {
        auto k = 0;
        for (auto& value : u_n)
        {
            value = integration(u_old, k);
            soln[k] += value;
            ++k;
        }
        copy_array(u_n, u_old);
    }

    return soln; 
}
```


### Comparison with analytic solution

Below we compare the analytic solution and the numerical ones described above in the interval $[0, 1]$.
We also compare the preformance for difference values of $\lambda$.
As the table shows, the quadrature converges to the analytic solution nicely, while the simple discretization needs _A LOT_ of subdivision to get close.


The program used to generate these tables is given below and is available [here](https://codeberg.org/ominusliticus/numath/integral_equations/main.cpp).
<details>

  <summary> Click to see code snippet  </summary>

  ```c++
  #include <algorithm>
  #include <array>
  #include <iomanip>
  
  #include "../print.hpp"
  #include "liouville-neumann_series.hpp"
  #include "../integration/gauss-legendre_quadrature.hpp"
  
  static constexpr int bins           = 40;
  static constexpr double low         = 0.0;
  static constexpr double high        = 1.0;
  static constexpr double lambda      = 0.1;
  static constexpr double delta       = (high - low) / static_cast<double>(bins);
  static constexpr int max_iterations = 10;
  
  using vec = std::array<double, bins + 1>;
  using integral_equation::liouville_neumann_series;
  using integral_equation::liouville_neumann_series_quadrature;
  
  void print_comparison_riemann(const vec& analytic, const vec& numeric)
  {
      auto n = bins / 10;
      println(std::fixed);
      println(analytic[0], numeric[0]);
      for (int i = n; i < bins; i += n)
          println(analytic[i], numeric[i]);
      println(analytic[bins], numeric[bins]);
      println();
  }
  
  void  test_riemann()
  {
      vec a;
      std::ranges::generate(a, [n=0]() mutable { 
              return low + static_cast<double>(n++) * delta; });
      // analytic solution
      for (auto& x : a)
          x = 3.0 * x / (3.0 - lambda);
  
  
      auto b = liouville_neumann_series<bins>(
              [](double x){return x;},
              [](double x, double y){ return x * y; },
              low, high, lambda, max_iterations);
      print_comparison_riemann(a, b);
  }
  
  using vec2 = std::array<double, bins>;
  
  void print_comparison_quadrature(const vec2& analytic, const vec2& numeric)
  {
      auto n = bins / 10;
      println(std::fixed);
      println(analytic[0], numeric[0]);
      for (int i = 0; i < bins; i += n)
         println(analytic[i + 1], numeric[i + 1]);
      println();
  }
  
  void  test_quadrature()
  {
      vec2 a;
      integration::get_roots_and_weights(bins);
      using integration::roots;
      using integration::weights;
  
      std::ranges::generate(a, [n=0]() mutable {
              return 0.5 * ((high - low) * roots[n++] + (high + low)); });
      // analytic solution
      for (auto& x : a)
          x = 3.0 * x / (3.0 - lambda);
  
  
      auto b = liouville_neumann_series_quadrature<bins>(
              [](double x){return x;},
              [](double x, double y){ return x * y; },
              low, high, lambda, max_iterations);
      print_comparison_quadrature(a, b);
  }
  
  
  int main()
  {
      println(bins, lambda);
      // test_riemann();
      test_quadrature();
      return 0;
  }
  ```

</details>


## The two-dimensional case

In two dimensions, we will write the Fredholm integral equation as

$$
\phi(\vec x) = f(\vec x) + \lambda \int_\Omega K(\vec x, \vec y) \phi(\vec x) d^2 y.
$$ (fredholm-equation-2d)

Here $\Omega$ denotes the integration domain, which we leave unspecified.
As a practive problem, we will solve a Poisson equation by recasting it as a _boundary integral equation_.
The details will be left to that subsection.

As before, we construct our solution iteratively,

$$
\phi(\vec x) = \sum_{n=0}^\infty \lambda^n u_n(\vec x),
$$ (liouville-neumann-2d)

with $u_n(\vec x)$ defined as 

$$
u_n(\vec x) = \int_\Omega K(\vec x, \vec y) u_{n - 1}(\vec y) d^2 y,
$$ (liouville-neumann-2d-summand)

and $u_0(\vec x) = f(\vec x)$.

### Evaluation via quadrature: the Nyström method

We jump straight to quadrature, as Riemann sums are far too inefficient for numerical evaluation.
We can choose the number of roots sufficient large, se $N=40$, to populate our domain adequately.
Note, in our example calculations we use Gauss-Legendre quadrature, however, Gauss-Lebatto-Legendre quadrature is used more commonly as it includes evaluation of the end points.

The two dimensional analog, assuming a rectanular integration domain, of Eq. {eq}`liouville-neumann-1d-summand-quadrature` is

$$
u_n(x_{1i}, x_{2j}) = \frac{b_2 - a_2}{2}\frac{b_1 - a_1}{2}\sum_{m=1}^N \sum_{n=1}^N w_m w_n K(x_{1i}, x_{2j}, y_{1m}, y_{2n}) u_{n-1}(y_{1m}, y_{2n}).
$$ (liouvill-neumann-2d-summand-quadrature)

where we have choosen to write out the components of the vectors $\vec x = (x_1\ \ x_2)^\mathsf{T}$ and $\vec y = (y_1\ \ y_2)^\mathsf{T}$.
The code implementation is 

```c++
Nothing here yet
```

### Evaluation via Galerkin methods

```{margin}
Much of this discussion is taken from {cite}`Atkinson1987TheDG`. 

```
The Galerkin method takes our integral equation, and converts it to a linear algebra problem for matrix inversion.
At the core of the methods are two discretizations: (1) discretization of the integration domain $\Omega to \Omega_h$, and (2) a _discretization_ of the unknown function.
The ladder means that we choose to represent our unknown function $\phi(\vec x)$ with unknown coefficients $\phi_i$ and known orthogonal basis functions $\eta_i(\vec x)$ for $\Omega_h$

$$
\phi(\vec x) = \sum_{i=1}^N \phi_i \eta_i(\vec x).
$$ (phi-discretization)

A common choice for the basis functions in _finitie element analysis_ are [hat functions](https://en.wikipedia.org/wiki/Triangular_function).
In our application below, we will assume that the basis is represented by Lagrange interpolants, which will require a little more discussion.

The integrals are evaluated via quadrature.
We introduce the notation

$$
\vec x_p = \frac{1}{2}[(\vec b - \vec a) \xi_p + (\vec b + \vec a)],
$$ (interpolant-nodes)

where the $\{\xi_i\}$, $i=1,\ldots,R$ are the nodes for our quadrature scheme (for us this is Gauss-Legendre).

We can multiply both sides of Eq. {eq}`fredholm-equation-2d`, by the basis $\eta_j(\vec x)$ and integrate. This gives us the system

\begin{align}
\sum_{p=1}^R \sum_{i=1}^N w_p \phi_i \eta_i(\vec x_p) \eta_j(\vec x_p)
&=
\sum_{p=1}^R w_p f(\vec x_p) \eta_j(\vec x_p)
\\
&\qquad
+
\lambda \sum_{p=1}^R \sum_{q=1}^R \sum_{i=1}^N w_p w_q \phi_i K(\vec x_p, \vec x_q) \eta_i(\vec x_q) \eta_j(\vec x_p).
\end{align}

This equation can be simplified if we make the identification

$$
\mathsf H_{ip} = \eta_i(\vec x_p), 
\qquad   
\mathsf K_{pq} = K(\vec x_p, \vec x_q),
\qquad
f_p = f(\vec x_p),
\qquad
\mathsf W = \text{diag}(w_1, \ldots, w_R).
$$

Then this system is written succinctly as

$$
\mathsf H \mathsf W \mathsf H^\mathsf{T} \vec \phi
& =
\mathsf H \mathsf W \vec f
+
\lambda \mathsf H \mathsf W \mathsf K \mathsf W \mathsf H^\mathsf{T} \vec \phi
\\
\mathsf H^\mathsf{T} \vec \phi 
& =
\vec f 
+
\lambda \mathsf K \mathsf W \mathsf H^\mathsf{T} \vec \phi.
$$ (fredholm-equation-galerkin-matrix-form)

The system is solved as

$$
\vec \phi 
=
(\mathsf H^\mathsf{T} - \lambda \mathsf K \mathsf W \mathsf H^\mathsf{T})^{-1} \vec f.
$$ (fredholm-equation-galerkin-matrix-soln)



### Application: 2-d Poisson Equation



## Bibliography 

```{bibliography}
:filter: docname in docnames
```
