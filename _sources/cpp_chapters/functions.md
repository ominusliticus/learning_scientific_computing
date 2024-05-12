# Functions, Operators, Lambda Expressions, Function Overloading and Variadic Templates

In the last section we learned about variables and types, and a little bit about the type system of C++.
We made an analogy analogy to baking that juxtaposed types and recipe ingredients, and values with quantities of those ingredients. 
We will continue the analogy by juxtaposing functions as the specific instructions you have to follow to bake you cake (or bread).
A cake (program) is uniquely determined by its ingredients, the quantity of each ingredient, and a perscription for how to combine these ingredients.
One code even say that the oven is the compiler!
But enough of a diagression.

In this chapter, we will learn all about functions.
In C++, whatever isn't a variabe is probably a function.
We will discuss the syntax of declaring, defining, overloading and templating functions.
We will finish by writing the `Print` function that was already introduced in the last section, and will be prominantly featured throughout the rest of these notes.

## The Vanilla Function

``````{margin}
```{note}
We will frequently refer to the argument list as the signature of a function.
```
``````

A function has four parts:
1. The type declaration - this can include the template paramters, the [declaration qualifiers](declaration_qualifier), return type and attribute specification;
1. The function name - which follows the same [name converntions](variable_declaration) as variables;
1. The argument list - a comma separated list of declaration qualifiers, variable types, reference qualifiers, and (optionally) the variable name; and
1. The function body - the recipe the function is supposed to execute.

``````{admonition} Rule: Function declarations
:class: hint

A non-templated function declaration
```c++
type_specifier type_declaration function_name(argument_list)
{
    function_body
}
```

A templated function declaration
```c++
template<typename template_name>
type_specifier type_declaration function_name(argument_list)
{
    function_body
}
```
``````

Functions can grossly be grouped into two categories, in terms of the their function in a program.
These are 

1. Pure functions - functions that only consume input and produce output; and
1. Impure functions - functions that can have _side effects_.

Side effects arise when the function modifies some other variable (we will use the word state henceforth) in the program.
An example of a pure function is 
```c++
int add(int a, int b)
{
    return a + b;
}
```
Here, the function simply takes to integers `a` and `b` as arguments, and returns their sum.
An example of a function that preforms a side effect is

``````{margin}
```{note}
The ambersand(&) means take the variable _by reference_, which allows us to modify its value and ensures
that the modification last after the function exits.
We will talk more about reference in Chapter 7.
```
``````

```c++
int add(int a, int b, int& c)
{
    c = a + b;
    return c;
}
```
Here, the state of `c` is modified to store the result of the sum  _and_ the sum is returned.
One can imagine that a function's job is to check the state of one or more variables, and flag another for later action.
Two examples would be:
1. Redrawing the screen after the mouse has been moved or key pushed, so the screen reflects the system's new state
1. Indicating to a mesh refiner, for adaptive mesh refinement simulation, to refine a certain grid point before moving to the next time step.


<!-- subsection: the int main function  -->
### The `int main` function

A special function in all C++ programs is the `int main` function.
Every program needs exactly one for the program to be compiled.
Should the compiler not find this _symbol_, then it will complain and fail.

``````{margin}
```{note}
We have not takled about pointer types like `char*` or array types like `char[]`.
These will be discussed down the in Chapter 7.
```
``````
The `int main` function can have to forms:
```c++
int main() { }
int main(int argc, char* argv[]) { }
```
The `agrc` variable stores how many arguments were passed to the program from the command line.
Assuming the program's name is `prog`, a call with multiple arguments would look like
```bash
./prog arg1 arg2
```
The passed arguments are stored in `argv`, which is an array of length `argc` of null-terminated strings.
The name of the program is _always_ stored in `argv[0]` and the passed arguments (if `argc > 1`) start at `argv[1]`.
Parsing of command line arguments is the responsibility of the developer, though well establishd library have been developed for this purpose and can be found on github.

```{note}
Your program does not _need_ to take command line arguments.
A benefit from taking command line arguments can be that not needing to recompile a program just because you want it to be change its behavior.
```

The return value of the `int main` function is default to zero (that is, if no return statement is give, it will automatically add a `return 0;` to you `int main` body).
Non-zero return values, which we will refer to as _exit codes_ typically indicate some error that occured in the program.

Some facts to remember about `int main`:
1. It cannot be called by other functions;
1. A multi-source project can can have exaclty one;
1. It cannot be overload (see below); and
1. It can only have to two signatures described above.

<!-- 
    section: template programming
        subsection: multiple template parameters
        subsection: variadic templates
        subsection: template templates
        subsection: C++-style casting
-->
## Templated functions

``````{margin}
```{note}
There is such a thing as _casting_, which could have been introduced in the last chaper, but I chose to introduce here is it requires templated functions to implement
```
``````
As stated in the last chaper, templates allow you write code that is generic in types.
To appreciate this, we need to note that that C++ is a _strongly typed_ language, meaning the following code shouldn't compile (I say shouldn't because all primitive types
can be converted into each other).
```c++
float add(float x, float y) { return x + y; }

int main() 
{
    char x{ 'h' };
    char y{ 'e' };

    char z{ add(x, y) }; // Won't compile because `add` expects `float` 
}
```
The strong typing becomes more apparent once we used user-defined types, or classes.

A way of writing a generic/templated addition function is
```c++
template<typename T>
T add(T a, T b) { return a + b; }

int main()
{
    int a{ 1 };
    int b{ 1 };
    int c{ add(a, b) };    // OK!

    double x{ 1.0 };
    double y{ 1.0 };
    double z{ add(x, y) }; // OK!

    int j{ add(a, x) };    // FAILS! Compiler fails to deduce template paramter due 
                           // to conflicting variable types `int` and `double`
}
```
Underneath the hood, the compiler reads through the source code, and for every call the templated function, tries to generate a version of `add` with the types specified.

### Single template parameters

The simplest type of templated function is the _single template parameter function_.
For an example see the definition for the `add` function above.
Note that in calling the function, we do not need to use any syntax to indicate what the need type of the template is.
Instead, the compiler figures this out for us; if it could not, then it would give us a compilation error.

Using the example above, we could explicitly indicate what type the `add` function shoud admit by adding the _chevron_ syntax
```c++
template<typename T>
T add(T a, T b) { return a + b; }

int main()
{
    int a{ 1 };
    int b{ 1 };
    int c{ add<int>(a, b) }; 

    double x{ 1.0 };
    double y{ 1.0 };
    double z{ add<double>(x, y) };
}
```
It should now be more obvious why the call `add(a , x)` does not work.
We cannot write `add<int>(a, x)` because `x` is of type `double`, and we cannot write `add<double>(a, x)` because `a` is of type `int`.

``````{admonition} Rule: Single template function declaration
:class: hint

A single template parameter function declaration
```c++
template<typename t_param_name>
type_specifier type_declaration function_name(argument_list)
{
    function_body
}
```
where `t_param_name` needs to appear in `argument_list`.
We can equally replace `typename` with `class`, the syntax is equivalent.
``````

### Multiple templates parameters

You can provide multiple template parameters, by separating the the `typename` declarations with commas.
A quick example might be printing the key and a value in a dictionary

``````{margin}
```{note}
Here we use `const&` syntax, or _const reference_ which will be explained in Chapter {refernces}.
We also use _structured binding_ syntax `auto &[a, b]` or `auto const&[a, b]` to unpack the two values in the dictionary container.
This will revisit in the Chapter {STL library}
```
``````

```c++
#include <unordered_map>    // C++ name for a dictionary type
#include <iostream>         // For `std::cout` to print to the terminal

template<typename Key, typename Value>
void print_dictionary(std::unorder_map<Key, Value> const& dict)
{
    for (auto const& [key, value] : dict)
        std::cout << key << ": " << value << std::endl;
}

int main()
{
    std::unordered_map<char, int> dict_1{
        {'a', 1},
        {'b', 2},
        {'c', 3}
    };
    print_dictionary(dict_1);

    // First five digits of pi
    std::unordered_map<int, int> dict_2{
        {1, 3},
        {2, 1},
        {3, 4},
        {4, 1},
        {5, 5}
    }
    print_dictionary(dict_2);
}
```

``````{admonition} Rule: Multiple template function declaration
:class: hint

A multiple template parameter function declaration
```c++
template<typename t_param_name_1, typename t_param_name_2>  // etc
type_specifier type_declaration function_name(argument_list)
{
    function_body
}
```
where `t_param_name_#` needs to appear in `argument_list`.
We can equally replace `typename` with `class`, the syntax is equivalent.
``````

### Variadic template parameters

A very useful, and very powerful use of template programming are the _variadic templates_.
This, in short, means, functions with a _variable_ number of template arguments.
A pair of convience functions that we will use time and time again in our examples are our `print` and `println` function.
Its definitions looks like this

```c++
#include <iostream>

template<typename... Args>
void print(Args&&... args)
{
    ((std::cout << std::forward<Args>(args) << " "), ...);
}

template<typename... Args>
voif println(Args&&... args)
{
    print(std::forward<Args>(args)...);
    std::cout << std::endl;
}
```

It is worth breaking down the synatx here.
The ellispe denotes _variadic_: variadic programming is also present in the C programming language and implemented via macros.
When they appear in the template declaration or argument list, they indicate that an arbitrary (limited by computer chip) number of template types/arguments are to be expected, and are referred to as a _parameter pack_.
When appear in the body of a function, they indicate that a _template parameter pack_ is being _unpacked_; expression that contain the syntax `((), ...)` are called _folding expressions_.
The double ambersand `&&` indicates that the arguments should be interpreted as r-value references unless const-qualified (more about this in Chapter {reference}).
Lastly, the `std::forward` function, also a template function, also converts values to r-values.


``````{admonition} Rule: Variadic template function declaration
:class: hint

A variadic template parameter function declaration
```c++
template<typename... Args>
type_specifier type_declaration function_name(argument_list)
{
    function_body
}
```
where `Args` needs to appear in `argument_list`.
``````

You can declare functions with two variadic template arguments.
There is no immediate use-case that comes to mind for me, but you can feel free to look up examples.
The important part is that the first parameter pack has to declared in the function call using chevrons, and the second is deduced from the arguments passed to the function.

### Template template parameters


<!--- section: template specialization -->
<!-- section: function overloading -->
<!-- section: operators-->
<!-- section: where can you define functions -->
<!-- section: lambda functions -->
