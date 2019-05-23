let mysql = require("mysql");
let bcrypt = require("bcrypt");
let fakeUsers = require("./fakeUsers");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dbroot"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS db_matcha", (err, res) => {
    if (err) throw err;
    console.log("Database created");
  });

  con.query("USE db_matcha", (err, res) => {
    if (err) throw err;
    console.log("Database db_matcha used");
  });

  // DROP TABLES
  let sql = "DROP TABLE IF EXISTS `user_account`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table user_account");
  });

  sql = "DROP TABLE IF EXISTS `geolocalisation`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table geolocalisation");
  });

  sql = "DROP TABLE IF EXISTS `user_photo`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table user_photo");
  });

  sql = "DROP TABLE IF EXISTS `likes`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table likes");
  });

  sql = "DROP TABLE IF EXISTS `block_user`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table block_user");
  });

  sql = "DROP TABLE IF EXISTS `fake_user`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table fake_user");
  });

  sql = "DROP TABLE IF EXISTS `gender`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table gender");
  });

  sql = "DROP TABLE IF EXISTS `orientation`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table orientation");
  });

  sql = "DROP TABLE IF EXISTS `conversations`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table conversations");
  });

  sql = "DROP TABLE IF EXISTS `messages`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table messages");
  });

  sql = "DROP TABLE IF EXISTS `notifications`";
  con.query(sql, function(err, result) {
    if (err) console.log(err);
    console.log("Delete table notifications");
  });

  // User Accounts

  sql = `CREATE TABLE IF NOT EXISTS user_account
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        first_name          VARCHAR(50) NOT NULL ,
        last_name           VARCHAR(50) NOT NULL ,
        email               VARCHAR(50) NOT NULL , 
        nickname            VARCHAR(50) NOT NULL ,
        password            VARCHAR(255) NOT NULL , 
        age                 INT(2) NOT NULL DEFAULT '18' , 
        details             VARCHAR(255) DEFAULT NULL , 
        confirmation_code   VARCHAR(255) DEFAULT NULL , 
        isEmailVerified     INT(1)  DEFAULT '0' , 
        gender_id           INT(2)  DEFAULT '1' , 
        orientation_id      INT(2)  DEFAULT '1' ,
        tags                TEXT  DEFAULT NULL , 
        popularity          INT DEFAULT 500, 
        profil_image        VARCHAR(255)  DEFAULT NULL ,
        geo_id              INT DEFAULT NULL ,
        online              TIMESTAMP
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table user_account created");
  });

  sql = `INSERT INTO user_account SET ?`;
  let data = {
    first_name: "admin_first_name",
    last_name: "admin_last_name",
    email: "admin@gmail.com",
    nickname: "admin_nickname",
    password: bcrypt.hashSync("admin", 10),
    isEmailVerified: 1,
    tags: "#poney,#anime,#mcdo,#liguedeslegends",
    popularity: 500,
    profil_image: "/images/profil1.jpeg",
    geo_id: 1,
    details:
      "Hey mademoiselle vous êtes charmante, ça vous tente un thé a la menthe ?"
  };

  con.query(sql, [data], (err, result) => {
    if (err) console.log(err);
    console.log("Table user_account updated");
  });

  // Geolocalisation

  sql = `CREATE TABLE IF NOT EXISTS geolocalisation
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        latitude            VARCHAR(50) NOT NULL ,
        longitude           VARCHAR(50) NOT NULL ,
        user_account_id     INT NOT NULL
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table geolocalisation created");
  });

  sql = `INSERT INTO geolocalisation SET ?`;
  let geo = {
    latitude: 48.887398399999995,
    longitude: 2.3134208,
    user_account_id: 1
  };

  con.query(sql, [geo], (err, result) => {
    if (err) console.log(err);
    console.log("Table geolocalisation updated");
    fakeUsers.insertFakeUsers();
  });

  //User_photo

  sql = `CREATE TABLE IF NOT EXISTS user_photo
  (
      id                    INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
      user_account_id       INT NOT NULL ,
      link                  VARCHAR(255) NOT NULL ,
      profil_image          VARCHAR(50)
  )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table user_photo created");
  });

  //Likes

  sql = `CREATE TABLE IF NOT EXISTS likes
  (
      id                    INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
      user_account_id       INT NOT NULL ,
      liked_id              INT NOT NULL ,
      timestamp             TIMESTAMP
  )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table likes created");
  });

  //Block_user

  sql = `CREATE TABLE IF NOT EXISTS block_user
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        user_account_id     INT NOT NULL ,
        blocked_id          INT NOT NULL
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table block_user created");
  });

  //Fake_user

  sql = `CREATE TABLE IF NOT EXISTS fake_user
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        user_account_id     INT NOT NULL ,
        fake_id             INT NOT NULL
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table fake_user created");
  });

  //Gender

  sql = `CREATE TABLE IF NOT EXISTS gender
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        gender_name         VARCHAR(50)
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table gender created");
  });

  sql = `INSERT INTO gender (gender_name) VALUES ?`;
  let values = [["Homme"], ["Femme"]];
  con.query(sql, [values], (err, result) => {
    if (err) console.log(err);
    console.log("Table gender updated");
  });

  //Orientation

  sql = `CREATE TABLE IF NOT EXISTS orientation
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        interested_by    VARCHAR(50)
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table orientation created");
  });

  sql = `INSERT INTO orientation (interested_by) VALUES ?`;
  values = [["Homme"], ["Femme"], ["Les deux"]];
  con.query(sql, [values], (err, result) => {
    if (err) console.log(err);
    console.log("Table orientation updated");
  });

  //Conversations

  sql = `CREATE TABLE IF NOT EXISTS conversations
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        user_account_id1   INT NOT NULL,
        user_account_id2   INT NOT NULL,
        timestamp           TIMESTAMP
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table conversations created");
  });

  sql = `INSERT INTO conversations SET ?`;
  data = {
    user_account_id1: 1,
    user_account_id2: 2
  };
  con.query(sql, [data], (err, result) => {
    if (err) console.log(err);
    console.log("Table conversations updated");
  });

  //Messages

  sql = `CREATE TABLE IF NOT EXISTS messages
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        conversation_id     INT NOT NULL,
        user_account_id    INT NOT NULL,
        message_text        VARCHAR(255),
        timestamp           TIMESTAMP
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table messages created");
  });

  //Notifications

  sql = `CREATE TABLE IF NOT EXISTS notifications
    (
        id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        conversation_id     INT NOT NULL,
        user_account_id    INT NOT NULL,
        content             VARCHAR(255),
        timestamp           TIMESTAMP,
        seen                INT(1) DEFAULT '0'
    )`;

  con.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("Table notifications created");
    con.end();
  });
});
