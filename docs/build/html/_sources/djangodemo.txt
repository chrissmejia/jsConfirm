###########
Django Demo 
###########

This is a light django demo to fully test the component, uses Turbolink and it has it's own fake API.

============
Start
============

You can find a live running demo at: `52.91.90.46 <http://52.91.90.46/>`_ or you can install your `own enviroment <djangoinstall.html>`_ .


============
Why Django?
============

It contains a little django app to test how it works in `TurboLinks <https://github.com/rails/turbolinks>`_ scenario, I don't know Ruby then I choose to change it because it's not required in the job description, but I can switch the backend if it's need it.

============
Fake API
============

With the app there's a fake API how always return the same object to test the JSON responses.

============
CSS
============

The demo uses 2 CSS extra modules, a light reusable and reusable `framework <framework.html>`_ and it's own specific.

============
JS
============

There's 2 places where you can find specific js for the demo

------------
App.js
------------

Contains the ``Inits`` and ``Callbacks``, and also a cool effect to center content for big screens.

-------------
The base html
-------------

It's there to set the ``API URL`` and ``csrf``, it was placed there just for tests, don't do this in production.
