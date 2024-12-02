const express = require('express');
const Habit = require('../models/Habit');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a habit
router.post('/', authMiddleware, async (req, res) => {
    const { name, goal } = req.body;
    try {
        const habit = new Habit({ user: req.user.id, name, goal });
        await habit.save();
        res.status(201).json(habit);
    } catch (err) {
        res.status(500).json({ error: 'Error creating habit.' });
    }
});

// Get user's habits
router.get('/', authMiddleware, async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id });
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching habits.' });
    }
});

// Update habit progress
router.put('/:id', authMiddleware, async (req, res) => {
    const { progress } = req.body;
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, { $inc: { progress } }, { new: true });
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).json({ error: 'Error updating progress.' });
    }
});

module.exports = router;
