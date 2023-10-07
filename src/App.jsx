import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  // const [LocationStatus, setLocationStatus] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    }
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const getWeather = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=3bd2bd0b2f68434a8ed82333232809&q=${input} &aqi=no`
    )
      .then((res) => res.json())

      .then((data) => {
        setResponse(data);
        console.log(data);
      });
    console.log(input);
  };
  useEffect(() => {
    document.createElement("img");
    document.createElement("h3");
  }, []);

  return (
    <div className="container">
      <div className="details">
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Enter your Location"
            className="input"
            value={input}
            onChange={handleInput}
          />
          <button className="getWeather-btn" onClick={getWeather}>
            Get Weather
          </button>
        </div>

        <div className="temperature">
          <h3>
            <span>{response?.current.temp_c} </span>
            <span>°C</span>
          </h3>
          <p>{response?.current.name} </p>
        </div>
      </div>

      <div className="bottom-container">
        <div>
          <h3>
            <span>{response?.current.humidity} </span>
            <span>%</span>
          </h3>
          <p>Humidity</p>
        </div>
        <div>
          <h3>
            <span>{response?.current.wind_kph} </span>
            <span>Kmp/h</span>
          </h3>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default App;
// input.map((index, input) => {
//   return (
//     <div key={index}>
//       <h3>
//         <span>{index.current.temp_c}</span>
//         <span>°C</span>
//       </h3>
//       <p>{index.name} </p>
//     </div>
//   );
// });
