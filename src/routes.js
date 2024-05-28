const fetchUserData = require("./controller/fetchUserData.controller.js");
const fetchUserFriendData = require("./controller/fetchUserFriendData.controller.js");
const fetchUserFriendOfFriendData = require("./controller/fetchUserFriendOfFriendData.controller.js");

/**
 * Handle all routes
 * @param router
 */
const routes = (router) => {
    // 1st API Endpoint (To fetch users data)
    router.get("/api/user", fetchUserData);

    // 2nd API Endpoint (To fetch user's friends data)
    router.get("/api/user-friend", fetchUserFriendData);

    // 3rd API Endpoint (To fetch user's friends of friends data)
    router.get("/api/user-friend-of-friend", fetchUserFriendOfFriendData);
};

module.exports = routes;
