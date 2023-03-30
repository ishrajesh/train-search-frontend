import React, { useState } from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('price');


  const searchTrains = async () => {
    try {
      setError('');
      const response = await axios.get(`/trains/search?source=${source}&destination=${destination}`);
      setTrains(response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'An error occurred while searching for trains');
    }
  };

  const sortTrains = (trains) => {
    const sortedTrains = [...trains];
  
    switch (sortOption) {
      case 'price':
        sortedTrains.sort((a, b) => a.price - b.price);
        break;
      case 'departureTime':
        sortedTrains.sort((a, b) => new Date(`1970/01/01 ${a.starting}`) - new Date(`1970/01/01 ${b.starting}`));
        break;
      // Add more sorting options if needed
      default:
        break;
    }
  
    return sortedTrains;
  };
  

  return (
    <div className="App">
      <h1>Train Search Application</h1>
      <div>
        <label>
          Source:
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </label>
        <label>
          Destination:
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <button onClick={searchTrains}>Search Trains</button>
      </div>
      <div>
        <label>
          Sort by:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="price">Price</option>
            <option value="departureTime">Departure Time</option>
          </select>
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <div>
        {sortTrains(trains).map((train, index) => (
          <div key={index} className="train">
            <h2>{train.train}</h2>
            <p>Starting: {train.starting}</p>
            <p>Reaching: {train.reaching}</p>
            <p>Distance: {train.distance} Kms</p>
            <p>Price: Rs {train.price}</p>
          </div>
        ))}
      </div>
    </div>
);
}

export default App;