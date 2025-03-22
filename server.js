const express = require('express')
const app = express()
const port = 8888

const bodyParser = require('body-parser')


// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userdb', { useNewUrlParser: true }); 
mongoose.connection
.once("open", () => console.log('Connected to MongoDB')) 
.on("error", error => {
    console.log("MongoDB Error: " + error);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

const userRoutes = require('./app/routes/userRoutes');
app.use('/user', userRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const setupSwagger = require('./swagger');
setupSwagger(app);