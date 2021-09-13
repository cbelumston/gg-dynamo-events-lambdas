
const databaseManager = require('./databaseManager')
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {

	console.log(`EVENT => ${JSON.stringify(event)}`);

    let stage = event.requestContext.stage;
    console.log(`stage => ${stage}`);
    
	return saveItem(stage, event);
};


function saveItem(stage, event) {
	const item = JSON.parse(event.body);
	item.id = uuidv4();

	return databaseManager.saveItem(stage, item).then(response => {
		console.log('response => ', response);
		return sendResponse(200, item.id);
	});
}

function sendResponse(statusCode, message) {
	const response = {
		statusCode: statusCode,
		 headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // replace with hostname of frontend (CloudFront)
        },
		body: JSON.stringify(message)
	};
	return response
}