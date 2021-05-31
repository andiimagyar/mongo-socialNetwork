const router = require('express').Router();
const { 
    addThought,
    getAllThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction

} = require("../../controllers/thought-controller");

router
.route('/')
.get(getAllThought)
.post(addThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById);

router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction); 

module.exports = router;