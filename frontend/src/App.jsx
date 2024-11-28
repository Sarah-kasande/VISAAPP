import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [country, setCountry] = useState('');
    const [visaData, setVisaData] = useState(null);
    const [error, setError] = useState('');

    const fetchVisaInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/visa-info?country=${country}`);
            setVisaData(response.data);
            setError('');
        } catch (err) {
            setVisaData(null);
            setError('No visa information found or an error occurred.');
        }
    };

    return (
        <div className="passport-container">
            <div className="passport-header">
                <h1>Visa Information</h1>
            </div>

            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter Country Name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button className="search-button" onClick={fetchVisaInfo}>
                    Explore
                </button>
            </div>

            <div id="resultsContainer">
                {error ? (
                    <div className="visa-card">
                        {error}
                    </div>
                ) : visaData ? (
                    visaData.visaTypes.map((visa, index) => (
                        <div key={index} className="visa-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <h3>{visa.name}</h3>
                            <p><strong>Duration:</strong> {visa.duration}</p>
                            <ul>
                                {visa.requirements.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="visa-card">
                        Enter a country and click "Explore" to see visa information.
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
