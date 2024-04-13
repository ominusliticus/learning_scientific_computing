# Linear Interpolation

## Background

Linear interpolation is a method to estimate the value of a function given a finite set of known points.
It can also be useful when a function needs to be evaluated repeatedly, but is rather expensive to call, like `exp` function.
A quick optimization is then to evaluate the expesnive function at a selected number of points $\{x_n\}$ and store the evaluations $\{f(x_n)\}$.
Then, for any other $x$, given $k$ and $k+1$ such that $x_k \leq x \leq x_{k+1}$, $f(x)$ is given by

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
    int    m_num_points;   // Needed for index finding
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

```c++
// constructor implementation
template<typename... Args>
constexpr LinearInterpolator(int num_points, VecPtr&& x, Args&&... args)
    : m_input{ std::move(x) }, m_num_points{ num_points }
{
    static_assert(sizeof...(args) == dim);
    // Use C++-folding expression to loop over variadic template parameter pack
    ((m_output[n] = std::forward<Args>(args)), ... );

    m_delta_input = std::make_unique<T[]>(num_points - 1);
    for (int i = 0; i < num_points - 1; ++i)
    {
        m_delta_input[i] = m_input[i + 1] - m_input[i];
        assert(!std::isnan(m_delta_input[i]));
        // Ensure that inputs are strictly increasing
        assert(m_delta_input[i] > 0);
    }
}
```

Next, we declare our functionality.
The `get_derivative` function returns the derivative at the point `x_in`.
It's implementation is (recall that the type `T` is defined before the class declaration above)

```c++
// get_derivative implementation
template<typename... Args>
inline constexpr Vec<dim> get_derivative(const T& x_in, Args&&... args) const
{
    constexpr int num_args = sizeof...(args);
    static_assert(num_args <= dim, "Cannot interpolate more quantities than dim");

    const auto index = find_index(x_in);
    Vec<dim>   slope{};
    ((slope[args] = (m_output[args][index + 1] - m_output[args][index]) \
        / (m_delta_input[index])), ...);
    return slope;
}
```

The `find_index` function finds the index `k` such that `x_in > m_inputs[k]`.

``````{margin}
```{note}
Here, we implement a binary search algorithm.
```
``````

```c++
// find_index implementation
inline constexpr int find_index(const T& x_in) const
{
    if (uniform)
    {
        const auto x_left{ x_in - m_input[0] };
        const auto x_mid{ m_input[m_num_points - 1] };
        int   index{ (x_in < x_mid) * (x_left > 0) * static_cast<int>(x_left / m_delta_input[0]) };
        index += (m_num_points - 2) * (x_in >= x_mid);
        return index;
    }

    int lower{ 0 };
    int upper{ m_num_points - 1 };
    while(upper - lower > 1)
    {
        int mid{ lower + (upper - lower) / 2.0 };
        if (x_in < m_input[mid]) upper = mid;
        else lower = mid;
    }

    return lower;
}
```

Lastly, we have the primary function we care about, namely, the one that returns the interpolated value
```c++
// interpolate implmentation
template<typename... Args>
inline constexpr Vec<dim> interpolate(const T& x_in, Args&&... args) const
{
    constexpr int num_args = sizeof...(args);
    static_assert(num_args <= dim, "Cannot interpolate more quantities than dim");

    const auto index = find_index(x_in);
    const auto lambda = (x_in - m_input[index]) / m_delta_input[index];
    Vec<dim>   interp{};
    ((interp[args] = m_output[args][index + 1] * lambda + m_output[args][index] \
        * (1 - lambda)), ...);
    return interp;
}
```

An example of this code in action can be found here: [Linear Interpolation Example](https://godbolt.org/z/65xTxc9dn)

<details>

  <summary> Unified source implementation </summary>

  ```{note}
  This definitions could be moved into the class declaration which would simplify the code substantially.
  However, here we include the fully detailed implementation to expose readers to all the required syntax to write an implementation outside of the class, should the reader want to separate the logic of declaration and implemetation.
  Recall that since we are using templated functions, we have to provide the implementation of the functions within the header file
  ```

  ```c++
  #include <array>
  #include <cassert>
  #include <cmath>
  #include <iostream>
  #include <memory>
  
  template<typename T, int dim, bool uniform = true>
  class LinearInterpolator
  {   
  public:
      template<int N>
      using Vec    = std::array<T, N>;
      using VecPtr = std::unique_ptr<T[]>;
      using Data   = std::array<VecPtr, dim>;
  
      LinearInterpolator() = default;
      template<typename... Args>
      explicit constexpr LinearInterpolator(int num_points, VecPtr&& x, Args&&... args);
  
      template<typename... Args> 
      inline constexpr Vec<dim> get_derivative(const T& x_in, Args&&... args) const;
      inline constexpr int      find_index(const T& x_in) const;
      template<typename... Args>
      inline constexpr Vec<dim> interpolate(const T& x_in, Args&&... args) const;
  
  private:
      VecPtr m_input;        // Stores the x_n
      VecPtr m_delta_input;  // Primarily for uniform = false
      Data   m_output;       // Stores the f(x_n)
      int    m_num_points;   // Needed for index finding
  };
  
  
  template<typename T, int dim, bool uniform>
  template<typename... Args>
  constexpr LinearInterpolator<T, dim, uniform>::LinearInterpolator(int num_points, VecPtr&& x, Args&&... args)
      : m_input{ std::move(x) }, m_num_points{ num_points }
  {
      static_assert(sizeof...(args) == dim);
      int n{ 0 };
      // Use C++-folding expression to loop over variadic template parameter pack
      ((m_output[n] = std::forward<Args>(args), ++n), ... );
  
      m_delta_input = std::make_unique<T[]>(num_points - 1);
      for (int i = 0; i < num_points - 1; ++i)
      {
          m_delta_input[i] = m_input[i + 1] - m_input[i];
          assert(!std::isnan(m_delta_input[i]));
          // Ensure that inputs are strictly increasing
          assert(m_delta_input[i] > 0);
      }
  }
  
  template<typename T, int dim, bool uniform>
  template<typename...Args>
  inline constexpr LinearInterpolator<T, dim, uniform>::Vec<dim> LinearInterpolator<T, dim, uniform>::get_derivative(const T& x_in, Args&&... args) const
  {
      constexpr int num_args = sizeof...(args);
      static_assert(num_args <= dim, "Cannot interpolate more quantities than dim");
  
      const auto index = find_index(x_in);
      Vec<dim>   slope{};
      ((slope[args] = (m_output[args][index + 1] - m_output[args][index]) \
          / (m_delta_input[index])), ...);
      return slope;
  }
  
  template<typename T, int dim, bool uniform>
  inline constexpr int LinearInterpolator<T, dim, uniform>::find_index(const T& x_in) const
  {
      if (uniform)
      {
          const auto x_left{ x_in - m_input[0] };
          const auto x_mid{ m_input[m_num_points - 1] };
          int   index{ (x_in < x_mid) * (x_left > 0) * static_cast<int>(x_left / m_delta_input[0]) };
          index += (m_num_points - 2) * (x_in >= x_mid);
          return index;
      }
  
      int lower{ 0 };
      int upper{ m_num_points - 1 };
      while(upper - lower > 1)
      {
          int mid{ lower + (upper - lower) / 2 };
          if (x_in < m_input[mid]) upper = mid;
          else lower = mid;
      }
  
      return lower;
  }
  
  template<typename T, int dim, bool uniform>
  template<typename...Args>
  inline constexpr LinearInterpolator<T, dim, uniform>::Vec<dim> LinearInterpolator<T, dim, uniform>::interpolate(const T& x_in, Args&&... args) const
  {
      constexpr int num_args = sizeof...(args);
      static_assert(num_args <= dim, "Cannot interpolate more quantities than dim");
  
      const auto index = find_index(x_in);
      const auto lambda = (x_in - m_input[index]) / m_delta_input[index];
      Vec<dim>   interp{};
      ((interp[args] = m_output[args][index + 1] * lambda + m_output[args][index] \
          * (1 - lambda)), ...);
      return interp;
  }
  ```

</details>


