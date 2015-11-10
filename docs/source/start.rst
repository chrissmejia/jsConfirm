########################
Start
########################

This is the developer documentation for jsConfirm

============
Why Django?
============

It contains a little django app to test how it works in `TurboLinks <https://github.com/rails/turbolinks>`_ scenario, I don't know Ruby then I choose to change it because it's not required in the job description, but I can switch the backend if it's need it.

==============
Requirements
==============

* Python 3 ``sudo apt-get install python3``
* `VirtualEnvs <http://docs.python-guide.org/en/latest/dev/virtualenvs/>`_

==============
How to run it?
==============

----------------
First time only
----------------
* Create an python3 virtualenv ``virtualenv -p python3 ~/.virtualenvs/jsConfirm``
* Activate virtualenv ``source ~/.virtualenvs/jsConfirm/bin/activate``
* Move to the project folder (requirements.txt should be there)
* Install pip dependences ``pip install -r requirements.txt``

----------------
Every time
----------------
* Activate virtualenv ``source ~/.virtualenvs/jsConfirm/bin/activate``
* Move to the project folder (manage.py should be there)
* Activate virtualenv ``python manage.py runserver``