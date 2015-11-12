########################
Framework
########################

This is a light reusable framework coded for this test.

============
The grid
============

The grid it's Foundations compatible with 12 columns and 5 sizes (``small``, ``medium``, ``large``, ``xlarge`` and ``xxlarge``), the number of columns and the sizes can be combiled to generate responsive web pages in a really easy way.

E.g.: You can set the class of a div to ``small-12 medium-8 large-6 xlarge-4 xxlarge-3`` then, for small devices like mobile phones it's going to have a width of 100%, for tablets-like a width of 66.66%, 50% for pc-like devices and so on. 

-------------
Mobile first
-------------

The grid follows the ``Mobile First`` technique, you should start coding the mobile version first, after that you start grown the screen and make adjustments using media queries.

Following this principle, ``small-12`` it's going to set the width to 100% in every size, and it's only going to be rewrite if it need it, then ``small-12 large-6`` set width to 100% for small and medium and it's rewrite to 50% in large and bigger sizes.

=============
Media Queries
=============

To make the life easier, the media queries are already set for you, and can be called like this:

.. code-block:: python

   @media #{$small-up} { }
   @media #{$small-only} { }

   @media #{$medium-up} { }
   @media #{$medium-only} { }

   @media #{$large-up} { }
   @media #{$large-only} { }

   @media #{$xlarge-up} { }
   @media #{$xlarge-only} { }

   @media #{$xxlarge-up} { }
   @media #{$xxlarge-only} { }

================
Position Helpers
================

Positioning text of objects it's a regular task than can be automaticed using helpers, in this way your css it's going to be smaller.

-------------
Floating
-------------

* Right ``right``
* Left ``left``

-------------
Text position
-------------

* Left ``text-left``
* Center ``text-center``
* Right ``text-right``