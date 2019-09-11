const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');

const Activities = require('./activity-model');

router.get('/', async (req, res) => {
    try {
        const activities = await Activities.find();
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ message: 'Could not get activities' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const activity = await Activities.findById(id);
        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({ message: 'Could not get that particular activity' });
    }
});

router.post('/', restricted, async (req, res) => {
    const activityData = req.body;

    try {
        const activity = await Activities.add(activityData);
        res.status(201).json(activity);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create a new activity' });
    }
});

router.put('/:id', restricted, async (req, res) => {
    try {
        const activity = await Activities.update(req.params.id, req.body);
        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(404).json({ message: 'The activity could not be found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating the activity'})
    }
});

router.delete('/:id', restricted, async (req, res) => {
    try {
        const count = await Activities.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'The activity has been deleted' });
        } else {
            res.status(404).json({ message: 'The activity could not be deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting the activity' });
    }
});

module.exports = router;