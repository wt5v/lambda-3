'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  //const data = JSON.parse(event.body);
  const data = "Hello World!"
  console.log(data);
  
  if (data.text && typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Body did not contain a text property'));
    return;
  }
  
  const params = {
    TableName: 'BlogTable',
    Item: {
      article_id: uuid.v1(),
      text: data.text
    },
  };
 
  const putCallback = (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Could not save record.'));
      return;
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  }
  
  dynamo.put(params, putCallback);
};