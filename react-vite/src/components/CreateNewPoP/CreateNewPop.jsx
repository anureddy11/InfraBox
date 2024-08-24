import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreatePop } from '../../redux/pops'; // Adjust the path as needed
import uniqueCities from './cities'; // Make sure this import is correct
import './CreateNewPop.css';
import { useNavigate } from 'react-router-dom';

const CreateNewPop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');
  const [selectedCity, setSelectedCity] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkCreatePop({
        name,
        city: selectedCity.city,
        country: selectedCity.country,
        region: selectedCity.region,
        status,
      })).then(() => {
        navigate('/all'); // Navigate to /all after successful submission
      }).catch(error => {
        console.error('Failed to create pop:', error);
      });
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value;
    const cityData = uniqueCities.find(c => c.city === selectedCityName);
    setSelectedCity(cityData || {});
    setCity(selectedCityName);
  };

  return (
    <div className="create-new-pop-container">
      <h1>Create New Pop</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="city">City:</label>
        <select id="city" value={city} onChange={handleCityChange} required>
          <option value="">Select a city</option>
          {uniqueCities.map((c) => (
            <option key={c.city} value={c.city}>
              {c.city}
            </option>
          ))}
        </select>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="active">Active</option>
          <option value="outof production">Out of Production</option>
        </select>

        <button type="submit">Create Pop</button>
      </form>
    </div>
  );
};

export default CreateNewPop;
