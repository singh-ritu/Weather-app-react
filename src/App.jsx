import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [locationSearch, setLocationSearch] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const string =
          position.coords.latitude + "," + position.coords.longitude;
        getWeather(string);
      });
    }
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const getWeather = (str = "") => {
    if (str || input) {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=3bd2bd0b2f68434a8ed82333232809&q=${
          str ? str : input
        }&aqi=no`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network Response is not ok");
          }
          return res.json();
        })

        .then((data) => {
          setResponse(data);
          setLocationSearch(true);
          console.log(data);
        });
    }
    console.log(input);
  };

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
          <button className="getWeather-btn" onClick={() => getWeather()}>
            Get Weather
          </button>
        </div>

        <div className="temperature">
          <h3>
            <span>{response?.current.temp_c} </span>
            <span>°C</span>
          </h3>
          <h3>{response?.location.name} </h3>
        </div>

        {locationSearch && (
          <>
            {" "}
            <img
              src={response?.current.condition.icon}
              alt="weather-img"
              className="img"
            />
            <h4>{response?.current.condition.text}</h4>
          </>
        )}
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
