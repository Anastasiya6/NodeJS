const express = require('express');

const path = require('path'); 

const Event = require('./models/event');

const Participant = require('./models/participant');

const app = express();

const mongoose = require('mongoose');

const PORT = 3000;

const db = 'mongodb+srv://nastya605:mongo123@cluster0.il4mf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(db, {})
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error)); 

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.static('styles'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const title = 'Events';
    const page = parseInt(req.query.page) || 1; 
    const limit = 12; 
    const skip = (page - 1) * limit; 

    Event
        .find()
        .skip(skip)
        .limit(limit) 
        .then(events => {

            return Event.countDocuments().then(count => {
                const totalPages = Math.ceil(count / limit); 
                res.render(createPath('events'), { events, title, page, totalPages });
            });
        })
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        });
});

app.get('/register/:id', (req, res) => {
    const title = 'Add Registration';
    const eventId = req.params.id;
    res.render(createPath('registration'), { eventId,title });
});

app.post('/add-participant', (req, res) => {

    const { fullName, email, dateOfBirth, eventId, source } = req.body;
    
    const participant = new Participant({ fullName, email, dateOfBirth, eventId, source });
    participant
      .save()
      .then((post) => {
        res.redirect('/');
    })
      .catch((error) => handleError(res, error));
});

app.get('/event/:id/participants', (req, res) => {
    const eventId = req.params.id;
    const title = 'Event Participants';

    Participant
        .find({ eventId })  // Знайти всіх учасників, які зареєстровані на цю подію
        .then(participants => {
            if (!participants.length) {
                return res.status(404).send('No participants found for this event');
            }
            res.render(createPath('eventParticipants'), { participants, title });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Server error');
        });;
});