import React from 'react';
import URLShortener from './components/URLShortener';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'white', background: '#1a1a1a', minHeight: '100vh' }}>
      <h1>URL Shortener</h1>
      <URLShortener />
    </div>
  );
}

export default App;
