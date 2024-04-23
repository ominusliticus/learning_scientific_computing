# Numerical Integration
[Compiler explorer development](https://godbolt.org/z/MnW77oMfo)

<!--
```{admonition} TODO List for godbolt
:class: warning
- Add comment boarders that easily distinguish the different cases
- Finish implementation of other numerical methods
```
-->

In this chapter, we will present several numerical integration techniques, including:
- Riemann sums (midpoint)
- Trapezoid
- Simpson's Rule
- Gaussian Quadrature
- Adaptive Quadrature

We will define interfaces that allows one to supply both arrays and function pointers.

## Numerical Integration: An Overview

When we learn about integrals, we also learn about anti-derivatives.
We quickly learn that finding these anti-derivatives can be difficult, requiring techniques like partial fraction decompositions or trignometric substituion.
So integrand simply have no closed form anti-derivatives, and it is for these that numerical integration is important.

The intuition about numerical integration is built from Riemann sums: one successively slices the integration interval into more and more bins and adds up the area of the rectangles inside the interval.
As with all numerical techniques, such methods incure a _descretization error_.
Such an error shrinks as the number of rectangles approaches infinity, but at the cost of exorbitant computation.

For numerical integration, more clever methods to cut down on computational costs but maitain small descretization have developed.
The most popular of such methods are called _quadrature methods_ (their generalization to dimensions larger than one is _cubature_).
These will be discussed in more detailed below.

It must be said, however, that minimization of numerical errors is not aways desirable: the numerical integration scheme chosen depends on the problem you wish to solve.
When evaluating an integral to find an average, a quadrature method may suffice.
When solving an integral equation, a Simpson rule may be required.
The key difference is whetherthe the points at which the integrand is being evaluated are regularly spaced or irregularly spaces.
A problem like an integral equation, will be much simpler if the integration domain is descritized regularly (in one dimension), whereas its descritization in three dimensions could be uniform (sparse grid quadrature methods) or non-uniform (finite element analysis and spectral methods).

In this chapter, we will focus on 1-dimensional integration domains.
We will present implementations with increasing complexity for you to choose which you prefer.
At the end, as usual, there will be a link to a Compiler Explorer instances where the code has been implemented and tested.
Starting with this chapter, we will see that these numerical techniques oftern depend on numerical methods implemented on other domains of mathematics, such as linear algebra.
We will provide links to the relevent material as needed.

## Midpoint Sum Rule
