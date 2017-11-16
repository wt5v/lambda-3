'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const updateArticle = require('./model.js').updateArticle;
const DynamoDAO = require('../util/dynamo-dao.js');
const ArticleController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
  const article = updateArticle(event, callback);
  const dynamoDAO = new DynamoDAO(dynamo, 'BlogTable');
  const controller = new ArticleController(dynamoDAO);
  controller.updateArticle(article, callback);  
/*  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Article updated.'
    }),
  };
  callback(null, response); */
};