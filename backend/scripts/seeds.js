//TODO: seeds script should come here, so we'll be able to put some data in our local env
// seeds.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Item = require('../models/Item');
const Comment = require('../models/Comment');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Seed the database
    seedDatabase();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Item.deleteMany();
    await Comment.deleteMany();

    //
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({ name: `User ${i}`, email: `user${i}@email.com` });
    }
    await User.insertMany(users);

    // Generate and insert 100 products
    const items = [];
    for (let i = 1; i <= 100; i++) {
      items.push({ name: `Item ${i}`, price: Math.floor(Math.random() * 100) });
    }
    await Item.insertMany(items);

    // Generate and insert 100 comments
    const comments = [];
    for (let i = 1; i <= 100; i++) {
      comments.push({
        user_id: getRandomId(users),
        item_id: getRandomId(items),
        comment: `Comment ${i}`
      });
    }
    await Comment.insertMany(comments);

    console.log('Database seeded successfully');
    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Function to get a random ID from an array of objects
function getRandomId(arr) {
  return arr[Math.floor(Math.random() * arr.length)]._id;
}
