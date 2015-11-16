########################
JS helpers
########################

This is a developer description of how the helpers works.

The helpers are "private" functions to split how the component works in a better, modular and cleaner way.

In convention, the helpers start with ``_``, e.g.: ``jsConfirm._postForm``.

jsConfirm avoid the use of ``Closures`` for performance reasons, for more, please see: `High Performance JavaScript <http://shop.oreilly.com/product/9780596802806.do>`_

============
_click
============

It's the event attached to the ``click event``, it's an unique event that launch the modals, fire the ajax call or the ``callback`` and close the modal (For performance).

:e: Event

============
_postForm
============

This function makes the ajax call, retry if it fails and call the ``callback`` with the data.

:url: URL to send the call
:params: Data to send
:callback: Callback
:retry: If it's true, and it fails, then retry

============
_get
============

This is the cache factory, it store the calculated values the first time they are need it, after that it return the precalculated value avoiding to hit the DOM at least you force it.

:name: Variable name
:getFn: Function to calculate 
:force: Discard cache

=============
_prepareModal
=============

If the modal window don't exists then it call ``_createModal``, after that, see if the windows have been resized, if it does then call ``_recalculate`` and at the end call ``_startPosition`` to place the window at the rignt place.

=============
_createModal
=============

Create the modal window in a verbose way following ECMAScript standard.

Please notice: ECMAScript way it's slower than innerHTML in old browsers (1.17x times slower in Firefox 3.5) and faster in new WebKit browsers (1.15x times faster in Chrome 3), it's the same for Opera 10.

=============
_visible
=============

Return ``true`` if the modal window it's visible without touch the DOM

=============
_resize
=============

It's the event attached to the ``resize event``, if the modal window is visible then call ``_recalculate`` and ``_center`` to place in the right place inmediatly, if it's not then set ``resized`` to ``true`` and the recalculation will be executed only when they are need it.

=============
_recalculate
=============

Recalculate the DOM

:d: Modal window

===============
_preventDefault
===============

x-browser prevent default action and cancel bubbling

:e: Event

=============
_removeClass
=============

Remove a class from a dom object

:d: DOM element
:className: Class to remove

=============
_addClass
=============

Add a class from a dom object

:d: DOM element
:className: Class to add

=============
_hasClass
=============

Check if an element has a class

:d: DOM element
:className: Class to check

================
_getChildByClass
================

Get a child element using a class

:d: DOM element
:className: Class to get

==================
_getChildByClasses
==================

Get a child element using more than one classes

:d: DOM element
:classNames: Classes to get

==================
_windowWidth
==================

Get the window width

==================
_windowHeight
==================

Get the window height

==================
_modalWidth
==================

Get the modal window width

:d: Modal window

==================
_modalHeight
==================

Get the modal window height

:d: Modal window

==================
_hCenter
==================

Center the modal in x axys

:d: Modal window

==================
_vCenter
==================

Center the modal in y axys

:d: Modal window

==================
_center
==================

Center the modal in the screen

:d: Modal window
:animate: If it's ``false`` then move the window inmediatly

==================
_startPosition
==================

Move the modal window to his start position

:d: Modal window
:animate: If it's ``false`` then move the window inmediatly

==================
_show
==================

Call ``_prepareModal`` to get all set, set the custom text for the element and show the modal calling ``_vCenter``, in the process set ``window`` and ``target`` to keep track of what's happening without hit the DOM.

:d: Modal caller element
:className: Modal caller class

==================
_hide
==================

Hide the modal window, and clear ``window`` and ``target``.