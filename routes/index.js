var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

/* The next four functions fetch data, and pass it on as part of req obj  */
//RECUP LES DATAS !!!!!
function getAnnouncements(req, res, next) {
  req.announce = {};
  dataModel.readTable("test50", function(data) {
    req.announce = data;
    next();
  });
}

function renderPage(req, res) {
  res.render('index', {
    pagetitle: "Test Structures",
    announcements: req.announce,
    //items: req.items,
    //events: req.events,
   // motd: req.motd
  });
}

router.get('/',
  getAnnouncements, 
  renderPage
);

module.exports = router;