var http = require('http');



function printMessage(subreddit, list) {
  console.log(subreddit + ' - ' + list.data.title);
}

function onFailure(error) {
  console.log(error.message);
}


/**
 * @desc make a GET call to the reddit api and append
 * the results to a string
 */
function get(subreddit) {
  var request = http.get('http://www.reddit.com/r/' + subreddit + '.json', function (response) {
    var body = '';
    
    response.on('data', function (chunk) {
      body += chunk;
    });

    response.on('end', function () {
      if(response.statusCode === 200) {
        try {
          var posts = JSON.parse(body);
          posts.data.children.forEach(function (item) {
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