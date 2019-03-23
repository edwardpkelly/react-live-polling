## React Live Polling

A sample application that demonstrates a web app that permits one Speaker and multiple audience Members and or/Users to participate in an online poll. When a speaker selects a question to ask, all clients (Users) will be notified and display the current question. The Board component dislays the current question along with the reslts of all client choices using a bar graph.

#### Installing
Clone the project from Github and run:
```
npm install
```
The app is configured to run on localhost. The Express server will use port `3000` and for the frontend React code the Webpack Development Server will use port `8080`. 

In order to compile the app and start the local web server, run:
```
npm run WDS
```
Once the start page is loaded into your browser you may then Join as an audience member, Join as the Speaker or you may simply follow the link to the Board to view the Live polling results. 

### Built With
* [Express](https://expressjs.com/) - The Node.js server framework
* [Socket.IO](https://socket.io/) - Real time event based communication
* [React](https://reactjs.org/) - The frontend user inrerface library
* [Bootstrap](https://getbootstrap.com/) - Frontend component library
* [Chart.js](https://www.chartjs.org/) - Javascript charting library
* [Webpack](https://webpack.js.org/) - The Javascript bundler

### Author 
* Edward P. Kelly
