# SnakePad

Hello, welcome to my SnakePad project. As someone who has a growing collection of corn snakes, I need a way that was more user friendly and exicitng than a excel spreadsheet. This is a second iteration of the project, re-built from the ground up with logic improvements and better component usage. 

## Deployed Link

https://snakepadhome.netlify.app/

## Project Details

Log in using Auth0 is intended, but for demo purposes it's been left out, on the homepage you're greeted to your very own list of snakes.

![webpage](https://i2.paste.pics/fa92dc54e02bc700225b2383860938b4.png)

On this page you can add snakes to your collection, delete them, and just generally have access to high level information on your snakes.

If you click more info you will be sent to the detail page of that particular snake:

![webpage](https://i2.paste.pics/c7b7fedb62c48b2f7e11fb34380dd5e1.png)

On this page you can update the snake's info and add new records using the Add record button.

## Technologies Used

The front end for this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

The back end for this project was done using Spring-boot, deployed in heroku.

### Back End Repo Link

https://github.com/inu009/snaketrackerv2

### Back End Deployed Link

https://snake-tracker-api.herokuapp.com/

Main API endpoints:

api/snakes\
api/notes\
api/weights\
api/sheds\
api/feedings

This API will allow users to create a list of snakes. Each snake has many to one relationship to notes, weights, sheds, and feedings. A typical response to a singular snakes looks like this: 

![webpage](https://i2.paste.pics/d47291328fc0721c180e7df96a6b2f37.png)
