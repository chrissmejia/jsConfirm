########################
JS core
########################

This is a developer description of how the core component works.

As you know javascript it's a strong and fast language but suffers huge performance problems meanwhile it's dealing with the DOM, this component it's coded with an eye in performance, that's why hit the DOM just when it's extremely need it.

============
Basics
============

It contains a ``name`` and a ``version`` property just in case that you actually need it but don't affect how the component works, the most important storage variables are:

* ``cache`` saves calculations to hit the DOM as less as it can.
* ``settings`` keep track of the settings for each modal window.
* ``window`` contains the type of the current open modal window.
* ``target`` the reference of the DOM element making the current call.
* ``resized`` it becomes true when the browser window resize and the modal window it's not open, in that way don't recalculate each time, only when it's need it.

============
Init
============

The init function check the integrity of the data, saves the settings and attach a ``resize`` and a ``click`` event.

:className: Modal caller class
:settings: Modal settings
