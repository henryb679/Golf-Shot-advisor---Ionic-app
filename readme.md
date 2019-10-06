# SWEN 325 - Assignment 1 Readme

Link to the video demonstration
https://youtu.be/XlvW6vXs954


## Golf Shot Advisor - App Description
* The golf shot advisor application is designed to replace the need to write the results of each 
and every golf game on a piece of paper. This app was built using ionic v4.
* The app allows the user to see the current weather forecast based on their current GPS location, 
see results from other golf players that use the app to improve their golf scores in 
the future.

To run the code
```
npm install
```
* This will ensure that all the dependencies are added

```
ionic serve
```
* Then open the application via http://localhost:8100/


## App code Structure

### /app 

#### /dashboard - handler
The handler manages the Ionic tab page structure where new page routes can be added at any time via the hander.router.module.ts.

#### /dashboard - home
Once the user has logged in, they are first greeted to the current weather conditions subject to the user allowing for GPS permission to track the current weather conditions. This is done via the Capacitor Geolocation plugin. From the Geolocation data provided, the user
can the weather Another feature that has been implemented is the ability for the user to see their previous golfing results. 

#### /dashboard - leaderboard
The leaderboard was designed to allow the user to compare their golf results with others. This feature was not fully implemented
due to time constraints but should be easy to implement given that the overall coding structure of the project is following the 
Common rich client mobile application architecture.

#### /dashboard - settings
The settings page has 2 functions, allows the user to log out of the system and check how many golf records they have
entered in the system. The plan was to add the ability for the user to delete all their records but was not implemented due
to time constraints.

#### /login 
The login page is the first point of call when the user first opens the app. The logo of the app is present on this page. 
This page requires the use of authentication.service.ts to validate people's login details.

#### /register
The register page allows a new user to the system to create a personalised account to use the app.
The user's email address and password details are taken with the password being encrypted in google firebase. 


#### /user-result
This modal shows a summary of the golf record entered by the user in the start advisor page in an easier to read form.
Formatting changes can be done without impacting on the functionality of the whole app. 

#### /weather-modal
This modal allows the user to select on the weather ion-card tile on the home page to see a more comprehensive weather forecast for the day.
Information like wind direction is available. Other information can be added at any time with ease by adding it in the ComponentProp function 
under the showModal() function in the home.page.ts.

#### /services
This is primary inside the data layer as data is being outsourced via Google firebase and open weather API.

* **authentication.service.ts**
    * This file contains the login, register and log out functionality that works currently with the login, register and setting page.

* **database.service.ts**
    * This manages the querying and adding of golf record data into the firebase DB. Other operations like updating and deleting records can be easily added 
    in this file.

* **weather.service.ts**
    * This retrieves the information from the open weather API service. The benefit of having the API in this service file is that the weather API can be changed at any time with minimal changes to the files in the project.

#### /assets

In the assets folder, it contains the golf_shot_advisor logo which can be changed at any time. 

#### environment

In this folder, there are 2 files:

* **environment.prod.ts**
    * The boolean statement should be changed if the application is ready for deployment. 
* **environment.ts**
    * This file contains all the API information used by the app (firebase auth + dB, open weather API - for the weather data)
    * All the API information can be easily changed in this file. 

#### theme

In this folder, there is a variable.scss file that contains all the styling CSS attributes used to improve the colour schema and look & feel of the application. 
If the schema needs to be changed, it can be done via http://ionicframework.com/docs/theming/ and then copy & paste the modified schema in the project.

