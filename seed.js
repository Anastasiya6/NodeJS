const mongoose = require('mongoose');

const db = 'mongodb+srv://nastya605:mongo123@cluster0.il4mf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const Event = require('./models/event');

mongoose
  .connect(db, {})
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const seedEvents = [
  {
    title: 'Tech Conference 2024',
    description: 'A conference about new technologies in 2024.',
    date: new Date('2024-05-15'),
    organizer: 'Tech Hub',
  },
  {
    title: 'Music Festival',
    description: 'Annual summer music festival featuring top bands.',
    date: new Date('2024-06-25'),
    organizer: 'Music World',
  },
  {
    title: 'Art Expo',
    description: 'An exposition of modern art from various artists.',
    date: new Date('2024-09-12'),
    organizer: 'Art House',
  },
  {
    title: 'Startup Pitch Day',
    description: 'Pitch your startup idea to top investors.',
    date: new Date('2024-07-19'),
    organizer: 'Startup Network',
  },
  {
    title: 'Culinary Workshop',
    description: 'Learn to cook gourmet meals with professional chefs.',
    date: new Date('2024-08-05'),
    organizer: 'Gourmet School',
  },
  {
    title: 'Charity Run',
    description: 'A fun run to raise funds for local charities.',
    date: new Date('2024-09-20'),
    organizer: 'Community Fund',
  },
  {
    title: 'Book Fair',
    description: 'Meet authors and buy the latest books.',
    date: new Date('2024-10-10'),
    organizer: 'Local Library',
  },
  {
    title: 'Photography Exhibition',
    description: 'Showcasing stunning photography by local artists.',
    date: new Date('2024-10-25'),
    organizer: 'Photo Club',
  },
  {
    title: 'Tech Startup Workshop',
    description: 'Learn how to launch your tech startup.',
    date: new Date('2024-11-15'),
    organizer: 'Innovation Hub',
  },
  {
    title: 'Yoga Retreat',
    description: 'A weekend retreat focusing on wellness and mindfulness.',
    date: new Date('2024-12-01'),
    organizer: 'Wellness Center',
  },
  {
    title: 'Film Screening',
    description: 'Watch independent films and discuss with filmmakers.',
    date: new Date('2024-12-15'),
    organizer: 'Cinema Society',
  },
  {
    title: 'Annual Science Fair',
    description: 'Showcase your scientific projects and innovations.',
    date: new Date('2025-01-20'),
    organizer: 'Science Association',
  },
  {
    title: 'Winter Wonderland Festival',
    description: 'A festive celebration of winter with activities for all.',
    date: new Date('2025-01-25'),
    organizer: 'Festive Events',
  },
  {
    title: 'Coding Bootcamp',
    description: 'Intensive bootcamp to learn coding skills.',
    date: new Date('2025-02-10'),
    organizer: 'Tech Academy',
  },
  {
    title: 'Music Production Workshop',
    description: 'Learn to produce music with industry experts.',
    date: new Date('2025-02-20'),
    organizer: 'Music School',
  },
  {
    title: 'Outdoor Adventure Camp',
    description: 'Experience the great outdoors with thrilling activities.',
    date: new Date('2025-03-01'),
    organizer: 'Adventure Club',
  },
  {
    title: 'Craft Fair',
    description: 'Shop handmade crafts from local artisans.',
    date: new Date('2025-03-15'),
    organizer: 'Artisan Market',
  },
  {
    title: 'Sustainability Conference',
    description: 'Discuss sustainability practices for the future.',
    date: new Date('2025-04-05'),
    organizer: 'Green Initiative',
  },
  {
    title: 'Mental Health Awareness Day',
    description: 'Workshops and discussions about mental health.',
    date: new Date('2025-04-10'),
    organizer: 'Mental Health Organization',
  },
  {
    title: 'Community Clean-Up Day',
    description: 'Join us to clean up our local parks and streets.',
    date: new Date('2025-04-20'),
    organizer: 'Neighborhood Association',
  },
  {
    title: 'Tech Innovations Expo',
    description: 'Showcasing the latest innovations in technology.',
    date: new Date('2025-05-15'),
    organizer: 'Tech Expo',
  },
  {
    title: 'Baking Competition',
    description: 'Show off your baking skills in a friendly competition.',
    date: new Date('2025-05-25'),
    organizer: 'Baking Club',
  },
  {
    title: 'Local Artisans Market',
    description: 'A market featuring local artisans and their crafts.',
    date: new Date('2025-06-10'),
    organizer: 'Artisan Collective',
  },
  {
    title: 'Family Fun Day',
    description: 'A day of activities and fun for the whole family.',
    date: new Date('2025-06-20'),
    organizer: 'Family Center',
  },
  {
    title: 'Fitness Challenge',
    description: 'Join our fitness challenge and improve your health.',
    date: new Date('2025-07-01'),
    organizer: 'Fitness Group',
  },
  {
    title: 'Open Mic Night',
    description: 'Show off your talents at our open mic night.',
    date: new Date('2025-07-15'),
    organizer: 'Local Cafe',
  },
  {
    title: 'History Lecture Series',
    description: 'Lectures on various historical topics by experts.',
    date: new Date('2025-08-05'),
    organizer: 'Historical Society',
  },
];

const seedDB = async () => {
  try {
    for (const eventData of seedEvents) {
      const event = new Event(eventData);  // Создаем новый объект события
      await event.save();  // Сохраняем событие в базе данных
      console.log(`Event "${event.title}" added successfully`);
    }
    console.log('All events seeded successfully');
  } catch (error) {
    console.error('Error seeding events:', error);
  } finally {
    // Закрытие подключения к базе данных
    mongoose.connection.close();
  }
};
// Выполнение сид-скрипта
seedDB();
