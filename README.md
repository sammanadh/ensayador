# Ensayador
*A google forms clone for wine companies to perform survey on their products*


__Features__
1. Authtication and authorization for food company and testers in both front and back end
1. Company can create new surveys
1. Testers can fill surveys
1. Company can manage testers (register and remove)
1. Charts that illustrates responses using google charts API

__Steps for running in your local machine__

1. Set up XAMPP if you have not already
1. Place this project folder inside of `htdocs`
1. Start Apache and MySql from xampp

***For Database***
1. Find the `.sql` that is included in the project folder
1. Go to `http://localhost/phpmyadmin/` from your browser of choice
1. Create a new database
1. Run the code in `.sql` inside the new database

***For Client***
1. Install npm if have not already
1. Go to client folder
1. Run `npm install` to install all the dependencies
1. Run `npm start` to start run the client (by deafault it will run on port 3000)

***For Server***
1. Go to server folder
1. Set environment variable in `.env` file

***Now, you must be able to use this application. Enjoy.***
