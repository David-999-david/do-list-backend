const express = require('express');
const cors = require('cors');

const app = express();

const corsOption = {
    origin : 'http://localhost:5555'
};

const PORT = process.env.PORT || 8888;

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({extended : true}));

const db = require('./models');

db.sequelize.sync()
.then(() => {
    console.log('Successfully synced DB!')
})
.catch((error) => {
    console.log('Failed to synced!')
})

require('./routes/list.route.js')(app)
require('./routes/user.route.js')(app)

app.get('/', (req, res) => {
    res.json({
        message : 'Welcome to MSI!'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})