{
"name": "final-project-dci",
"version": "1.0.0",
"description": "**Team members:** Christian, Jose and Bel",
"main": "index.js",
"scripts": {
"start": "node server",
"server": "nodemon server",
"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
},
"repository": {
"type": "git",
"url": "git+https://github.com/belcosta/Final-Project-DCI.git"
},
"keywords": [],
"author": "Christian, Jose, Isabel",
"license": "ISC",
"bugs": {
"url": "https://github.com/belcosta/Final-Project-DCI/issues"
},
"homepage": "https://github.com/belcosta/Final-Project-DCI#readme",
"dependencies": {
"bcrypt": "^5.0.0",
"concurrently": "^5.3.0",
"connect-mongo": "^3.2.0",
"cookie-parser": "^1.4.5",
"cors": "^2.8.5",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-session": "^1.17.1",
"express-validator": "^5.3.0",
"jsonwebtoken": "^8.5.1",
"moment": "^2.29.1",
"mongoose": "^5.11.15",
"morgan": "^1.10.0",
"nodemon": "^2.0.7",
"redux-devtools-extension": "^2.13.8",
"redux-thunk": "^2.3.0"
}
}
