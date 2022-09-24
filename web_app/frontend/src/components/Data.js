import { useState } from "react";

const API = () => {
    const [apiData, setApiData] = useState('');
    useEffect(() => {
        data();
    }, [])

    async function data(props) {
        let data = await fetch("https://api.thingspeak.com/channels/1868200/feeds.json?api_key=2C0Y1XKALE3YZA5H&results=2");
        let jsondata = await data.json();
        console.log(jsondata);
        setApiData(jsondata.feeds);
        return (<p>data:{props.feeds} </p>)
    }
    

}
export default API