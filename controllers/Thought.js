const { User, Thought } = require('../models')


module.exports = {

    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find({}).populate('reactions');
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async thought({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: params.id }).populate('reactions')
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.id });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};