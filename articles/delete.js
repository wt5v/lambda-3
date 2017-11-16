'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const deleteArticle = require('./model.js').deleteArticle();
const DynamoDAO = require('../util/dynamo-dao.js');
const ArticleController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
  const article = deleteArticle(event, callback);
  const dynamoDAO = new DynamoDAO(dynamo, 'BlogTable');
  const controller = new ArticleController(dynamoDAO);
  controller.deleteArticle(article, callback);  
/*  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Article deleted.'
    }),
  };
  callback(null, response); */
};