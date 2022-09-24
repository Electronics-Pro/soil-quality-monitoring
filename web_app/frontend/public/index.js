//  import React from 'react';
// import ReactDOM from 'react-dom';
// import $, { data } from 'jquery';

// // <!DOCTYPE html>
// // <html>
// //   <head>    
// //   </head>
// //   <body>
// //     <input type="button" id='script' name="scriptbutton" value=" Run Script " onclick="goPython()">

// //     <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

// // //     <script>
// //         function goJson(){
// //             $.ajax({
// //               url: "",
// //              context: document.body
// //             }).done(function() {
// //              console.log;
// //             });
// //         }
// //     </script>
// //   </body>
// // </html>
// $.getJSON('https://api.thingspeak.com/channels/1868200/feeds.json?api_key=2C0Y1XKALE3YZA5H&results=2', function(data){

// })
// console.log.data;


let url = 'https://api.thingspeak.com/channels/1868200/feeds.json?api_key=2C0Y1XKALE3YZA5H&results=2';

fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out);
})
.catch(err => { throw err });

//how to fetch json data from url using java script?