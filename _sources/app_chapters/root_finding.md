# Root finding

## One-dimensional root finding

Often times in computational settings, we wish to find the roots of a system.
Some simple examples are find the roots of a denominator, to see where poles arise, and avoid them during your numerical integation scheme.
The two most common root finding algorithms are _Newton's Method_ and _bisection method_.
The former has a more numerically stable counter part, calle the _secant method_, while the secant method and bisection method have been combined to form the _Brent method_.
More optimized formulas exist for root finding, with very specific use cases.
However, for this chaper, we will focus on the secant, bisection and Brent methods.


### Secant method

Given a function $f(x)$, and an initial guesses $x_0$ and $x_1$ for the location of the root $x_\ast$, the secant method iterates the formula

$$
x_n = x_{n - 1} - f(x_{n-1})\frac{x_{n - 1} - x_{n - 2}}{f(x_{n - 1}) - f(x_{n - 1})}.
$$

Then, $lim_{n \to \infty} x_n = x_\ast.

In code, this can be implemented very simply

```c++
// CODE HAS NOT BEEN CHECKED
template<typename T, typename Func, typename...Args>
std::optional<T>
secant_method(Func&& func, T x_0, T x_1, T tol, int max_iter, Args&&... args)
{
    T x_n;
    do 
    {
        T f_n1 = func(x_1, std::forward<Args>(args)...);
        f f_n0 = func(x_0, std::forward<Args>(args)...);
        x_n = x_1 - f_n1 * (x_n1 - x_n0) / (f_n1 - f_n0);

        if (std::fabs(func(x_n, std::forward<Args>(args)...) < tol) return x_n;
        else {
            x_0 = x_1;
            x_1 = x_n;
        }
        max_iter--;
    } while (max_iter > 0);

    return std::nullopt;
}
```

As it is posible for the method to not converge within the allotted ierations, we provide a safety mechanism for the user the test during run time, through returning an optional.
That's it!

### Bisection method

As the name suggests, this method finds the root by systematically splitting an interval into two, and continuing the search in one of those intervals.
Let $a$ and $b$ be the end points of the interval, such that $a < b$, and $f(x)$ be the function, whose roots we are locating.
If $f(a) f(b) > 0$, we can conclude tha there is no sign change for $f(x)$, and consequently (though not strictly true), there is no root.
That being said, you should always choose the initial interval, such that $f(a) f(b) < 0$.

The bisection method uses the same logic as just described: let $c_0$ be the midpoint between $a$ and $b$, if $f(a) f(c_0) < 0$, the root is in the first half of the interval, else it most be in the other half.
Let's assumme the product is negative, then we let $c_1$ be the midpoint between $a$ and $c_0$ and check if $f(a) f(c_1) < 0$, and so on.
Written in code, the bisection method can be implemented as

```c++
// CODE HAS NOT BEEN CHECKED
template<typename T, typename Func, typename...Args>
std::optional<T>
bisection_method(Func&& func, T a, T b, T tol, int& max_iter, Args&&... args)
{
    // Note that a empty optional is now ambiguous as to the error.
    // However, by passint `max_iter` as a reference, we can check if it's zero
    if (f(a) * f(b) > 0) return std::nullopt; 
    if (a > b) std::swap(a, b);

    T c{ (b - a) / 2.0 };
    do {
        if (std::fabs(c) < tol) return c;
        
        if (f(a) * f(c) < 0) {
            c = b;
        } else {
            c = a;
        }
    } while(max_iter > 0);

    return std::nullopt;
}
```

### Brent method
