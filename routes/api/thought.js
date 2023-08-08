const router = require('express').Router();

const {
  getAllThoughts,
  thought,
  createThought,
  updateThought,
  deleteThought,
//   addReaction,
//   deleteReaction,
} = require('../../controllers/Thought');

router.route('/').get(getAllThoughts).post(createThought);

router
    .route("/:thoughtId")
    .get(thought)
    .put(updateThought)
    .delete(deleteThought);

    // router.route("/:thoughtId/reactions").post(addReaction);

    // router
    //     .route("/:thoughtId/reactions/:reactionId")
    //     .delete(deleteReaction);

module.exports = router;