/**
 * CLI tool for fetching titles in a
 * list of given subreddits
 */
const subredditService = require('./subreddit');

const subreddits = process.argv.slice(2);

subreddits.forEach(subreddit => {
  subredditService.get(subreddit);
});

