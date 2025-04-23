const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('<h1>Welcome!</h1><p>Visit <a href="/hello">/hello</a></p>');
});

app.get('/hello', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
