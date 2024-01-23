# Compilation, Debugging and Debuggers
<!-- _TODO:_ Give disclaimer that this section does not have to read? -->

In the last chapter, we were introduced to the compiler as being the tool that translates the C++ code that we write, into machine code the CPU understands.
In this chapter, we will dig a little deeper into the C++ compilers, their various stages and get a general feeling for how to read disassembly.
We will finish by talking about debugging, i.e., how to diagnose where and/or why our programming is failing.

## C++ Compilers
There are essentially three standard compilers in the C++ world.
These are:
- `gcc`: the [GNU Compiler Collection](https://gcc.gnu.org/)
    - This is the default compiler on most Linux operating system, it is also the oldest and most opaque of compilers.
      However, it does compile highly preformant code.
- `clang`: (pronounced as either one word or c-lang), the LLVM based compiler
    - This is the default compiler on MacOS (though maintains its own branch of the compiler), and sits on top of the [LLVM compiler infrastrucutre](https://llvm.org/).
    - Most modern compilers rely on LLVM to do the optimizations necessary to make fast code. It's really a remarkable project
- `cl`: the compiler that ships with Microsoft's Visual Studio
    - Also referred to as the [MSVC compiler](https://learn.microsoft.com/en-us/cpp/build/reference/compiling-a-c-cpp-program?view=msvc-170), it only works on Windows operating systems.
    - It also tends to be the most up-to-date with the latest [ISO C++ standards](https://isocpp.org/std/the-standard), which are updated about every three years.

We will focus on clang, as this one is available on Linux and MacOS, and can be accessed on Windows through the [Windows Subsystem for Linux (WSL2)](https://learn.microsoft.com/en-us/windows/wsl/install).
Clang is also available through Visual Studio, for those relecutant to evolve from Windows.

```{tip}
All high preformance computing happens on computing clusters, which require you to be familiar with the POSIX command line interface (CLI).
It is very worthwhile to learn this, now.
Where possible, we will include examples of using the CLI throughout these notes
```

There are plenty of resources that explain how to install these compilers, for simplicity, we will only include the necessary command line instructions for Ubuntu based operating systems:

```bash
sudo apt install clang++
```

To ensure that `clang` is on your system, you can run this command which asks `clang` to print what version it is

```bash
clang --version
```

Go ahead and create a folder in your favorite spot on your computer called _learning\_scientific\_computing_ and subfolder named _hello\_world_.
In this folder execute the following commands

```bash
# Creates a file with the contents being the hello world program
cat >> hello_world.cpp << EOF
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
EOF

# Compile the program and name it `hello_word`
clang++ -o hello_world hello_world.cpp

# execute the program
./hello_world
```

These commands create the source file, compiles it, and then execute the program.
The result output should just be `Hello, World!`!

### Digging a little deeper into the compiler

Let's take a quick digression to understand what the compiler is doing under the hood.
For the compilation process to begin, the compiler must find exactly _one_ `int main()` function across all input files.
The compiler uses the function to understand how to put the program together, and optimize it.
Compilation generally happens is several stages:
1. Preprocessing
    - This step involves passing through the source code, and replacing preprocessing directives, also called macros, where ever they occur.
      The most common of these is the `#include` statement, which takes the contents of the file being _included_ and pastes it right there into the current file.
    - It also removes any comments, or _dead_ bits of code that are encloded if `#if` guards that evaluate to false.
1. Compilation
    - This is were the compiler reads in every line of code in a file and represents in some form that can easily manipulate (an example is an _abstract syntax tree_).
      This allows it to analyze your code to see if there are any bugs, such as missing semicolons, undeclared variables, etc.
      This step is generally referred to as _lexing and parsing_.
    - The AST is then converted into some binary (no longer human-readible) representation, for `gcc` is the _Register Transfer Language_ and `clang` uses _Intermediate Representation_.
    - The compiler then undergoes several pass of the code, transforming the binary representation to make the resulting machine code more efficient.
      This process is called _optimization_; there has been *A LOT* of research that has gone into teaching compilers to be extremely good optimization machines.
1. Assembling
    - Once the compiler is happy with its optimization passes, it converts its binary representation into one that the hard architure we are target can understand.
      For me, this is usually an intel based chip, which require x86_64 instructions, but could also be Apple Silicon chip which requires ARM instructions.
      
1. Linking
    - Once all the machine code has been generated for the various _.cpp_ files, they have to be linked together, that is, functions defined in one _.cpp_ file have to be cross-referenced so that every symbol is resolved and the CPU knows where to look for what when stepping through the call stack (an order list of instructions the CPU execute to execute the program).
    - Modern compilers can even preform further optimizations, called _link time optimization_ or LTOs, do reduce executable size or improve performance.
    - This is also the step where the program is made aware of where to look for symbols that are situated in libraries and not a part of the executable itself. 

There are more intricacy associated to each step that we needn't review or understand.
However, it good to be familiar with what exactly it is that a compiler does.
Though we won't be able to appreciate it from these notes, C++ provides a tool set that is vary well equipped for developing compiler infrastructure.


## Disassembly
<!-- _TODO:_ Give disclaimer that this subsection does not have to read? -->

We have used the word _disassembly_ without really explaining what it is.
So let's clarify that here.
Disassembly is a play on the word _assembly_ which describes the programming language that human write which translate directly into machine code for the CPU. 
For this reason, every CPU architecture (and manufacturer) has their own version of assembly.
Disassembly is the process of taking machine code, and translating is back into assembly.
Two flavors of assembly that show up in personnal computers are x86 ([Intel&reg;](https://www.intel.com/content/www/us/en/homepage.html)) and ARM ([Apple Silicon](https://developer.apple.com/documentation/apple-silicon))

We will take a little time to familiarize with the registers and commans commonly seen.
We will not talk abouot register sizes, or the evolution of assembly languages, but encourage you to read on this, if you're any bit curious.
A register is a physical location on the CPU where data can be load and the CPU can preform any number of commands (which we list below).
The set of commands available, ultimately dictates the assembly that chip can understand.
The register and their functions are

### Register Types
<!-- _TODO:_ Add corresponding ARM registers? -->

``````{margin}
```{warning}
We only give registers for x86 architectures.
ARM architectures have a different naming convention.
```

```{note}
Registers starting with `r` could also start with `e` or have no prefix.
This indicates whether the register is a 64, 32, or 16 bit registers.
More details can be found [here](https://en.wikibooks.org/wiki/X86_Assembly/X86_Architecture)
```
``````

```{list-table}
:header-rows: 1

* - Register
  - Name
  - Function
* - `rax` 
  - _accumulator registre_
  - generally the register that stores the return value of a function (if necessary, it will store a function argument)
* - `rbx`
  - _base register_
  - typically used for storing function arguments, especially pointers
* - `rcx`
  - _count register_
  - typically keeps track of the loop count or index into a string for string operations
* - `rdx`
  - _data register_
  - can be a register for an argument to a function
* - `rsi`, `rdi`
  - _index register_
  - _source_ and _destination_ registers for stream operations (such as outputing text to terminal)
* - `rbp`
  - _base pointer_
  - points to the bottom of the stack (a first-in-last-out data structure)
* - `rsp`
  - _stack pointer_
  - points the the top of the stack
* - `r8`-`r15`
  - _additional registers_
  - generally used to store function arguments
* - `xmm0` - `xm15`
  - _SIMD registers_
  - used to vectorize arithmetic operations
* - `st0`-`st7`
  - _floating-point unit registers_
  - for floating-point arithmetic
```

```{note}
There are a limit to the number of arguments a function can take.
This is generally determined by the number of register available on the CPU.
If you find yourself passing a large number variables to a function, you should think about restructuring your code.
```

### Command Types
<!-- _TODO:_ Add corresponding ARM commands? -->


### Revisiting `Hello, World!`

The disassembly example that we looked at in the last chapter is

```nasm
.LC0:
        .string "Hello, Wolrd!"
main:
        push    rbp
        mov     rbp, rsp
        mov     esi, OFFSET FLAT:.LC0
        mov     edi, OFFSET FLAT:_ZSt4cout
        call    std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*)
        mov     esi, OFFSET FLAT:_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_
        mov     rdi, rax
        call    std::basic_ostream<char, std::char_traits<char> >::operator<<(std::basic_ostream<char, std::char_traits<char> >& (*)(std::basic_ostream<char, std::char_traits<char> >&))
        mov     eax, 0
        pop     rbp
        ret
```

In fact, this the disassembly generated using the `gcc` compiler on Compiler Explorer.
The corresponding disassembly for the `clang` compiler is (slightly longer and more complicated)

```nasm
__cxx_global_var_init:                  # @__cxx_global_var_init
        push    rbp
        mov     rbp, rsp
        movabs  rdi, offset std::__ioinit
        call    std::ios_base::Init::Init() [complete object constructor]
        movabs  rdi, offset std::ios_base::Init::~Init() [complete object destructor]
        movabs  rsi, offset std::__ioinit
        movabs  rdx, offset __dso_handle
        call    __cxa_atexit
        pop     rbp
        ret
main:                                   # @main
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     dword ptr [rbp - 4], 0
        movabs  rdi, offset std::cout
        movabs  rsi, offset .L.str
        call    std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*)
        mov     rdi, rax
        movabs  rsi, offset std::basic_ostream<char, std::char_traits<char> >& std::endl<char, std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&)
        call    std::basic_ostream<char, std::char_traits<char> >::operator<<(std::basic_ostream<char, std::char_traits<char> >& (*)(std::basic_ostream<char, std::char_traits<char> >&))
        xor     eax, eax
        add     rsp, 16
        pop     rbp
        ret
_GLOBAL__sub_I_example.cpp:             # @_GLOBAL__sub_I_example.cpp
        push    rbp
        mov     rbp, rsp
        call    __cxx_global_var_init
        pop     rbp
        ret
.L.str:
        .asciz  "Hello, Wolrd!"
```

For this reason, we will on disect the `gcc` disassembly, the the idea is the same.


## Debugging
