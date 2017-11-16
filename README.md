# etf_online_competition_system

Before you pull the code, please consider that you have Python 3.6 installed on your machine and that the "PATH" env. variable contains a path to a Python3 executable. After that, you have to setup your local virtual environment for our application in this way:

* open your Terminal/CommandPrompt and cd into your workspace directory e.g. adnan/Code/
* now you create a virtual environment using this command:

    `$ python3 -m venv baze_projekat`
    
* now cd into the "baze_projekat" directory and pull the code 

    `$ cd baze_projekat && git clone https://github.com/adkl/etf_online_competition_system`
    
* now activate your virtual environment and install dependencies we use in our app:

    `$ . bin/activate && pip install -r etf_online_competition_system/requirements.txt` -> For Unix only
    `$ cd Scripts`
    `$ activate`
    `$ cd ..`
    `$ pip install -r etf_online_competition_system/requirements.txt`
    
* now you have all set up!


After you have successfully done the previous steps, you will need to configure the project interpreter in PyCharm. Please follow the steps:

* When you have opened our project in Pycharm, go to Preferences -> Project Interpreter and click on the little wheel in the top right corner of the window, and click on "Add local"

![alt text](https://image.prntscr.com/image/yL8Vsi0PTCKhf6D1Nv4-ow.png)

* Now find the python3 executable from your local environment and press OK

<img src="https://image.prntscr.com/image/NoYVKfCpRymPwKXq51VOSw.png" width="400"></img>

After you have set up your environment, execute this command to create a local database:

`$ python manage.py migrate`

That's it!

Adnan A.
