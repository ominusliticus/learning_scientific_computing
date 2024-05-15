# Introduction

This document is intend as reference for anyone just getting into scientific computing and needing some help navigating command line interfaces and C++ guidance/training.
You can expect to:
- become familiar with POSIX system command line tools and tricks
- Bash shell scripting
- C++ basics and intermdiates
- Project set-up, especially version controlling and git/GitHub
- Use command line to interface with a compute cluster

The vast majority of these notes will be dedicated to familiarizing you the C++ programming language, is it is the standard for high preformance computing.
To this end, there will be example projects which are intended to demonstrate how to setup more complicated projects.
As a disclaimer, well ahead of time, I am not a fan of inheritance.
The coverage of this topic will be minimal so that anyone that stumbles upon is familiar with some of its idioms like "Curiously Recurring Template Parameters".
Lastly, the presentation of topics here, reflects my personal opinion on what is important:
C++ is a very big and general purpose language, allowing for lots of freedom of expression and emphasis.

## Chapters and content

As mentioned in the overview, the primary purpose of these notes are to teach you C++ programming.
We will focus on modern C++, relying on language constructs from the 2011 standard and onwards, and a fairly decent review of the capabilities of the standard library (as we might need them) will be included.
Has hinted at in the overview, these notes are by know means comprehensive enough to represent the full milieu of C++ language, just the most salient parts for computation and the parts I quite enjoy.

The content is split into three parts: the first is dedicated to familiarizing yoursefl with C++ jargon, syntax, and idioms.
The second part is dedicated to giving some example projects and to discuss design considerations.
Lastly, the third part digs into remote computing, bash scripting and slurm.

### C++ lessons

1. What is a program
1. Compilation and debugging/debuggers
1. Variables, types, values and templates
1. Functions, operators, lambdas (anonymous functions), function overloading, and variadic templates
1. User-defined types (classes)
1. Pointers, arrays, references, and smart-pointers
1. Memory management and memory owndership models
1. Digression: imperative programming vs object-oriented programming vs functional programming
1. Move/copy construction/assignment
1. Our best friend, std::optional, and error handling
1. More on the standard template library (STL

What we will not cover is:

1. Inheritance
1. Template metaprogamming
1. Common data structures and algorithms (such as queues and sort), this is because these are provided by the standard template library
1. Concurrency computation models
1. Disributed computation models

<!-- Here I really want to make sure about the importance of using lambdas when passing functors
     to allow the compiler to do as much optimization as possible  -->
### Example projects

Some of these programs are inspired by programs that I had to write for research.
So the physics may be opaque, but the more important part is the program structure.
Where necessary, I will try to ellucidate the physical settings.

1. Numerical integration
1. Linear algebra (matrix multiplication, vector addition, inner products, matrix reduction)
1. Multilinear interpolation
1. Coupled ordinary differential equation
1. $N$-body simulations
1. Integral equations
1. Random number generators


### Essentials of high preformance computing

High preformance computing comes in many shapes: (multiple) graphics card programming, multiple CPU with mesaging passing interfaces, or massively parallel and independent tasks.
What they have in common is that they are usually execute remotely, that is not on the computer sitting in front of you.
The topics covered here are meant to familiarize yourself with remote computing, and some of the consideration you have to make when designing code for such extreme computing environments.

1. Command line basics
1. Connecting to remote servers
1. Bash scripting
1. Git and GitHub basics
1. SLURM and other cluster-computing software
<!-- 1. Sycl, Kokos and amrex -->
