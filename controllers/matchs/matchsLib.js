const Matchs = require("./matchsModels");

exports.loadMatchsList = (req, res) => {
  if (req.body && req.body.id) {
    Matchs.getMatchsList(req.body.id, (err, matchs) => {
      if (err) {
        console.log(err);
        res.status(500).json("Erreur Interne");
      } else res.json(matchs);
    });
  }
};

exports.getLikes = (req, res) => {
  if (req.body && req.body.id) {
    Matchs.getLikesList(req.body.id, (err, likes) => {
      if (err) console.log(err);
      else res.json(likes);
    });
  }
};

exports.addLike = (req, res) => {
  if (req.body) {
    Matchs.addLikedUser(req.body, (err, result) => {
      if (err) console.log(err);
      else {
        Matchs.isUserMatched(req.body, (err2, res2) => {
          if (err2) console.log(err2);
          if (res2 === 1) {
            Matchs.isConversationExist(req.body, (err3, res3) => {
              if (err3) console.log(err3);
              if (res3 === 0) Matchs.createConversation(req.body);
            });
          }
        });
        Matchs.addPopularity(req.body, (err4, res4) => {
          if (err4) console.log(err4);
          res.json(result);
        });
      }
    });
  }
};

exports.deleteLike = (req, res) => {
  if (req.body) {
    Matchs.deleteLikeUser(req.body, (err, result) => {
      if (err) console.log(err);
      else {
        Matchs.deletePopularity(req.body, (err2, res2) => {
          if (err2) console.log(err2);
          res.json(result);
        });
      }
    });
  }
};

exports.loadMatchInfo = (req, res) => {
  Matchs.getMatchInfo(req.params.id, (err, match) => {
    if (err) res.status(500).json("Erreur interne");
    else res.json(match);
  });
};
