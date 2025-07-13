import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // Your backend URL

const URLShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState('');

  // Generate and store a unique session ID
  useEffect(() => {
    let id = localStorage.getItem('session_id');
    if (!id) {
      id = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', id);
    }
    setSessionId(id);
  }, []);

  // Fetch history on load
  useEffect(() => {
    if (sessionId) {
      axios.get(`${API_BASE}/api/history/${sessionId}`)
        .then(res => setHistory(res.data.history))
        .catch(err => console.error(err));
    }
  }, [sessionId]);

  const handleShorten = async () => {
    if (!url) return alert("Please enter a URL");

    try {
      const response = await axios.post(`${API_BASE}/api/shorten`, {
        url,
        session_id: sessionId
      });
      setShortUrl(response.data.short_url);

      // Refresh history
      const histRes = await axios.get(`${API_BASE}/api/history/${sessionId}`);
      setHistory(histRes.data.history);
    } catch (err) {
      console.error(err);
      alert("Error shortening the URL");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '60%', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleShorten} style={{ padding: '10px 20px' }}>
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Shortened URL:</h3>
          <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>Last 5 URLs:</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <a href={`${API_BASE}/${item.short_code}`} target="_blank" rel="noreferrer">
                {API_BASE}/{item.short_code}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default URLShortener;
