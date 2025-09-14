// Example MongoDB connection using Mongoose
require('dotenv').config();
const mongoose = require('mongoose');

// Connection URI from environment variables
const uri = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
  
  // Example schema and model
  const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  const Student = mongoose.model('Student', studentSchema);
  
  // Example usage
  const exampleStudent = new Student({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });
  
  exampleStudent.save()
    .then(student => {
      console.log('Student saved:', student);
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error saving student:', err);
      mongoose.connection.close();
    });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});