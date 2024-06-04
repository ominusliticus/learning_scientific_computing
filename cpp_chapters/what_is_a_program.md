# What is a program

C++ is a compiled language, meaning that human radable code needs to turn into machine readable code berfore execution, this is the job of the compiler.
The compiler will be discussed in the next chapter, but generally, good comprehension of the compiler facilitates good understanding of the program.
For the context of these notes, a program  will refer to a compiled exectable of C++ source code.
These executables are operating system (OS) specific, meaning that that a program compiled on Windows, will not work for Mac or Linux.
Futhermore, an instance of a running program or executable will called an application.

There are three primary ingredients to compiling a program:
1. The translation unit: source (.cpp) and  header(.hpp) files
1. The dynamic and static libraries required by the linker
1. The compiler which will assemble the machine code and link all the libraries and units

Source code is any file that can be written or changed changed on a computer, andis relevant to the application/executable.
This is primarily source and header files; which, generally use the extension _.cpp_ and _.hpp_ respectively.
Note, that there are other file extensions that may denote a source or header files.
Libraries are either provided by the operating sytstem, such as `libc`, or are installed via package manager, such as `libopenblas`.
Libraries are a product of compiled code, similar to executables but cannot be run as applications.
Static libraies are physical copies of compiled code that need to be available to the linker at compile time.
Dynamically linked libraries forego the requirement of a physical copy, and just need the library to be avaialbe on the system.
For dynamically linked libraries, it is still necessary to compile a file, defining the symbols, alongside the executable.
Symbols refer to functions, classes, variables, etc. defined in source and header files, while logic refers to the implementation of these symbols.
The compiler translates _.cpp_ files into machine code, and the linker matches all the _symbols_ between _translation units_ and _libraries_.
If all the symbols can be resolved , the executable is linked and can be run on the device.

The standard first program for any language is a the _hello world_ program. 
In which the string `"Hello, World!"` is written to the command line (also known as _standard out_ or _stdout_).
In C++, this may look like:

```c++
#include <iostream>

int main() {
    std::cout << "Hello, World!" std::endl;
    return 0;
}
```

Proper compiler infrastructure wiill be addressed in the next chapter.
For this chapter t is recommended a free onlice compiler, such as [Compiler Explorer](https://godbolt.org).
Feel free to copy to code snippet above and run it in any online compiler.
The expected ouput of the program for [Compiler Explorer](https://godbolt.org) is as follows:

```{figure} ../images/godbolt_hello_world_1.png
:name: godbolt-hello-world

Screenshot of Compiler Explorer, with the source code (left) and disassembly (right)
```

The left-hand side represents the code being compiled, while the right-hand side shows _disassembly_ (reproduced below for convenience).

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

Assembly is machine code that is formatted in a more digestable manner, to represent the exact commands ran on the processor during execution.
Each line and its meaning is further discussed in the next chapter, but undersanding disassembly is vital for optimization in high performance contexts.
In general, the rule for optimization to follow is: _the fewer lines of actual machine instructions, the better_.
Modern compilers are incredibly advanced and implement various optimizations already, but passing compiler flags can facilitate futher or specific optimization as well.

To see the output of our code, an executor must be added.
This is accomplished by clicking the `add new...` drop-down menu on the right-hand side and selecting the `Executor From This` option.

This will return a third column with the contents:

```bash
Program returned: 0
Program stdout
Hello, World!
```
