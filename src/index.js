const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://mahesh999333:mahesh999333@cluster0.tecej.mongodb.net/blog", {
})
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))


app.use('/', route);


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});