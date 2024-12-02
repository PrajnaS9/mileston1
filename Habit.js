const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    goal: { type: String, required: true },
    progress: { type: Number, default: 0 },
    history: [{ date: Date, status: String }],
});

module.exports = mongoose.model('Habit', HabitSchema);
