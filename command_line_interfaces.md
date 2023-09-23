# The Command Line
Before computers has _windows_ and a mouse to navigate between applications, all computing happend view text that was entered a single line at a time.
Despite the seemingly limited form of operability that this seems to offer, it is this minimal interface that we will start with.

Different operating systems typically have different command line interfaces.
This boils down to the commands that you can enter to make the computer do something like: create/delete a file, navigate between directory, etc.
We will solely focus on POSIX systemd, these include what you would find in most Linux operating systems and MacOS.

## Opening a terminal
To open a terminal you can press
- `<Space>`+`<Cmd>` on MacOs, then type `terminal` and press `<Enter>`
- `<Super>` on Linux and type `terminal` and find your terminal application

## The four most basic commands
The four most basic commands that you will need whenever navigating files on POSIX systems are
- `cd` - Change director
- `ls` - list files in directiy
- `mkdir` - create a directory
- `rm` - remove a file

:::{note}
As we familiarize ourselves with C++, we will be able to understand how file structures work, should you want to appreciate the plumbing that goes into designing operating systems.
:::

Each command comes with a set of _flags_ that you can pass to modify the behavior of the command.
To see some examples, you can click on the drop down menu. 

<details>
  <summary>Flags for common POSIX commands</summary>
  Here I include some example commands and their flags and show what their execution looks like
  
  ### `cd`
 
  `cd` - here there are no flags we will ever really need to worry about

  ### `ls`
  
  ````{tab} ls  
  Noting is here
  ````
  ````{tab} ls -1
  lists one file per line
  ````
  ````{tab} ls -l 
  lists files with privileges, author, owner, timestamps
  ````

</details>
