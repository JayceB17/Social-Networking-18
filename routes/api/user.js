const route = require('express').Router();

const router = require('.');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/User');

route.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

router
    .route("/:userId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = ("route;/friends/:friendId")