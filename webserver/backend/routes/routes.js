const express = require('express');
const router = express.Router();
const async = require('async');
const path = require('path');
const passport = require('passport');
const Simulation = require('../models/Simulation');
const Journey = require('../models/Journey');
const User = require('../models/User');
const config = require('../config');
const auth = require('../authenticate');


const server = require('../../server.js');

router.route('/simulations')
  .get(auth, (req, res) => {
    const userId = res._headers.token._id;
    User.findOne({
        _id: userId
      })
      .then((result) => {
        res.json({
          username: result.username,
          simulations: result.simulations
        });
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post(auth, (req, res) => {
    const userID = res._headers.token._id;
    const simulationID = req.body.simulationID;
    const updateInfo = {
      $push: {
        simulations: simulationID
      }
    };
    const options = {
      upsert: true,
      returnNewDocument: true
    };
    User.findOneAndUpdate({
        _id: userID
      }, updateInfo, options)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  })

router.get('/simulations/:simulationID', auth, (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

router.route('/simulations/active')
  .post((req, res) => {
    passport.authenticate('local', (err, user, info) => {

      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // Credentials are valid
      if (user) {
        res.status(200);
        res.json({
          "active_simulation": user.active_simulation
        });
      } else {
        res.status(404).json(info);
        return;
      }
    })(req, res);
  });

router.route('/simulations/activate')
  .post(auth, (req, res) => {
    const userID = res._headers.token._id;
    const simulationID = req.body.simulationID;
    const updateInfo = {
      active_simulation: simulationID
    };
    const options = {
      upsert: true,
      returnNewDocument: true
    };
    User.findOneAndUpdate({
        _id: userID
      }, updateInfo, options)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  })

router.route('/simulations/:simulationID/journeys')
  .get((req, res) => {
    Simulation.findOne({
        _id: req.params.simulationID
      })
      .then((result) => {
        res.json(result.journeys);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    const id = req.params.simulationID;
    const journeys = req.body;
    savedJourneys = [];
    server._handleRequestEventUpdate({
      content: {
        simulationID: id,
        journeys: journeys
      }
    }, (error, simulation) => {
      if (error || !simulation) {
        res.send(error);
      } else {
        res.send(simulation);
      }
    })
  });

router.route('/register')
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({
      username: username,
      admin: false,
      created_at: Date.now(),
      simulations: []
    });
    user.setPassword(password);


    user.save((err) => {
      const token = user.generateJwt();
      res.status(200);
      res.setHeader('token', token);
      res.json({
        "token": token,
        "userID": user._id,
        "username": user.username
      });
    });
  });

router.route('/login')
  .post((req, res) => {
    passport.authenticate('local', (err, user, info) => {

      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // If a user is found
      if (user) {
        const token = user.generateJwt();
        res.status(200);
        res.setHeader('token', token);
        res.json({
          "token": token,
          "userID": user._id,
          "username": user.username
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  });


router.get('*', auth, (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

module.exports = router;
