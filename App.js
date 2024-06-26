import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [hints, setHints] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const registerUser = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username });
      alert('User registered successfully');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const requestHint = async () => {
    try {
      const response = await axios.post('http://localhost:5000/request_hint', { username });
      setHints(response.data.hints);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const getLeaderboard = async () => {
    const response = await axios.get('http://localhost:5000/leaderboard');
    setLeaderboard(response.data);
  };

  return (
    <div>
      <h1>CTF Hints</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
      <button onClick={requestHint}>Request Hint</button>
      <button onClick={getLeaderboard}>Get Leaderboard</button>
      <h2>Hints: {hints}</h2>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index}>{user[0]}: {user[1].hints} hints</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
