const sequelize = require('./configurations/config');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const books_router = require('./routes/books');
const bseller_router = require('./routes/bestseller');
const users_router = require('./routes/users');
const reviews_router = require('./routes/reviews');
const upload_router = require('./routes/upload');

sequelize.sync().then((result) => {
    if (result) {
        console.log("connected to database " + result.config.database);
    }

}).catch((err) => { console.log(err); });


app.use('/books', books_router);
app.use('/best-seller', bseller_router);
app.use('/users', users_router);
app.use('/reviews', reviews_router);
app.use('/upload', upload_router);


app.listen(3000, () => { console.log('the server is on 3000'); })