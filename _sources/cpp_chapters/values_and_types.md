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
We will discuss the Print function in the next chapter.
```

### User-defined types


<!-- typdef, template, typename, class, structs -->
