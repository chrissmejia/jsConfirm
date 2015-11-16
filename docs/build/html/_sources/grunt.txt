########################
JS first steps
########################

We use Grunt to automatize, test and produce quality JS

============
Requirements
============

* `NodeJS <https://nodejs.org>`_
* Grunt ``npm install -g grunt-cli``

==========
Quickstart
==========

* Go to JS repository folder ``djangodemo/jsConfirm/static_source``
* Run ``npm install`` (only the first time)
* Run ``grunt``

And that's it, grunt will run JSHint tests, compress, minify and place your JS properly.

Please notice that grunt it's only used for the component, the demos have plain uncompressed js to make it easier to read.