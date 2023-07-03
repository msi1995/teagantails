const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
const uri = process.env.MONGODB_URI || 'mongodb+srv://lloyddg7:8aZEZm88WRPg0CPe@cluster0.0iaovkx.mongodb.net/teagan_site?retryWrites=true&w=majority'
const port = process.env.PORT || 3001;

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
    const reviews = await Review.find();
    res.json(reviews);
});

app.get('/reviews/approved', async (req, res) => {
    const reviews = await Review.find({ approved: true });
    res.json(reviews);
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


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'));
  });


app.use(express.static(path.join(__dirname, '../client/build', 'index.html')));


app.listen(port, () => console.log(`server connected on port ${port}`))
