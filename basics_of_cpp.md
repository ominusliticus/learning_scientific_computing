# Introduction to C++

C++ is a very large and complex programming language.
It is also constantly changing, meaning a person proficient is C++ best practices ten years ago, might not understand more modern syntax.
In this chapter, we will try to give a very broad overview of the many possibilities of coding with C++ and write our first couple of programs.
After this chapter, you should be able to:
1. Write a _Hello, World!_ program
1. Write a program that does file input and output
1. Solve a first-order linear differential equation

# Programming syntax, keywords, functions and more

All programming languages come with some words that have specific function when they show up in source code; these special works are called _reserved words_.
Python has [35 reserved words](https://docs.python.org/3/reference/lexical_analysis.html#keywords), while C++ has [97 keywords with 7 more already in progress](https://en.cppreference.com/w/cpp/keyword).
Unless you are a software engineer, there is not a really a reason you would need even 50% of these keywords, but I highlight them to underscore the complexity of C++.

Programming syntax are rules you must follow for a compiler or interpreter to understand the instruction you are trying to give it.
Some simple rules for C++ that you will need are:
1. All variable names (this includes functions because they are, in a sense, variables) must start with an alphabetical character or underscore.
1. Variable names contain numbers, letters or dollar signs.
1. All statements must in end in semicolon.
1. Control flow statements must be enclosed in parentheses.
1. Curly braces determine scope.

We are not going to systematically introduce all these and explain them. 
Rather, if you have questions you can always refer to the [cppreference.com](https://en.cppreference.com/w/cpp/language) guide on the language.
We will jump straight into coding.

# _Hello, World!_

The standard introduction program in C++ is as follows (we give python as a comparison)  

````{tab} C++
```c++
#include <iostream>

int main()
{
    std::cout << "Hello, World!\n";
    return 0;
}
```
````
````{tab} Python
```python
print('Hello, World!')
```
````

Let's dissect this code:
- `#include` _directive_ tells the C++ compiler to fetch the library `iostream` and paste it into this document.
It contains the input and output abstractions that are common in C++. 
These abstraction are generically referred to as _streams_, so the name of the library should make more sense now.
- `int main() {...}` is the definition of a function named `main`.
When compiling C++ programs with most compilers, it will always look for an `int main` function which it considers the _entry point_ for the program.
This means that having multiple functions named `int main` with throw and error at compile time.
- `std::cout` is abstraction some very hard working people have created to write output the terminal. 
The `std` part stands for _standard_, as `iostream` is part of the _Standard Template Library (STL)_ that ships with every compiler, and `cout` stands for _common out_ (another name for the terminal screen).
The double colon between `std` and `cout` indicate that `cout` is an variable name belonging the `std` _namespace_, (in fact, one of the keywords we will use is `namespace`).
Namespaces are convenient for distinguishing between functions with the same name. 
For example, you may have a function `real::sqrt` which is a function that takes the square-root of real numbers, while `complex::sqrt` takes the square-root of complex numbers.
- `<<` is know as the _insertion operator_.
All you should care about is that this essentially _inserts_ the information on the right into the stream on the left.
The syntax for printing to a file is identical, the stream variable is simply replaced by the file variable.
- `"Hello, World!\n"` is called a _string_, or more technically a _const char array_.
The `\n` at the end is a special character that indicates _add a new line_.
- `return 0` - every function with a non-`void` return-type needs to have a `return` statement.
Returning zero here, tells the operating system that the computer program executed successfully.

# File I/O

We can modify the above program to output _Hello, World!_ to a file by replacing the `std::cout` stream by a file stream (again, we provide python for comparison)  

````{tab} C++
```c++
#include <fstream>

int main()
{
    std::fstream fout("output_file.txt", std::fstream::out);
    fout << "Hello, World!\n";
    fout.close();
    return 0;
}
```
````
````{tab} Python
```python
with open('output_file.txt', 'w') as f:
    f.write('Hello, World!')
```
````
