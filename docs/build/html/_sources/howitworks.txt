########################
How it works
########################

Quick start with the component.

Please note: A html light demo was provided for you, it is placed at the repository root with the name ``htmldemo``.

============
Requirements
============

* `jsConfirm.css <https://raw.githubusercontent.com/chrissmejia/jsConfirm/master/djangodemo/jsConfirm/static/css/jsConfirm/jsConfirm.css>`_
* `jsConfirm.min.js <https://raw.githubusercontent.com/chrissmejia/jsConfirm/master/djangodemo/jsConfirm/static/js/jsConfirm.min.js>`_

============
Setup
============

This is the minimal setup:

.. code-block:: js

   jsConfirm.init('delete', {
       callback: customCallback
   });

In this example ``delete`` it's the class asigned to the DOM elements to fire the modal and ``customCallback`` it's the function to call when the user click the proceed button.

=====================
Changing default text
=====================

jsConfirm provides optional settings to change the modal text, this options are:

* title
* text (modal message)
* cancelText
* proceedText

In that way you can adapt the modal to another language or functionality

.. code-block:: js

   jsConfirm.init('like', {
       callback: customCallback,
       title: "Like Image",
       text: "Are you sure you want to save it?",
       cancelText: "Cancel",
       proceedText: "Save file",
   });

===================
Sending custom data
===================

Most of the times you want a personalized message for each window or send an id to the ajax call, that's easy to make with jsConfirm, you can sent data to the component using a ``data-someting`` property in your dom caller and specifying the data on the init, e.g.:

.. code-block:: html

    <a class="like" href="#" data-name="pic1.jpg" data-id="1"></a>

.. code-block:: js

   jsConfirm.init('delete', {
       callback: customCallback,
       data: ["name", "id"]
   });

Please notice: you also need to follow the intructions to make ajax calls or to change the descriptions

===================================
Adding custom text for each element
===================================

Set a custom message for each item it's easy after send the data, you only need to add the custom text ``{/name/}`` where name it's the data you wanna set in that place, e.g.:

.. code-block:: html

    <a class="like" href="#" data-name="pic1.jpg"></a>

.. code-block:: js

   jsConfirm.init('delete', {
       callback: customCallback,
       text: "Are you sure you want to save {/name/}?",
       data: ["name"]
   });

===================
Ajax support
===================

jsConfirm has ajax post support by default, you only need to set an ``url`` parameter in the settings on the init, e.g.:

.. code-block:: js

   jsConfirm.init('delete', {
       callback: customCallback,
       url: "https://yourapi.com/"
   });

-------------------
Sending custom data
-------------------

The support for custom data it's set it by default, you only need to provide your data parameter and start sending the data to the request, you can also specify custom data for each request using the ``extra`` parameter, this is convenient to send csrf and any other required data, e.g.:

.. code-block:: html

    <a class="delete" href="#" data-name="pic1.jpg" data-id="1"></a>

.. code-block:: js

   jsConfirm.init('delete', {
       callback: customCallback,
       url: "https://yourapi.com/"
       text: "Are you sure you want to delete {/name/}?",
       data: ["name", "id"],
       extra: {
           csrfmiddlewaretoken: "csrf"
       }
   });

That code it's going to make a post call to ``https://yourapi.com/`` with ``id``, ``name`` and ``csrfmiddlewaretoken``.


======================
Multiple confirmations
======================

Sometimes we need to add more than one confirmation in our project, jsConfirm support natively this feature without any change, just start a second modal, e.g.:

.. code-block:: js

   jsConfirm.init('delete', {
       callback: customCallback
   });

   jsConfirm.init('like', {
       callback: customCallbackTwo
   });

Please notice: jsConfirm reuse the modal window for performance, then, if you set a custom title make sure you set a custom title for all your confirmations.

======================
Callbacks
======================

The callback it's a simple function to be executed when the user confirm the action or when the ajax call get the response, it receive 2 params:

* ``target`` the caller DOM object
* ``data`` the ajax json response

.. code-block:: js

   customCallback = function(target, data) {
       "use strict";

       // Do something
   };