const express = require('express');
const app = express();
const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
   res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, () => console.log('Server is running on ', port))