# Pointers, References and Values

From: https://godbolt.org/z/GW7eMKT1E

```c++
#include <iostream>

// Ignore this for now, it is simply a convenient way to print things.
//      print(10, 20);      // Outputs: 10 20
template<typename...Args>
void print(Args&&...args)
{
    ((std::cout << std::forward<Args>(args) << " "), ...);
    std::cout << std::endl;
}

// Pointers

// A review on pointers:
// Recall that pointer stores an address.
// If I have a declaration
//      T* p;
// The p stores an address and at that address we expect an object of type T
// To access the object, I have to dereference the pointer as: *p.
// For example:
//      double* p = new double;  // Creates pointer and allocates memory on heap, but *p has no value
//      *p = 30.0;               // We have no set the value of the double stored at address p
//  
// Pointers are particularly important if I wanted to store something in memory, but I don't know how 
// much memory I need when I write the program.
// For example: If I create a program that is a gradebook, I can have a varying number of students 
// and or assignment every semester.
// The "new" keyword let's us know that we are asking for memory during the program.
// Such memory is called "heap memory", and we can continue to request more as long as there is memory
// available.
//
// For variables that we know the size of information being stored, we don't need the "new" keyword.
// For example:
//      double v = 30.0;    // v is not a pointer, it simply stores a value;
// However, this variable still lives somewhere in computer memory,  so it must also have an address.
// I can get that address by "referencing" the variable.
// For example:
//      double v = 30.0;
//      double* p = &v;     // p is a pointer that points to the location where v is stored.
// Notice how *p has a value, and that we did not have to use the keyword "new", why is that?
// Generally, variables that don't require the new keyword are stored on the "stack"
//
//
// This brings us to an important concept: YOU CANNOT DEREFERENCE AN UNDEFINED POINTER!
//      double* p;      // This is an undefined pointer, more accurately, a null-pointer
//
//
// That last think to know is that addresses are essentially store as large natural numbers (unsigned integers).
// They are represented in hexademical, as indicated by the "0x" at the beginning of the output
// (to test this, go to python and type "hex(1234567)").
// But because they are stored as unsigned integers, you preform arithmetic with pointes.
// This will be useful when we talk about arrays next

// Below, are some propmpts where I want you to guess what the output is:
//  - if it is a pointer, then just state pointer
//  - if it is a value, then give the expected value

int 
main()
{
    double x = 10.0;    // identitical to: double x{ 10.0 };
    double y = 5.0;     // identitical to: double y{ 5.0 };
    double z = 1.0;     // identitical to: double z{ 1.0 };
                        // This "brace-initialization" lets you know you're dealing with value types
    
    double* p1 = &x;
    double* p2 = &y;
    double* p3 = &z;
    double* p = new double(2.0);    // Here, we have assigend a value to *p

    // tryu predicting the output before looking at it
    // Remember: to produce the output you must go to the "+ Add new..." tab above and add the "Execution Only" option
    // this will open a new window for you
    print(x);
    print(p1);
    print(*p1 + *p2);

    p2 = &x;
    print(*p2 - x);
    print(&z);

    *p3 = x + y + z;
    print(*p3);
    print(z);

    delete p;   // Any pointer allocated with new needs a corresponding delete call

    return 0;
}
```


# Pointers and references

From: https://godbolt.org/z/bGaj169TE

```c++
#include <iostream>

// It is time to create a class.
// To appreciate this you have to understand variables and functions.
// Classes provide a neat way to encapsulate data (variables) and the operations (member functions or methods) you wish to perform on the data.
// Today's class will be an array with some conveince functions
//
// In addition, we will need to become aware of template programming.
// Template programming allows us to create variables, functions and class that are generic in the type.
// Remember that C++ is a strongly typed language that means that all types have to be known at compile time.
// This also means that, if you want a function to be defined for any data type, you have to write the corresponding implementation
//
// For exampe: I am tired of constantly typing "stc::cout <<" and "std::endl;" after printing a single variable.
// In general, I want to be able to print address, ints, doubles, chars and strings.
// I can combine all of these by writing the function
//      template<typename T>
//      void print(T& t)
//      {
//          std::cout << t << std::endl;
//      }
// and the compiler takes care of "instantiating" the definition for all the relevant types that make a call to this function througout the 
// program.

// Here I take template programming up another notch, but we will discuss this Wednesday
template<typename... Args>
void print(Args&&... args)
{
    ((std::cout << std::forward<Args>(args) << " "), ...);
    std::cout << std::endl;
}

// We want our Array class to store any data type, so we make it generic in type T
template<typename T, int N>
class Array {
    // This access specifier is used to determine who can call the members below it outside of the class.
    // Anything marked "public" can be accessed using the "." or "->" syntax.
    // Anything private cannot
    public:
    // Every class needs constructors and destructors.
    // The constructors tell the program how to build the class given some input data, while the destructor tells the computer how to 
    // relinquish any resources the class may have claimed.

    // Constructors always have the same name as the class, and there can be multiple
    Array() = default;          // Get used to always including this line, it automatically defines a "default constructor for you"
    Array(T t[], int size);     // Constructor that takes an array
    Array(const Array& other);  // Constructor used to make a copy, called "copy constructor"
    Array(Array&& other);       // Constructor used to consume a copy, called "move constructor"

    // Destructors are denoted with a tilde preceeding the name, and there can only be one
    // For this class, we don't have worry about resource management because everything is stack allocated
    ~Array() = default;

    // Now we wish to overload the assignment operator "=", which play a similar role to the copy and move constructors above
    // In general, the other Array object could have a different but convertible type.
    // In most cases, the compiler can perform this check for us (though there are ways to make the conversion and its check very explicit)
    Array& operator=(const Array& other);   // This is the "copy assignment"
    Array& operator=(Array&& other);        // This is the "move assignment"
    // For a simple class like this, we could have easily made these default
    // Array& operator=(const Array& other) = default;
    // Array& operator=(Array&& other) = default;    

    // next we have some accessor functions, that allow the user to view the contained data
    T* data() const { return m_data; }      // Gives access to data, but the "const" ensures the data won't be changed
    int size() const { return m_size; }    // Gives access to size, but the "const" ensures that the m_size can't be modified

    // Since we have an array, we might wish to index into the array, and possible change an entry
    // This is done by overloading the "[]" operator
    T& operator[](int i) { return m_data[i]; }          // allows mutation at index i
    T& operator[](int i) const { return m_data[i]; }    // does not allow mutation at index i, and needed for "const correctness"
    // It is customary to add "bounds checking" to such indexing operators, which ensure that the index "i" is less than "m_size"
    // Go ahead and add the bounds checking to the function body.

    // There are many more functions we can define: see the documentation for the standard library of the array class for details.
    // We will avoid these for this example, as the idea is to introduce many key concepts of a class to you

    // It is costumary to make the data the class represents private to mitigate any chances of an outsider to mutate the data
    private:
    T m_data[N];    // The "m_" is optional, but helps communicate that the variable is private; the "m" standing for "member"
                    // This the pointer to the array we are storing
    int m_size;     // This is the size of the array, or number of entries

};  // This ending semi-colon is very important


// The above amounts to the "class declaration", but note that none of the function bodies have been defined besides the 
// accessors.
// For a non-templated class, it is customary to provide the definitions in a separate .cpp, where the .hpp and .cpp file share the same names.
// For a templated class, for compiler reason, the functions have to defined in/with the declaration.
// So we could, in principle, have included all of the function definitions in the declarations above, but that wouldn't be as instructive.
// To implement the function bodies, we need a couple more libraries

#include <cassert>      // for assert           <------ crashes program if asssumption given is not met
#include <cstring>      // for std::memcpy      <------ to copy memory from location to another
#include <memory>       // for std::move        <------ we will talk about this next lecture
#include <utility>     // for std::exchange    <------ returns current value, and replaces with supplied value

// We begin by implementing the constructors, pay close attention to where the template parameters are being included
template<typename T, int N>
Array<T, N>::Array(T t[], int size)
{
    print("Value constructed called"); // This line is solely for booking keeping
    assert(size == N);
    m_size = N;

    for (int i{ 0 }; i < N; ++i)
        m_data[i] = t[i];
}

// Copy constructor
template<typename T, int N>
Array<T, N>::Array(const Array<T, N>& other)
{
    print("Copy constructor called");
    m_size = other.m_size;
    for (int i{ 0 }; i < N; ++i)
        m_data[i] = other.m_data[i];
}

// Move constructor
template<typename T, int N>
Array<T, N>::Array(Array<T, N>&& other)
{
    print("Move constructor called");
    m_size = std::exchange(other.m_size, 0);
    for (int i{ 0 }; i < N; ++i)
        m_data[i] = std::move(other.m_data[i]);
}

// Copy assignment
template<typename T, int N>
Array<T, N>& 
Array<T, N>::operator=(const Array<T, N>& other)
{
    print("Copy assignment called");
    m_size = other.m_size;
    for (int i{ 0 }; i < N; ++i)
        m_data[i] = other.m_data[i];
    return *this;
}

// Move assignment
template<typename T, int N>
Array<T, N>& 
Array<T, N>::operator=(Array<T, N>&& other)
{
    print("Move assignment called");
    m_size = std::move(other.m_size);
    for (int i{ 0 }; i < N; ++i)
        m_data[i] = std::move(other.m_data[i]);

    return *this;
}

int 
main()
{
    // Check basic functionality of class
    int a[5] = { 1, 2, 3, 4, 5 };
    Array<int, 0> arr_1;
    Array<int, 5> arr_2(a, 5);

    Array<int, 0> arr_3(arr_1);
    Array<int, 5> arr_4 = arr_2;
    Array<int, 0> arr_c;
    arr_c = arr_1;

    // Are these move/copy constructions or assignments?
    auto arr_5(std::move(arr_1));
    auto arr_6 = std::move(arr_2);
    Array<int, 0> arr_m;
    arr_m = std::move(arr_1);

    return 0;
}
```
