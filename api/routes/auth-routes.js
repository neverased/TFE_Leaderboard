const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://dev.wojciechbajer.com";
const express = require('express')

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    return res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail  
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(CLIENT_HOME_PAGE_URL,);
  });

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

module.exports = router;
