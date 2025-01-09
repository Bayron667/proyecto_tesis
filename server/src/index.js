const express = require('express');
const app = express();
const port = 3001;
const routes = require('./api/endPoints');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Puerto escucha: ${port}`);
});