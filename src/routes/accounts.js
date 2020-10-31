const express = require('express');
const {v4: uuidv4} = require('uuid');
const {
  saveCallback,
} = require('../database/mongoService');
const AccountModel = require('../models/account');
const router = express.Router();

/**
 * @swagger
 * '/accounts':
 *  get:
 *    tags:
 *      - Accounts
 *    description: Fetch all users
 *    parameters:
 *      - in: path
 *        name: accountId
 *        schema:
 *          type: integer
 *          minimum: 0
 *        required: true
 *        description: The accountId
 *    responses:
 *      '200':
 *        description: All users
 */
router.get('', async function(req, res, next) {
  await AccountModel.find((err, accounts) => {
    res.send(accounts);
  });
});

/**
 * @swagger
 * '/accounts/{accountId}':
 *  get:
 *    tags:
 *      - Accounts
 *    description: Fetch all users
 *    parameters:
 *      - in: path
 *        name: accountId
 *        schema:
 *          type: integer
 *          minimum: 0
 *        required: true
 *        description: The accountId
 *    responses:
 *      '200':
 *        description: All users
 */
router.get('/:accountId', async function(req, res, next) {
  await AccountModel.findOne({
    accountId: req.params.accountId,
  }, (err, account) => {
    if (account) {
      res.send(account);
    } else {
      res.send({
        'error': 'AccountId not found',
      });
    }
  });
});

/**
 * @swagger
 * '/accounts/create':
 *  post:
 *    description: Create an Account
 *    tags:
 *      - Accounts
 *    responses:
 *      '200':
 *        description: Account successfully created
 */
router.post('/create', function(req, res, next) {
  const newAccount = AccountModel({
    ...req.body,
    accountId: uuidv4(),
  });
  newAccount.save((err, dbRes) => saveCallback(err, newAccount, res));
});

module.exports = router;
