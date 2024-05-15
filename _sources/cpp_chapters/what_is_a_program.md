# What is a program

C++ is a compiled language, meaning that to execute code written in C++, it has first be converted into machine code: this is the job of the compiler.
We will talk about the compiler in the next chapter, but in general, to have a good understanding of any programming language, it is important to understand what the compiler does behind the scene.
Programs are resulting machine code executable.
These executables are hardware specific, meaning that that a program compiled on Windows machine, will not work on a Mac or Linux machine.

There are generally three ingredients to making a program:
1. The source code: the header files and translation uints
1. The libraries which the program has to link to
1. The compiler, which is generally bundled with the linker, that translate our code to machine code.

The source code is generally what we write, or take from other people.
These are the _.cpp_ and _.hpp_ (and various other file suffixes, but these are the ones that we will use) files.
The libraries are either provided by the operating sytstem, such as `libc`, or are installed via package manager, such as `libopenblas`.
The compiler translates _.cpp_ files into machine code, and the linker matches all the _symbols_ between these _translation units_ and library calls.
If all the symbols can be resolved (i.e., function, variables, types and operations), the executable is linked and can be run on the device.

As our first program, and the standard first program for any language, we will write a `"Hello, World!"` program, which prints the sentence to your command line (also known as _standard out_ or _stdout_).
In C++, this looks like

```c++
#include <iostream>

int main() {
    std::cout << "Hello, World!" std::endl;
    return 0;
}
```

We will make sure you have the infrastructure to compile programs in the next chapter, but for this chapter is good enough to use my favorite website [Compiler Explorer](https://godbolt.org).
Feel free to copy to code snippet above, navigate to [Compiler Explorer](https://godbolt.org), and paste.
What you should see on the website is

```{figure} ../images/godbolt_hello_world_1.png
:name: godbolt-hello-world

Screenshot of Compiler Explorer, with the source code (left) and disassembly (right)
```

The left-hand side represent the code we are compiling, while the right-hand side shows us the _disassembly_ (we reproduce the content here for convenience).

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

This is computer code that has been converted to assembly for us to know exactly what operations the CPU is executing.
We won't get into it here (we will explain what each line does in the next chapter), but learning to understand disassembly will be a valuable tool for optimization purposes in the future.
In general, a good rule-of-thumb for preformance considerations is: _the fewer lines of actual machine instructions, the better_.
We will rely on the compiler to do most of the optimization, but there are tricks we can use to help the compiler out.
One of the most notable instance, which I will mention here without further clarification, is using lambda functions instead of function pointers.

To see the output of our code, we have to add an executor.
This can be accomplished by clicking the `Add new...` drop-down menu on the right-hand side and selecting the `Executor From This` option.

This will return another, third column with the contents

```bash
Program returned: 0
Program stdout
Hello, World!
```
