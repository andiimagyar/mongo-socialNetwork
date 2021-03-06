const { Thought, User } = require('../models');

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    addThought({ params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId },
                { $push: { thoughts: _id } },
                { new: true, runValidators: true }
            )
        })
        .then(dbUserData => {
            
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    updateThoughtById({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user with this id!"})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThoughtById({ params }, res) {
        Thought.findByIdAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id! '});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    deleteReaction( {params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId })
        .then(deletedReaction => {
            if (!deletedReaction) {
                return res.status(404).json({ message: "No reaction found with this id!"})
            }
            return User.findOneAndUpdate(
                {_id: params.pizzaId },
                { $pull: {thoughts: params.thoughtId } },
                { new: true }
            );
            })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    }

}

module.exports = thoughtController;