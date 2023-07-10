const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/'
const port = process.env.PORT ?? 3001;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to DB"))
    .catch((error) => console.log(error));


// const User = require('./models/User');
const Review = require('./models/Review');

app.get('/reviews', async (req, res) => {

    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    }
    catch (err) {
        console.error(`error: ${err}`)
        res.status(500).send({ error: "Error fetching reviews from DB." })
    }
});

app.get('/reviews/approved', async (req, res) => {

    try {
        const reviews = await Review.find({ approved: true });
        res.status(200).json(reviews);
    }

    catch (err) {
        console.error(`error: ${err}`)
        res.status(500).send({ error: "Error fetching approved reviews from DB." })
    }
});


app.post('/reviews/add', async (req, res) => {
    const review = new Review({
        reviewText: req.body.reviewText,
        firstName: req.body.firstName,
        lastInitial: req.body.lastInitial,
        city: req.body.city,
        email: req.body.email,
        approved: req.body.approved ?? false,
    })

    review.save()
    res.json(review)
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './build/index.html'));
  });


app.listen(port, () => console.log(`server connected on port ${port}`))
