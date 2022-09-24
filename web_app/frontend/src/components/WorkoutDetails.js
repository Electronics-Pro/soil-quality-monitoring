import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      
      <p><strong>Latitude: </strong>{workout.latitude}</p>
      <p><strong>Longitude: </strong>{workout.longitude}</p>
      <p><strong>temperature: </strong>{workout.temperature}</p>
      <p><strong>Light_Intensity: </strong>{workout.Light_Intensity}</p>
      <p><strong>apiData: </strong>{workout.apiData}</p>
      <p><strong>UV: </strong>{workout.UV}</p>
      <p><strong>humidity: </strong>{workout.humidity}</p>
          
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
//how to connect thinkspeak to our website?
/* <html>
<head>
<script>
var request = new XMLHttpRequest();
var urlHere = "https://api.thingspeak.com/channels/527143/feeds.json?";
    urlHere = urlHere + "pi_key=I6AD9OVB2SXX03HC&results=1";
console.log(urlHere);
request.open('GET', urlHere, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    var dia = date.getDate();
    var mes = date.getMonth();
    mes++;
    var ano = date.getFullYear();
    var hora = date.getHours();
    var minuto = date.getMinutes();
    document.getElementById("camb").innerHTML = "Câmbio Dólar: R$ " + data.feeds[0].field1 +  " | Atualizado em " + dia + "/" + mes + "/" + ano + " às " + hora + ":" + minuto;
    } else {
    // We reached our target server, but it returned an error
     }
     };

    request.send();
    </script>
    </head>
    <body>
    <div  width = "100%" id="camb" style="font-size:15px; text-align:left; color: white; margin- 
     left: -300px; background-color: red; border-left: 300px solid red; border-bottom: 5px solid red; 
     border-top: 300px solid red; overflow: hidden;  margin-top: -300px; font-family: Brandon, 
     Grotesque, sans-serif;"></div>
  </body>
</html>

 */
//how to create realtime graph using react?
// scales: {
//   x: {
//     type: "realtime",
//     realtime: {
//       onRefresh: function() {
//         data.datasets[0].data.push({
//           x: Date.now(),
//           y: Math.random() * 100
//         });
//       },
//       delay: 300,
//       refresh: 300
//     }
//   },
//   y: {
//     max: 100,
//     min: 0
//   }
// }



// // 
