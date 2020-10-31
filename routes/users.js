var express = require('express');
var router = express.Router();

/**
 * @swagger
 * '/user':
 *  get:
 *    tags:
 *      - Users
 *    description: Fetch all users
 *    responses:
 *      '200':
 *        description: All users
 */
router.get('/', function(req, res, next) {
  console.log("All Users");
  res.send('respond with a resource');
});

/**
 * @swagger
 * '/user/addUser':
 *  post:
 *    description: Add a user
 *    tags:
 *      - Users
 *    responses:
 *      '200':
 *        description: user added
 */
router.post('/addUser', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
