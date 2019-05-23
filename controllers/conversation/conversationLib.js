let sql = require("../../config/db.js");

exports.addMessage = (req, res) => {
  if (
    req.body &&
    req.body.conversation_id &&
    req.body.user_account_id &&
    req.body.message_text
  ) {
    let user = {
      conversation_id: req.body.conversation_id,
      user_account_id: req.body.user_account_id,
      message_text: req.body.message_text
    };
    sql.query("INSERT INTO messages SET ?", user, (err, rows) => {
      if (err) res.status(500).json("Erreur Interne");
      else res.status(200).json("Message enregistré !");
    });
  } else res.status(400).json("Erreur message");
};

exports.getConversations = (req, res) => {
  if (req.params && req.params.id) {
    let query = `SELECT c.id, c.user_account_id1, c.user_account_id2 ,a.profil_image AS avatar1, a.first_name AS first_name1, b.profil_image AS avatar2, b.first_name AS first_name2 FROM conversations c
    INNER JOIN user_account a ON c.user_account_id1 = a.id
    INNER JOIN user_account b ON c.user_account_id2 = b.id
    WHERE user_account_id1 = ? OR user_account_id2 = ?
    `;

    sql.query(query, [req.params.id, req.params.id], (err, rows) => {
      if (err) res.status(500).json({ "Erreur interne": err });
      else res.status(200).json(rows);
    });
  }
};

exports.getLastMessage = (req, res) => {
  if (req.params && req.params.id) {
    let query = `SELECT * FROM messages WHERE conversation_id = ? ORDER BY id DESC LIMIT 1`;

    sql.query(query, [req.params.id], (err, rows) => {
      if (err) console.log(err);
      else res.status(200).json(rows);
    });
  }
};

exports.getMessages = (req, res) => {
  if (req.params && req.params.id) {
    sql.query(
      "SELECT messages.*, user_account.first_name FROM messages INNER JOIN user_account ON messages.user_account_id = user_account.id WHERE conversation_id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) res.status(500).json("Erreur Interne");
        else {
          let data;
          if (!rows || rows.length === 0) {
            data = {
              conversation_id: req.params.id,
              messages: []
            };
          } else {
            data = {
              conversation_id: rows[0].conversation_id,
              messages: rows.map(row => {
                return {
                  message_text: row.message_text,
                  user_account_id: row.user_account_id,
                  first_name: row.first_name,
                  timestamp: row.timestamp
                };
              })
            };
          }
          res.status(200).json(data);
        }
      }
    );
  } else res.status(400).json("Erreur id conv");
};
