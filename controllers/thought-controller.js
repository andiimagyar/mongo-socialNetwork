const { Thought } = require('../models');

const thoughtController = {

    getAllThought: (req, res) => {
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


}

module.exports = thoughtController;