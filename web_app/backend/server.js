// require('dotenv').config()
const dotenv = require("dotenv");
// import $ from 'jquery';
dotenv.config();
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

 
        

//   mongoose.connectTo(process.env.TP_URI)
//   .then(() => {
//     console.log('connected to database')
//     // listen to port
//     app.listen(process.env.PORT, () => {
//       console.log('listening for requests on port', process.env.PORT)
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   }) 

//   app.use((req, res)=>{
//     req.'/'
//   })

//   how to connect api url with mongodb server?
// var db = null // global variable to hold the connection

// MongoClient.connect('mongodb://localhost:5500/', function(err, client) {
//     if(err) { console.error(err) }
//     db = client.db('test') // once connected, assign the connection to the global variable
// })

// app.get('/', function(req, res) {
//     db.collection('test').find({}).toArray(function(err, process.env.TP_URI) {
//         if(err) { console.error(err) }
//         res.send(JSON.stringify(process.env.TP_URI))
//     })
// })


// var conn = MongoClient.connect('mongodb://localhost:5500/') // returns a Promise

// app.get('/', function(req, res) {
//     conn.then(client=> client.db('test').collection('test').find({}).toArray(function(err, process.env.TP_URI) {
//         if(err) { console.error(err) }
//         res.send(JSON.stringify(process.env.TP_URI))
//     }))
// })


