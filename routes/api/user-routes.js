const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser, 
    updateUser,
    deleteUser
} = require ('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    //req.params.userId AND friendId
    .delete(deleteFriend)

module.exports = router;