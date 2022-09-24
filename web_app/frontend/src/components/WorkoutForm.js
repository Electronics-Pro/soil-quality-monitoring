import { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import React from 'react'
import '../pages/Home'
const WorkoutForm = ({data}) => {
  const { dispatch } = useWorkoutsContext()
  const [temperature, setTemp] = useState('')
  const [humidity, setHum] = useState('')
  const [latitude, setLat] = useState('')
  const [longitude, setLong] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const [apiData, setApiData] = useState('');

  async function data() {
    let data = await fetch("https://api.thingspeak.com/channels/1868200/feeds.json?api_key=2C0Y1XKALE3YZA5H&results=2");
    let jsondata = await data.json();
    console.log(jsondata);
    setApiData(jsondata);
  }
  useEffect(() => {
    data();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { temperature, humidity, latitude, longitude }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)

      setLat('')
      setLong('')
      setHum('')
      setTemp('')
      setApiData('')
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }








  }

  return (
    <>
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New latitude and longitude</h3>

      <label>Latitude:</label>
      <input
        type="number"
        onChange={(e) => setLat(e.target.value)}
        value={latitude}
        className={emptyFields.includes('latitude') ? 'error' : ''}
      />

      <label>Longitude:</label>
      <input
        type="number"
        onChange={(e) => setLong(e.target.value)}
        value={longitude}
        className={emptyFields.includes('longitude') ? 'error' : ''}
      />

      <label>Temperature:</label>
      <input
        type="number"
        onChange={(e) => setTemp(e.target.value)}
        value={temperature}
        className={emptyFields.includes('temperature') ? 'error' : ''}
      />
      <label>Humidity:</label>
      <input
        type="number"
        onChange={(e) => setHum(e.target.value)}
        value={humidity}
        className={emptyFields.includes('humidity') ? 'error' : ''}
      />

      <button>Add </button>
      
      
      {error && <div className="error">{error}</div>}
    </form>
    <div>
    {
      apiData?.feeds?.map(item=>{
        return <div>ID:{item.entry_id}
        <div className='containers'>
       <div> Temperature: {item.field1}</div>
        <div>Humidity: {item.field2}</div>
        <div>Pressure: {item.field3}</div>
        <div>Light_Intensity: {item.field4}</div>
        <div>UV_Index: {item.field5}</div>
        <div>Precipitation: {item.field6}</div>
        
        </div>
        
        

        </div>
      

      })
    }    
  
    </div>
    </>
  )
}

//how to show data vertical in js ?
            // {
            //     "name": "Edge",
            //     "y": 4.02,
            //     "drilldown": "Edge",
            //     dataLabels:{
            //             rotation:90,
            //         y:-20
            //     }
            // },
            // {
            //     "name": "Opera",
            //     "y": 1.92,
            //     "drilldown": "Opera",
            //     dataLabels:{
            //             rotation:90,
            //         y:-20
            //     }
            // },




//how to post json data to mongodb?
//modify your code like this
// var url = (apiData)

// request(url, function(error, response, body){

//  if(!error && response.statusCode == 200){
//     var data = JSON.parse(body);
//     res.send(data);

//     var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://localhost:27017/mydb";

//     MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       var myobj = [];
//       myobj.push(data);
//       db.collection("dabas").insertMany(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//       });
//     });
//  }
// });

//your problem is you passing obj not array
//see below link for your reference













export default WorkoutForm;