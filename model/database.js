const mongoose = require('mongoose');
mongoose.connect('mongodb://ab:ab1234@ds060649.mlab.com:60649/coderoomerino');
const bcrypt = require('bcrypt');



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('bruh, i\'m mongo\'d');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String, required: true},
    password: {type:String, required: true},
    salt: String,
    level: Number,
    totalTime: Number,
    createdAt: Date, 
});


const User = mongoose.model('User', userSchema);

module.exports = User;