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

A function has four parts:
1. The type declaration - this can include the template paramters, the [declaration qualifiers](declaration_qualifier), return type and attribute specification;
1. The function name - which follows the same [name converntions](variable_declaration) as variables;
1. The argument list - a comma separated list of declaration qualifiers, variable types, reference qualifiers, and (optionally) the variable name; and
1. The function body - the recipe the function is supposed to execute.

``````{admonition} Rule: Function declarations
:class: hint

A non-templated declaration
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
<!-- 
    section: template programming
        subsection: multiple template parameters
        subsection: variadic templates
-->
<!-- section: function overloading -->
<!-- section: operators-->
<!-- section: where can you define functions -->
<!-- section: lambda functions -->
