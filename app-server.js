const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.listen(PORT, () => {
    console.log(`Live Polling App Running on Port ${PORT}`);

})