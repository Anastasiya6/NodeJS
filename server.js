const express = require('express');

const path = require('path'); 

const { readSync } = require('fs');

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


// Маршрут для сторінки з подіями
/*app.get('/events/:id', (req, res) => {
    const title = 'Event';
    res.render(createPath('event'), { title, event });
});*/

app.get('/', (req, res) => {
    const title = 'Events';
   // const events = await Event.find().limit(10); 
    Event
    .find()
    .limit(12)
    .then((events) => res.render(createPath('events'), { events, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get('/register/:id', (req, res) => {
    const title = 'Add Registration';
    const eventId = req.params.id;
    /*Event
    .findById(req.params.id)
    .then(post => res.render(createPath('register'), { post, title }))
    .catch((error) => handleError(res, error));*/
    res.render(createPath('registration'), { eventId,title });
});

app.post('/add-participant', (req, res) => {
    console.log( req.body);
    const { fullName, email, dateOfBirth, eventId, source } = req.body;
    
    const participant = new Participant({ fullName, email, dateOfBirth, eventId, source });
    participant
      .save()
      .then((post) => res.status(200).json(post))
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