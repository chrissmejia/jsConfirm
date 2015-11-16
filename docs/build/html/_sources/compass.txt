########################
CSS first steps
########################

We use Compass to automatize and produce quality CSS

============
Requirements
============

* `Ruby <https://www.ruby-lang.org/en/downloads/>`_
* `Compass <http://compass-style.org/install/>`_

==========
Quickstart
==========

* Go to SASS repository folder ``djangodemo/jsConfirm/static_source``
* Run ``compass watch``

Now everytime you make a change at the scss files a compressed version is going to be placed automatically at ``djangodemo/jsConfirm/static/css/`` folder.

==========
Modules
==========

The CSS for this project and demo are divided in 3 modules, a reusable base framework, a web module with the specifics for the django demo and a self contained jsConfirm module. 

----------
Framework
----------

Under ``/scss/framework`` folder there's a light reusable `Foundation 5 compatible <http://foundation.zurb.com>`_ css 12 columns grid, written specifically for this test, it contains a responsive grid, position helpers and transitions.

`See framework specifics <framework.html>`_


----------
Web module
----------

Organized CSS for the django demo

----------
jsConfirm
----------

The most important module it's named jsConfirm and it's special because it's self contain, you don't need the rest of the modules to use it.

`See component css specifics <csscomponent.html>`_
