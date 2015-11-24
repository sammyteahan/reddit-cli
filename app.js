/**
 * CLI tool for fetching titles in a
 * list of given subreddits
 */
var subredditService = require('./subreddit');

var subreddits = process.argv.slice(2);

subreddits.forEach(function (subreddit) {
  subredditService.get(subreddit);
});
