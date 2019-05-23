let sql = require("../../config/db.js");

exports.getMatchsList = (id, result) => {
  sql.query(
    "SELECT user_account.*, geolocalisation.latitude, geolocalisation.longitude FROM user_account LEFT JOIN geolocalisation ON user_account.id = geolocalisation.user_account_id WHERE user_account.id NOT LIKE ?",
    [id],
    (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    }
  );
};

exports.getLikesList = (id, result) => {
  sql.query(
    "SELECT * FROM likes WHERE user_account_id = ?",
    [id],
    (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    }
  );
};

exports.addLikedUser = (data, result) => {
  sql.query("INSERT INTO likes SET ?", [data], (err, res) => {
    if (err) result(err, null);
    else {
      result(null, res.insertId);
    }
  });
};

exports.addPopularity = (data, result) => {
  sql.query(
    "UPDATE user_account SET popularity = popularity + 1 WHERE id = ?",
    [data.liked_id],
    (err, res) => {
      if (err) result(err, null);
      else {
        result(null, res);
      }
    }
  );
};

exports.isUserMatched = (data, result) => {
  sql.query(
    "SELECT * FROM likes WHERE user_account_id = ? AND liked_id = ?",
    [data.liked_id, data.user_account_id],
    (err, res) => {
      if (err) result(err, null);
      if (!res || res.length === 0) {
        result(null, 0);
      } else result(null, 1);
    }
  );
};

exports.isConversationExist = (data, result) => {
  sql.query(
    "SELECT * FROM conversations WHERE (user_account_id1 = ? AND user_account_id2 = ?) OR (user_account_id1 = ? AND user_account_id2 = ?)",
    [data.liked_id, data.user_account_id, data.user_account_id, data.liked_id],
    (err, res) => {
      if (err) result(err, null);
      if (!res || res.length === 0) {
        result(null, 0);
      } else result(null, 1);
    }
  );
};

exports.createConversation = data => {
  sql.query(
    "INSERT INTO conversations (user_account_id1, user_account_id2) VALUES (?, ?)",
    [data.user_account_id, data.liked_id],
    (err, res) => {
      if (err) console.log(err);
    }
  );
};

exports.deleteLikeUser = (data, result) => {
  sql.query(
    "DELETE FROM likes WHERE user_account_id = ? AND liked_id = ?",
    [data.user_account_id, data.liked_id],
    (err, res) => {
      if (err) result(err, null);
      else {
        result(null, res);
      }
    }
  );
};

exports.deletePopularity = (data, result) => {
  sql.query(
    "UPDATE user_account SET popularity = popularity - 1 WHERE id = ?",
    [data.liked_id],
    (err, res) => {
      if (err) result(err, null);
      else {
        result(null, res);
      }
    }
  );
};

exports.getMatchInfo = (user_account_id, result) => {
  sql.query(
    "SELECT * from user_account WHERE id = ?",
    [user_account_id],
    (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    }
  );
};
