# Image AI Social Media

## Description
A platform where users can leverage OpenAI to generated AI images and share them with the community.
Visit the deployed project here: https://image-ai-sm.netlify.app

## Installation and Usage
For this project to run on your local machine, you need to have Node installed and have a Mongo database, OpenAI account and Cloudinary account configured and ready to use.
Confirm you have Node installed by running ```node --version```. 
1. Clone this repository using ```git clone```.
2. Enter the cloned project using ```cd Dalle-Social-Media```.
3. First, enter the backend using ```cd server```, and install dependencies using ```npm install```.
4. Make a .env file and enter in the following credientials from MongoDB:
MONGODB_URL: link to your MongoDB database.
CLOUDINARY_API_KEY: API key for your Cloudinary account.
CLOUDINARY_API_SECRET: API secret for your Cloudinary account.
CLOUD_NAME: Unique identifier associated with your Cloudinary account.
OPENAI_API_KEY: API key for your OpenAI account.
ACCESS_TOKEN_SECRET: Secret string for your JSON Web Token (make sure it is not easy to guess for security purposes).
5. Run the server on your local machine using ```npm start``` (server should be running on port 8080).
6. Moving on to the frontend, from your clone project, move into the client directory using ```cd client```.
7. Install dependencies using ```npm install```.
8. Run the React-Vite app on your local machine using ```npm run dev```.
9. React app should be running and usable on port 5173.

## Technologies Used
React.js - UI development and interactivity.
Node.js - Backend server runtime environment.
Express.js - REST API development.
MongoDB - Database operations.


