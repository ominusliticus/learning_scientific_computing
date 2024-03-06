# Linear Interpolation

## Background

Linear interpolation is a method to estimate the value of a function given a finite set of known points.
It can be useful when evaluating a function can be useful when a function needs to be evaluated repeatedly, but is rather expensive to call, like `exp` function.
A quick optimization is then to evaluate the function at a selected number of points $\{x_n\}$ and store the evaluations $\{f(x_n)\}$.
Then for any other $x$, given $k$ and $k+1$ such that $x_k \leq x \leq x_{k+1}$, $f(x)$ is given by

$$ 
f(x) = f(x_k) + \frac{f(x_{k+1}) - f(x_k)}{x_{k+1} - x_k} (x - x_k).
$$ (simple-linear-interp)

The fraction in the second term should be interpreted as the slope between the two know points $x_k$ and $x_{k+1}$.
The accuracy of such an interpolation scheme increases with the resolution (i.e., the number of evaluations stored).

This interpolation scheme can be generalized the a vector $\mathbf F(x)$ all depending a singles inputs

$$ 
\mathbf F(x) = \mathbf F(x_k) + \frac{\mathbf F(x_{k+1}) - \mathbf F(x_k)}{x_{k+1} - x_k} (x - x_k).
$$ (multi-linear-interp)


## Implementation

Credit to this implementation goes to Elias Most.
We will now give the details for the interpolation class.
As usual, we will define the skeleton of the class first  (all its functions and members), and implement each function individually.
Remember that, if it is a template function, the function should be implemented within the header file.

The necessary headers are

```c++
#include <array>     // for std::array
#include <cassert>   // fro static_assert
#include <cmath>     
#include <iostream>  // In the future we will switch to <format>
#include <memory>    // for std::unique_pointer, std::forward, std::make_unique
                     // and std::move
```

The class definition (in its simplest incarnation) is

``````{margin}
```{note}
We follow the best practice: _if you can make a function_ `constexpr`, _then do so_
```
``````

```c++
template<typename T, int dim, bool uniform>
class LinearInterpolator
{   
public:
    template<int N>
    using Vec    = std::array<T, N>;
    using VecPtr = std::unique_ptr<T[]>;
    using Data   = std::array<VecPtr, dim>;

    LinearInterpolator() = default;
    template<typename... Args>
    constexpr LinearInterpolator(int num_points, VecPtr&& x, Args&&... args);

    template<typename... Args> 
    inline constexpr Vec<dim> get_derivative(const T& x_in, Args&&... args) const;
    inline constexpr int      find_index(const T& x_in) const;
    template<typename... Args>
    inline constexpr Vec<dim> interpolate(const T& x_in, Args&&... args) const;

private:
    VecPtr m_input;        // Stores the x_n
    VecPtr m_delta_input;  // Primarily for uniform = false
    Data   m_output;       // Stores the f(x_n)
};
```

Where `uniform` indicates whether the linear interpolation is with a uniform spacing.
This is primarily useful for speeding up the the `find_index` operation.

We started by declaring some type aliases to avoid writing long variable types

```c++
template<int N>
using Vec    = std::array<T, N>;
using VecPtr = std::unique_ptr<T[]>;
using Data   = std::array<VecPtr, dim>;
```

Then we declared our default constructor (as is usually required by the compiler, should the interpolator become part of some other class and the compiler needs to know how much memory needs to be allocated to store the class), and our actual constructor.
The implmentation of the constructor is

``````{margin}
```{note}
When declaring `temp`, we have taken advantage of C++ _fold expressions_, which are there to help iterate over a parameter pack like `Args`.
```
``````

```c++
// constructor implementation
template<typename... Args>
constexpr LinearInterpolator(int num_points, VecPtr&& x, Args&&... args)
    : m_input{ std::move(x) }
{
    static_assert(sizeof...(args) == dim);
    int n{ 0 };
    int temp[] = { (m_output[n] = std::forward<Args>(args), ++n)... };
    (void)temp;

    m_delta_input = std::make_unique<T[]>(num_points - 1);
    for (int i = 0; i < num_points - 1; ++i)
    {
        m_delta_input[i] = m_input[i + 1] - m_input[i];
        assert(!std::isnan(m_delta_input[i]));
        assert(m_delta_output[i] > 0);
    }
}
```

Next, we declare our functionality.
The `get_derivative` function returns the derivative at the point `x_in`.
It's implementation is

```c++
// get_derivative implementation
```

The `find_index` function finds the index `k` such that `x_in > m_inputs[k]`.

``````{margin}
```{note}
Here, we implement a binary search algorithm.
```
``````

```c++
// find_index implementation
```

Lastly, we have the primary function we care about, namely, the one that returns the interpolated value
```c++
// interpolate implmentation
```
