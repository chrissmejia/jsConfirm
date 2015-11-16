##########################
Django Environment Install
##########################

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

PS: Your application should be responding for static files at: ``http://127.0.0.1/`` in that way django can read this address: ``http://127.0.0.1/jsConfirm/djangodemo/jsConfirm/static/``