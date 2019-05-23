const account = require("./account/accountLib.js");
const match = require("./matchs/matchsLib.js");
const profil = require("./profil/profilLib.js");
const conv = require("./conversation/conversationLib");
const multer = require("multer");
let express = require("express");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/public/images/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileFilter
});

exports.router = (function() {
  let app = express.Router();

  /********* AUTHENTIFICATION **********/
  app.post("/users/register", account.signup);
  app.post("/users/login", account.signin);
  app.post("/users/password-reset", account.passwordResetMail);
  app.post(
    "/users/password-validation/:token",
    account.passwordResetValidation
  );
  app.get("/users/validation/:token", account.accountValidation);

  /***********s MATCHS & PROFIL *********/
  app.post("/users/matchslist", match.loadMatchsList);
  app.post("/users/getlikes", match.getLikes);
  app.post("/users/addlike", match.addLike);
  app.post("/users/deletelike", match.deleteLike);
  app.get("/users/matchinfo/:id", match.loadMatchInfo);
  app.put("/users/profil/upload-photo/:id", upload.any(), profil.uploadPhoto);
  app.post("/users/profil/info", profil.userInfo);
  app.get("/users/profil/photo/:id", profil.getPhoto);
  app.post("/users/profil/update", profil.updateUser);
  app.post("/users/profil/update_password", profil.updatePassword);
  app.put("/users/profil/update-profil/:id", profil.updateProfilUser);

  /******* GRADE & BLOCK USER *******/
  app.post("/users/profil/blocked", profil.blockUser);
  app.post("/users/profil/graded", profil.gradeUser);
  app.get("/users/profil/get-blocked/:id", profil.getBlockedUser);
  app.get("/users/profil/get-graded/:id", profil.getGradedUser);
  app.get("/users/profil/good-grade/:id", profil.getGoodGrade);

  /********** CONVERSATIONS***********/
  app.get("/users/conv/:id", conv.getConversations);
  app.get("/users/conv/lastmessage/:id", conv.getLastMessage);
  app.get("/users/conv/room/:id", conv.getMessages);
  app.post("/users/conv/addmessage", conv.addMessage);

  /************* TAGS *****************/
  app.post("/users/profil/add-tags", profil.addTags);
  app.delete("/users/profil/delete-tags/:id", profil.deleteTags);
  app.get("/users/profil/get-tags/:id", profil.getTags);

  return app;
})();

//module.exports = function(app) {
/********* AUTHENTIFICATION **********/
/*app.post("/users/register", account.signup);
  app.post("/users/login", account.signin);
  app.post("/users/password-reset", account.passwordResetMail);
  app.post(
    "/users/password-validation/:token",
    account.passwordResetValidation
  );
  app.get("/users/validation/:token", account.accountValidation);

  /***********s MATCHS & PROFIL *********/
/* app.post("/users/matchslist", match.loadMatchsList);
  app.get("/users/matchinfo/:id", match.loadMatchInfo);
  app.put("/users/profil/upload-photo/:id", upload.any(), profil.uploadPhoto);
  app.post("/users/profil/info", profil.userInfo);
  app.get("/users/profil/photo/:id", profil.getPhoto);
  app.post("/users/profil/update", profil.updateUser);
  app.put("/users/profil/update-profil/:id", profil.updateProfilUser);

  /******* GRADE & BLOCK USER *******/
/* app.post("/users/profil/blocked", profil.blockUser);
  app.post("/users/profil/graded", profil.gradeUser);
  app.get("/users/profil/get-blocked/:id", profil.getBlockedUser);
  app.get("/users/profil/get-graded/:id", profil.getGradedUser);
  app.get("/users/profil/good-grade/:id", profil.getGoodGrade);

  /********** CONVERSATIONS***********/
/*  app.get("/users/conv/:id", conv.getConversations);
  app.get("/users/conv/room/:id", conv.getMessages);
  app.post("/users/conv/create-conv", conv.createConversation);
  app.post("/users/conv/addmessage", conv.addMessage);

  /************* TAGS *****************/
/*  app.post("/users/profil/add-tags", profil.addTags);
  app.delete("/users/profil/delete-tags/:id", profil.deleteTags);
  app.get("/users/profil/get-tags/:id", profil.getTags);

  /********* FAKE USER **************/
// app.get("/users/fake", profil.fakeUser);
/* app.get("/users/faces/female", profil.facesUserFemale);
  app.get("/users/faces/male", profil.facesUserMale);
};
*/
