var http = require('http');
var https = require('https');


function printMessage(subreddit, list) {
  console.log(subreddit + ' - ' + list.data.title);
}

function onFailure(error) {
  console.log(error.message);
}


/**
 * @desc make a GET call to the reddit api and
 * pass result of each post to printMessage
 * for output
 */
function get(subreddit) {
  var request = https.get('https://www.reddit.com/r/' + subreddit + '.json', (response) => {
    var body = '';

    response.on('data', (chunk) => {
      body += chunk;
    });

    response.on('end', () => {
      if(response.statusCode === 200) {
        try {
          var posts = JSON.parse(body);
          posts.data.children.forEach(item => {
            printMessage(subreddit, item);
          });
        } catch (error) {
          onFailure(error);
        }
      } else {
        onFailure({message: 'There was an error getting the subreddit for: ' + subreddit + '. (' + http.STATUS_CODES[response.statusCode] + ')'});
      }
    });

  });

  request.on('error', onFailure);
}

module.exports.get = get;

