const {User} = require('../models');

const userController = {

    getAllUsers(req, res) {
    User.find({})
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    getUserById({ params }, res) {
        User.findOne({_id: params.id})
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

    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user with this id!"})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findByIdAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend: (req, res) => {
    User.find( {
        _id: req.params.userId
    }
    )
    .then(user => {
        User.findByIdAndUpdate(user._id, {$push: { friends: req.params.friendId}}, { new: true, runValidators: true })
        .then(res.json(user))
    })
    .catch(err => res.status(400).json(err));
},

deleteFriend: (req, res) => {
    User.find( {
        _id: req.params.userId
    }
    )
    .then(user => {
        User.findByIdAndDelete(user._id, {$shift: { friends: req.params.friendId}})
        .then(res.json(dbUserData))
    })
    .catch(err => res.status(400).json(err));
}

}

module.exports = userController;