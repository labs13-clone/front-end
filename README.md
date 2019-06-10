🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline, feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 5️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.

# 1️⃣ Code Clone

1️⃣ You can find the deployed project at 

#Front end: https://clone-coding-client.herokuapp.com/
#Back end: https://clone-coding-server.herokuapp.com/

## 4️⃣ Contributors

🚫Add contributor info below, make sure add images and edit the social links for each member. Add to or delete these place-holders as needed

[Chase Fulks](https://github.com/chasefulks)                            |      
[<img src="https://avatars3.githubusercontent.com/u/43450021?s=400&v=4" width = "200" />]
(https://www.linkedin.com/in/chase-fulks-b0958a186/)

[Student 2](https://github.com/)                                        |                                       
[Student 3](https://github.com/)                                        |                                       
[Student 4](https://github.com/)                                        |                                       
[Student 5](https://github.com/)                                        |

| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
[<img src="https://avatars3.githubusercontent.com/u/43450021?s=400&v=4" width = "200" />]
|[<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |

<br>
<br>

🚫 4️⃣ Optional examples of using images with links for your tech stack, make sure to change these to fit your project

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Typescript](https://img.shields.io/npm/types/typescript.svg?style=flat)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b5c4db1c-b10d-42c3-b157-3746edd9e81d/deploy-status)](netlify link goes in these parenthesis)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

🚫 more info on using badges [here](https://github.com/badges/shields)

## Project Overview

1️⃣ [Trello Board](https://trello.com/b/mS8o68sX/labs13-clone)

1️⃣ [Product Canvas](https://docs.google.com/document/d/1a1hz8MjvYVNe1HGXz4M4E63-9sX2loYAHXT2BET1mO8/edit#heading=h.1jaf6eug9n0k)

1️⃣ [UX Design files](https://projects.invisionapp.com/share/M5S7CBCB8PG#/screens/366238390) 


Our app helps learn and master JavaScript in an entertaining manner. It is suitable for users of any level of knowledge. If you are master or totally beginner you will be able to find a lot of code challenges of different difficulty levels and also create your own challenges for users.  


## Key Features

### User Profile View
  - Can view user profile information
  - View all challenges they already started
  - View all challenges they completed
  - View unapproved challenges they created
    - Edit unapproved challenges they created
  - Admins can get any unapproved challenges
    - Admins can edit unapproved challenges
    - Admins can approve a challenge

### Create Challenge View
  - Create a new code challenge
    - Tab to create a description
    - Tab to create a skeleton function
    - Tab to create tests
        - Run tests
        - Console
            - Clear Console Button
    - Tab to create a solution
        - Run solution
        - Console
            - Clear Console Button
  - Save Button

  
### Search Challenge View
  - Get any approved challenges
  - Optionally filter challenges by difficulty
  - Show challenges not completed by default
    - Optionally filter for challenges already completed
    - Users can retake a challenge they already completed
  - Allow users to start a code challenge

### Complete Code Challenge View
  - View Challenge Information
    - Title, Difficulty, Instruction, and Categories
  - Get the user's already existing submission
  - Save their answer
    - Either every X seconds or each time they make a change
  - Users can retake a challenge they already completed
  - Submit their answer for review
  - Skip the challenge and go to another
    - Same difficulty level


## Application Structure

 - Auth
    - Protected Route
    - Auth
    - Callback
 - Utility
    - WebWorker
 - Components
    - Views
        - User Profile
            - Tabs
            - Sidebar
            - User Card
        - Create Challenges
        - Search Challenges
        - Complete A Challenge
            - Render Markdown
        - Not Found (404)
        - LandingPage
    - Layout
        - Header
        - Main
        - Footer
    - Shared
        - Editor (Complete A Challenge & Create Challenge & Edit Challenge)
            - Lines Of Code
            - Markdown or Javascript
        - Console (Complete A Challenge & Create Challenge & Edit Challenge)
        - MetaData Form (Create Challenge & Edit Challenge)
        - Challenge Card (Search Challenges & User Profile Tabs)



## Tech Stack

### Front end (https://github.com/labs13-clone/front-end):

#### React

-    Fast render with Virtual DOM 
-    Allows to use reusable UI components.
-    A good option for single page application.
-    Has great developer tools.

🚫List the rest of the front end features and libraries in the same format as the framework above.

#### Front end deployed to `heroku`

#### Back end (https://github.com/labs13-clone/back-end):

#### Node

-    Allows to write server-side applications in JavaScript.
-    We using the same language on both the front end and the back end.
-    Has a great package manager, npm, and a large amount of available open-source tools in npm’s registry.

🚫 List the rest of the back end end features and libraries in the same format as the framework above

#### Back end deployed to `heroku`

# APIs

## 2️⃣ Authentication API here

🚫Replace text below with a description of the API

Water's like me. It's laaazy ... Boy, it always looks for the easiest way to do things A little happy sunlight shining through there. Let all these little things happen. Don't fight them. Learn to use them. Even the worst thing we can do here is good.

## 2️⃣ Payment API here

🚫Replace text below with a description of the API

This is the way you take out your flustrations. Get away from those little Christmas tree things we used to make in school. Isn't it fantastic that you can change your mind and create all these happy things? Everything's not great in life, but we can still find beauty in it.

## 3️⃣ Misc API here

🚫Replace text below with a description of the API

You can do anything your heart can imagine. In life you need colors. This is where you take out all your hostilities and frustrations. It's better than kicking the puppy dog around and all that so. I'm sort of a softy, I couldn't shoot Bambi except with a camera. Trees get lonely too, so we'll give him a little friend. We'll lay all these little funky little things in there.

## 3️⃣ Misc API here

🚫Replace text below with a description of the API

When you do it your way you can go anywhere you choose. Let your heart take you to wherever you want to be. If I paint something, I don't want to have to explain what it is. A tree needs to be your friend if you're going to paint him. That's a son of a gun of a cloud. Even the worst thing we can do here is good.

## 3️⃣ Misc API here

🚫Replace text below with a description of the API

Volunteering your time; it pays you and your whole community fantastic dividends. Maybe there's a happy little waterfall happening over here. You can spend all day playing with mountains. We don't have to be committed. We are just playing here. You have freedom here. The only guide is your heart. It's cold, but it's beautiful.

# 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

🚫These are just examples, replace them with the specifics for your app

    *  REACT_APP_apiKey - this is your Google API key, which can be generated in the Google Cloud Console
    *  REACT_APP_authDomain - when you set up your Firebase project, this information will be in the dashboard
    *  REACT_APP_databaseURL - in the Firebase dashboard
    *  REACT_APP_projectID - in the Firebase dashboard
    *  REACT_APP_storageBucket - in the Firebase dashboard
    *  REACT_APP_messagingSenderId - in the Firebase dashboard
    *  REACT_APP_stripe_API - this is your public Stripe API key, generated in the Stripe dashboard
    *  REACT_APP_backendURL - optional for your local development server
    *  REACT_APP_clientid - this is the Stripe_connect clientID, generated in Stripe_connect settings
    *  REACT_APP_stripe_plan - this is the ID for a second Stripe subscription plan, generated under Stripe products

# 5️⃣ Content Licenses

🚫For all content - images, icons, etc, use this table to document permission of use. Remove the two placeholders and add you content to this table

| Image Filename | Source / Creator | License                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| doodles.png    | Nicole Bennett   | [Creative Commons](https://www.toptal.com/designers/subtlepatterns/doodles/) |
| rings.svg      | Sam Herbert      | [MIT](https://github.com/SamHerbert/SVG-Loaders)                             |

# 4️⃣ Testing

🚫Document what you used for testing and why

# 4️⃣ Installation Instructions

🚫explain how to install the required dependencies to get this project up and running with yarn and NPM

## Other Scripts

🚫replace these examples with your own

    * typecheck - runs the TypeScript compiler
    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](🚫_link to your backend readme here_) for details on the backend of our project.
