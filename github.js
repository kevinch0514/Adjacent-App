// GITHUB COMMIT API

// In your project, first run: npm install @octokit/rest
// Then run:
//   node github.js jfarmer
//   node github.js Hailnoe
let process = require('process');
let { Octokit } = require("@octokit/rest");

function main(username) {
  // You might need to pass additional options to Octokit here, depending on the
  // sorts of requests you're trying to make, e.g., authentication information.
  let octokit = new Octokit({});

  octokit.repos.listForUser({ username: username }).then(function(response) {
    let data = response.data;

    for (let item of data) {
      console.log(`Repo: ${item.name}`);

      octokit.repos.listCommits({
        owner: username,
        repo: item.name,
      }).then(function(response) {
        console.log(response.data[0].commit.author);
      });

    }
  });
}

let username = process.argv[2];

if (username === undefined) {
  console.log('Please specify username');
  process.exit(1);
}

main(username);
