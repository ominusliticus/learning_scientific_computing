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

<!-- section: The vinalla function
        subssection: where can you define functions
        subsection: the int main function  
-->
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

### Where can you define a function


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



<!-- section: function overloading -->
## Function Overloading
In C++, two or more functions can share the same name if and only if they have a different signature (argument list).
This is called _function overloading_.
Our go to example of this chapter will be the `add` function: the most basic add function is
```c+++
int add(int a, int b)
{
    return a + b;
}
```
it takes to integers and returns an integer.
However, we can also add floats, doubles, longs, long longs, long doubles etc.
In the C programing language, these would all need to be written (or generated) explicityly.
Morever, since C++ does not have function overloading, they would have had to be defined with a different name each.
In C++, however, we can just write
```c++
int    add(int a, int b) { return a + b; }
float  add(float x, float y) { return x + y; }
double add(double x, double y) { return x + y; }
// and many more 
```
In the next section, we will see how we can forgo the tedium of writing out all the functions explicitly and just use templates, but the real utility is that operations such as `+`, `-`, `==`, etc are implemented as functions (more specifically operators), which can be overloaded as well.
A discussion of operator overloading will follow that of templates.

<!-- 
    section: template programming
        subsection: multiple template parameters
        subsection: variadic templates
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

    char z{ add(x, y) }; // Won't compile because types are different 
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

<!-- section: operators-->
## Operator overloading

Every operation in C++ is expressed as function, and can, therefore, be overloaded.
This is useful when you want to define costum behaviour for a user-defined types (discussed in the next chapter), or wish to make code more human readable.
We tak as an example, the `add` function again
```c++
template<typename T>
T add(T a, T b) { return a + b; }
```
This operation is defined for any type `T` that overloads/implements the `operator+` operation.
Operator overloading only makes sense for user-defined types, which will be the subject of the next chapter.
But for our example here, it will be enought to wet our appetite here with a very basic implementation for addition of complex numbers
```c++
struct complex 
{
    double real;
    double imag;
};

complex operator+(const complex& left, const complex& right)
{
    return complex{ 
        .real = left.real + right.real,
        .imag = left.imag + right.imag
    };
}
```
A more in-depth discussion of this example will follow in the next chapter.
A list of all the opeartor that can be overloaded is found [here](https://en.wikipedia.org/wiki/Operators_in_C_and_C%2B%2B)


<!-- section: lambda functions -->
## Lambda functions
