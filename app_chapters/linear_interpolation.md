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
#include <memory>    // for std::unique_pointer, std::forward, and std::make_unique
```

The class definition (in its simplest incarnation) is

```c++
template<typename T, int dim, bool uniform>
class LinearInterpolator
{   
public:
    template<int N>
    using Vec = std::array<T, N>;
    using VecPtr = std::unique_ptr<T[]>;
    using Data = std::array<VecPtr, dim>;

    LinearInterpolator() = default;
    template<typename... Args>
    LinearInterpolator(int dim, VecPtr x, Args&&... args);

    inline double const& operator[](const int i);

    template<typename... TArgs> 
    inline Vec<dim> get_derivative(const T& x_in, TArgs&&... values) const;
    inline int find_index(const T& x_in) const;
    template<typename... TArgs>
    inline Vec<dim> interpolate(const T& x_in, TArgs&&... values) const;
    inline int size();

private:
    VecPtr m_input;
    VecPtr m_delta_input;
    Data   m_output
    int    m_dim{ dim };
    int    m_npoints;
};
```
