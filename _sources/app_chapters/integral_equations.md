# Integral Equations

In this chapter, we will discuss Fredholm integral equations of the second kind.
These lend themselves well to iterative methods without a need to descretize your integration domain.
Solutions obtained by such an iterative method go by the name of _Liouville-Neumann series_.
We will start with a one-dimensional example comparing a discretized integration domain to a non-descretized one.
Such non-discreized solutions are most commonly obtained using Lagrange interpolation polynomials, however, for the sake of this tutorial, we will avoid this complication.
Then, we will introduce terminology and formalsm that should let you tackle $d$-dimensional integral equations.
Solving coupled Fredholm integral equations of the second kind will follow a similar logic.

## The one-dimensional case

Our Fredholm integral equation takes the form

$$
\phi(x) + \lambda \int_a^b K(x, y) \phi(y) dy = f(x),
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
$$

where $u_n(x)$ is given by 

$$
u_n(x) = \int_a^b \cdots \int_a^b K(x, y_n) \cdots K(x, y_1) f(y_1) dy_1 \cdots dy_n,
$$

and $u_0(x) = f(x)$.


### The simple discretization

A simple discretization of integration domain amounts to splitting the interval $[a,b]$ up into $N$ even chunks.
The first iteration is simple $u_0(x_i) = f(x_i)$, for $i={1,\ldots,N}$.
Each subsequent update uses Riemann sums to evaluate the integral

$$
u_n(x_i) = \sum_{j=1}^N K(x_i, y_j) u_{n-1}(y_j) \Delta y.
$$

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
u_n(x_i) = \sum_{j=1}^N w_jK(x_i, y_j) u_{n-1}(y_j)
$$

to calculate the roots, given the integer $N$, we use the `get_root_and_wweights` function
we introduced in the {ref}`Numerical Integration <ch:numerical_integration>` chapter.

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
