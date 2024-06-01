# Introduction

This document is intended as a reference for anyone beginning their journey into scientific computing. 
It may serve as a reference for navigating the command line and C++ guidance, including:
- C++ basics and intermediates
- Familiarization with POSIX system command line tools and tricks, particularly for High Performance environments and compute clusters
- Bash shell scripting
- Project Configuration
- Version Control with Git, including remote server visualization with GitHub

The standard for high performing scientific computing is C++.
Therefore, the primary focus of the following sections will be to provide guidance for the C++ programming language. 
Examples in this document will serve to as a template for configuring and setting up more complicated projects. 
Let it be noted that the following content is subjective and not intended to be comprehensive.
It reflects personal preferences and conclusions regarding the C++ language.
That is, C++ is a a very large and general purpose language, allowing for freedom of expression and emphasis. 
To this extent, little importance is placed on concepts such as inheritance, highlighting its relevance simply for applications such as "Curiously Recurring Template Parameters". 
Furthermore, this document will address modern C++, encompassing language constructs from 2011 and onward, and a review of the standard library.

## Chapters and Content

The content will be divided into 4 parts:
- C++ jargon, syntax, an idioms
- Structure and documentation of multi source projects
- Example projects and design consideration
- Command Line, Remote Computing, bash scripting, Slurm, and Git

### C++

1. What is a program?
1. Compilation and debugging
1. Variables, types, values and templates
1. Functions, operators, lambdas, function overloading, and variadic templates
1. User-defined types (classes)
1. Pointers, arrays, references, and smart-pointers
1. Memory management and owndership models
1. Digression/Paradigms: Imperative vs Object-Oriented vs Functional Programming
1. Move/copy construction/assignment
1. std::optional and error handling
1. More on the standard template library (STL)

 Topics briefly considered are:

1. Inheritance
1. Template metaprogamming
1. Common data structures and algorithms, these are provided by the standard template library
1. Concurrency computation models
1. Disributed computation models

### Project Configuration

1. Setting up a multi-source file project
1. Building projects with shell scripts
1. Building projects with Makefiles
1. Building projects with CMake
1. Other available build systems

<!-- Here I really want to make sure about the importance of using lambdas when passing functors
     to allow the compiler to do as much optimization as possible  -->
### Examples: Numeical Methods and Projects

The primary focus of the examples is to outline and define the project structure.
Some example work draws from personal work completed for research. Comprehension of the subject matter is not required but it will be ellucidated when necessary. 

1. Numerical integration
1. Linear algebra (matrix multiplication, vector addition, inner products, matrix reduction)
1. Linear interpolation
1. Coupled ordinary differential equation
1. $N$-body simulations
1. Integral equations
1. Random number generators


### High Performance Computing Essentials

High preformance computing veries by implementation: graphics card(s) programming, multiple CPUs with mesaging passing interfaces, or massively parallel and independent tasks.
Common between any implementation is the execution environment, which usually happens separate, remote hardware.
The topics covered here are intended as a tool for familiarization with remote computing, and potential design requirements to consider during development.

1. Command line basics
1. Connecting to remote servers
1. Bash scripting
1. Git and GitHub basics
1. SLURM and other cluster-computing software
<!-- 1. Sycl, Kokos and amrex -->
