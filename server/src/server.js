require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Root endpoint hit');
});

app.get('/api/health', (req, res) => {
    res.json(
        {status : 'ok',
        message : 'Server is running fine'
        }
    );
    console.log('Health check endpoint hit');
});

app.listen(port, () => {
  console.log(`Hello Buddy I am listening you on port ${port}`);
});