const { User, Thought } = require('../models')


module.exports = {

    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find({}).populate('reactions');
            res.json(thought);
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
            const thoughtdata = await Thought.create(body);

            const user = await User.findOneAndUpdate({
                _id: body.userId
            }, { $push: { thoughts: thoughtdata._id } }, {
                new: true
            })
            res.json(thoughtdata);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            console.log(thought)


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
            const thought = await Thought.findOneAndDelete({ _id: params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};