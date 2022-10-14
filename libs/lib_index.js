const express = require('express')
var app = express();
var avenue = require('../config/alley/avenue')
var fileUpload = require('express-fileupload')

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use(express.static('./public/upload'));

const cors = require('cors');
var users = avenue.users

require('dotenv').config();
const PORT = process.env.PORT || 8080
const corsOption = {
    origin: `localhost:${PORT}`
}
app.use(cors(corsOption))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', users);


app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
})