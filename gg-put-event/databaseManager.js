'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.initializateDynamoClient = newDynamo => {
	dynamo = newDynamo;
};

module.exports.saveItem = (stage, item) => {

	const TABLE_NAME = stage === 'dev' ? process.env.TABLE_NAME_DEV : process.env.TABLE_NAME_PROD;

	const params = {
		TableName: TABLE_NAME,
		Item: item
	};

	return dynamo
		.put(params)
		.promise()
		.then(() => {
			return item.id;
		});
};

/*module.exports.getItem = itemId => {
	const params = {
		Key: {
			itemId: itemId
		},
		TableName: TABLE_NAME
	};

	return dynamo
		.get(params)
		.promise()
		.then(result => {
			return result.Item;
		});
};

module.exports.deleteItem = itemId => {
	const params = {
		Key: {
			itemId: itemId
		},
		TableName: TABLE_NAME
	};

	return dynamo.delete(params).promise();
};

module.exports.updateItem = (itemId, paramsName, paramsValue) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			itemId
		},
		ConditionExpression: 'attribute_exists(itemId)',
		UpdateExpression: 'set ' + paramsName + ' = :v',
		ExpressionAttributeValues: {
			':v': paramsValue
		},
		ReturnValues: 'ALL_NEW'
	};

	return dynamo
		.update(params)
		.promise()
		.then(response => {
			return response.Attributes;
		});
};*/
