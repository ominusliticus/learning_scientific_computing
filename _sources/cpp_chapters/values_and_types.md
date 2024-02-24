# Variables, Values, Types and Templates

In this chapter we will finally begin to write some code.
We will start to develop the semantics and grammar for the langauge that will ultimately allow you to author your own projects.
To begin, let us start off with an anology.

If C++ code is a recipe, then the variables are the ingredients (for the sake of argument, let's assume the recipe is for a cake).
Variables consist of a _type_ and a _value_.
Continuing our cake analogy, the type specifies which ingredient (eggs, flour, sugar), while the value specifies how much.
One cannot talk about types without specifying values, but I can't talk about values without know what the type is.
This remark is central to how C++ thinks of variables:

> Variables are containers that only accept values corresponding to its type.

This is true for functions (link functions), classes (link classes), and enumerations (link enumerations) (all concepts we will introduce in subsequent chapters).

## Types

C++ is a strongly typed-language. 
In the context of variables, this means that every variable has to have a type.
Moreover, anywhere the variable is used in the code base, it needs to have a corresponding type.
There essentially to types of _type declarations_ in C++: intrinsic types and user defined tyeps.

### Intrinsic types

Intrinsic types are also sometimes called primitive data types.
They are simple to represent on computers, and arguably, they are the reason why computers exist.
These are essentially the types the C++ has inherited directly from C.
Here we will summarize the intrinsic types and their common use case

``````{margin}
```{note}
Here the __C++20__ annotation indicates that not every compiler will support this type
```
``````
```{list-table}
:header-rows: 1

* - declaration
  - description
* - `void`
  - This is an incomplete type that is completely empty. 
  You cannot declare void variables. 
  You can declare functions with void return values (link return values) and void pointers (link pointers).
* - `char`
  - Represents a single ASCII character, and occupies 1 byte (8 bits) of memory.
  ASCII characters are really just integers under the hood; the `char` type stores a number between `000` and `255`. 
  How they map to the alphabet and other symbols can be found [here](https://www.asciitable.com/).
  These form the basis for basic string types.
* - `wchar_t`
  - Represents a UTF encoded characters, and cccupies 4 bytes (32 bits) of memory.
* - `char8_t`
  - (C++20) an 8-bit char 
* - `char16_t`
  - a 16-bit char
* - `char32_t`
  - a 32-bit char
* - `int`
  - The basic integer type. 
  Stores a 32-bit integer
* - `short`
  - A 16-bit integer
* - `long`
  - A 64-bit integer
* - `std::size_t`
  - An integer determined by the hardware you have, for 64-bit systems, this is generally a 64-bit integer
* - `float`
  - a 32-bit decimal number
* - `double`
  - a 64-bit decimal number. 
  Here large storage means that one can keep track of more decimal places, but at the expense of operations taking longer
* - `bool`
  - an 8-bit integer that can only be `zero` (`false`) or `1` (`true`). The abbreviation _bool_ is short for boolean.
```

Integer types can be modified with the keywords `signed` and `unsigned` to indicate whether the variable can store negative and non-negative numbers, respectively
These types are discussed in more detail [here](https://en.cppreference.com/w/cpp/language/types) on cppreference.com, especially how they can be combined to produced new intrinsic data types.
The combinations of fundamental types, e.g., `unsigned long long`, specify the size (bytes in memory) the integer should occcupy.
This also determines the largest integer the corresponding variables can contain.
The size of _any_ type can be interrogated through using the `sizeof()` function.
An example program that prints the size selected primitive types can be found [here](https://godbolt.org/z/qMGse7cMv)
For convenience, we include a screenshot

```{figure} ../images/sizeof_primitives.png
:name: sizeof-primitives

Godbolt screenshot for a program that prints the output of selected primitive types.
The output is in bytes; recall the 1 byte is 8 bits.
We will discuss the `Print` function in the next chapter.
```

### User-defined types

User-defined types are precisely as they sound.
They are declared by creating _classes_ or _structs_ (link these), but we will postpone the precise details of how this works for later.
The one user-defined type we will mention here is the `std::vector` container.
This container stores a user-specified number of variables of a user-specified type.
For example, it could 1000 `floats` all within the same variable.

### Variable declaration

We finally come to the first semantic rule for writing C++ code: variable declaration.

``````{admonition} Rule: Variable Declaration
:class: tip
At its core, variable declaration has the following form.
```c++
<type_declaration> <variable_name>
```
``````

`<type_declaration>` is replaced by a intrinisic type (`int`, `float`, etc) or user-defined type (`std::vector`).
`<variable_name>` is replaced by a string of characters that satisfy the followin

``````{margin}
```{admonition} Best Practices
:class: note
A common best practice is to make variable start with lower case letter.
```
``````
``````{admonition} Rule: Variable Names
:class: tip
1. Must start with a letter or underscore, `a-z`, `A-Z`, `_`
1. Can only contain a number, letter, underscore or `$`
1. The variable name cannot have any whitespace

Examples
```c++
int    count;      // Valid
double _fraction;  // Valid
bool   FLAG_1;     // Valid
long   2_file;     // Compiler error
float  a b;        // Compiler error
```
``````

## Values

`````````{margin}
``````{admonition} Best Practices
:class: note

C++ programming language is looking to abolish initialization semantics of the for
```c++
int foo = 0;
```
in favor of 
```c++
int foo{ 0 };
```
As for more complicated objects, the brace initialization ensures the object is created with the least memory overhead.
In more technical terms, it ensures the object is instantiated with rvalues, rather than lvalues (which could incur an unnecessary copy operation).
``````
`````````

As mentioned before, the _value_ of a variable defines _how much_ of an ingredient (type) it contains.
Assigning a value to a variable is called _initialization_.
Assigning values to variables that are already initialized is called _assignment_.
Initialization typically happens at the same time of declaration, e.g.,
```c++
double PI;                // Declaration only
int cpu_core_count{ 12 }; // Declaration and initialization
cpu_core_count = 4;       // Assignment
```
C++ reasons about different values through discussing _value categories_.
The two primary value categories are _rvalues_ (read as R-values) and _lvalues_ (read as L-values).
This distintion exists because in C++ we have to think about memory management, resource acquistion and other semantic constructs within the language.
It turns out that if the compiler expects an rvalue, but it given a lvalue, the compiler will throw a compilation error.
We will now discuss the nuance behind their distinction

### Lvalues
For historical reasons, the _L_ refers to the variable appearing on the left-hand-side of the assignment operator `=`.
According the ISO standard, 
> an lvalue is an expression whose evaluation identifies an object or function.
Object here means variable _name_, while function refers to a function's _name_.
In general, we will think of lvalues as _initialized variables_.

### Rvalues
For historical reasons, the _R_ refers to the expression appearing on the right-hand-side of the assignment operator `=`.
One thing to consider alreay is that in the following example
```c++
int foo{ 10 };  // Could be written as foo = 10;
int baz{ foo }; // Could be written as baz = foo;
```
both `foo` and `baz` are lvalues, but `10` is an rvalue.
Another example of an rvalues is the return value of a function (there are caveats here that we will ignore for now).


### Value categorities derived from l- and rvalues

In recent years, the C++ standard has expanded the value categories to include _prvalue_, _xvalue_, and _glvalues_ to help delineate between the roles that values can play.
Those more interested in the precise taxonomy the C++ language is using now should read the [cppreference article](https://en.cppreference.com/w/cpp/language/value_category) detailing it

## Delcaration qualifiers

Variable declarations can be modified for extra functionality, we will refer to this as _type specifiers_.
Three common specifiers that we will encounter are `static`, `const` and `constexpr`.
Less common specifiers include `extern` and `volatile`.
We will not go throught the last two, as, IMHO, these are only really useful when coding for low level systems such as embedded systems.
Are usecases are simulation based.

### The `static` specifier
``````{margin}
```{warning}
The meaning of `static` is different when used inside a class declaration.
This will be discussed in Chaper ?? (link chapter)
``````
```c++
static int foo{ 100 };
```

The `static` specifier tells the compiler to not make the variable (or function) visible outside of the .CPP file in which it appears.
This could be useful if there are variables you want to _hide_ from other parts of the program.
This is a remanent of the C programming language; modern C++ address this problem with encapsulation.
However, we mention the specifier here because it does appear frequently in C++ code, but for a different reason (see the warning to the right).

An example of its usage is

### The `const` specifier
```c++
const int a{ 1 };
int const a{ 1 }; // is equivalent to the above
a = 2;            // Compile-time error
```
This specifier indicates that the value of the variable cannot be change after initialization.

### The `constexpr` specifier
```c++
constexpr int a{ 1 }; 
a = 2;                // Compile-time error
```

This is a stronger specifier than const, it tells the compiler that the variable's value is known at compile time, and will not change for the duration of the program.
This is particularly useful when you want to offload certain computations to the compiler, and can provide a dramatic improvement in speed of the program (up 10,000x).


## Templates
<!-- typdef, template, typename -->
```{margin}
Templates really shine for template metaprogramming, which a programming paradigm that changes the way a program behaves based on the types.
I.e., the programs behavior changes based on what types you offer it, but the actual code you read is the same.
```
The last topic, and by far the most complex, is the _template_ semantic.
Template are what truly distinguish C++ from C, and allow you to write code that is generic in the type you want to use.
There utility is far more visible for functions and class declarations, but we are going to give an incremental introduction.

We come to our last rule of the chapter, how to declare (and use) variables with template parameters.

``````{admonition} Rule: Templated Variable Declaration
:class: hint
```c++
template<typename T>
int size;

// Equivalently
template<typename T> int size;
```
Here `template` and `typename` are reserved words, while we are free to replace `T` with anything we want (as long as it obeys the name of variable declarations, link these).
``````
When dealing with templates, the declaration exist completely separately from the initialization.
This is because, we also need to the instantiate the template parameter.
For templated variable declarations, the only way to instantiate the template is through template specialization.
``````{admonition} Rule: Template Variable Specialization
:class: hint
```c++
template<typename T>
int size;

// Specializations
template<> int size<bool>   = 1;
template<> int size<int>    = 4;
template<> int size<double> = 8;
```
``````
Even though all variables have the same name, they are distinguished by their template instantiation, which is good enough for the compiler to distinguish them.
There are not many use-cases that I can think of for this particular semantic, besides some analogy of the example provided.
An example program with this code can be found [here](https://godbolt.org/z/P6nEavesf).

## Summary
