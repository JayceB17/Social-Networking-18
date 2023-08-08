const router = require('express').Router();

// const router = require('.');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/User');

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

router
    .route("/:userId")

    .delete(deleteFriend);
router.route("/:userId/friend/:friendId").post(addFriend)

module.exports = router