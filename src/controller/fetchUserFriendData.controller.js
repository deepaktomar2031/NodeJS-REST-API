const message = require("../utils/locale.js");
const statusCode = require("../utils/status-code.js");
const getConnection = require("../config/db.config.js");
const LogErrorMessage = require("../utils/error-handler.js");

const fetchUserFriendData = async (req, res) => {
    try {
        const queryString =
            "SELECT u.id, uf.user_id, u.first_name, (select first_name from users as u1 where u1.id = uf.user_friend_id) as friend FROM lbta_mysql.users as u inner join  user_friends as uf on u.id=uf.user_id";
        await getConnection().query(queryString, (err, rows, field) => {
            if (err) {
                console.log(LogErrorMessage(err));
                return res.status(statusCode.internal_server_error).send({ successful: false, Message: message.Something_went_wrong });
            }
            if (rows.length > 0)
                return res.status(statusCode.successful_request).send({ successful: true, Message: message.Fetched_successfully, rows });
            return res.status(statusCode.successful_request).send({ successful: true, Message: message.No_User_Found });
        });
    } catch (error) {
        console.log(LogErrorMessage(error));
        return res.status(statusCode.internal_server_error).send({ successful: false, Message: message.Something_went_wrong });
    }
};

module.exports = fetchUserFriendData;
