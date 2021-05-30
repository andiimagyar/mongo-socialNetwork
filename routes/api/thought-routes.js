const router = require('express').Router();
const { 
    addThought,
    getAllThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction

} = require("../../controllers/thought-controllers");

router
.route('/thoughts')
.get(getAllThought)
.post(addThought);

router
.route('/thoughts/:id')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById);

router
.route('thoughts/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction); 

module.exports = router