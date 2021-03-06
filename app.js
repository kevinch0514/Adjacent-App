// Node's standard path module
// See https://nodejs.org/api/path.html
let path = require('path');

// The Express web application framework
// See http://expressjs.com/
let express = require('express');

// Library for nicer logging of HTTP requests
// See https://github.com/expressjs/morgan
let logger = require('morgan');

let { Octokit } = require("@octokit/rest");

let app = express();

// Tell Express to load static files from the public/ directory
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to log HTTP requests in the 'dev' format
// See the Morgan documentation for what that looks like
app.use(logger('dev'));

// A helper we wrote to capitalize strings
let capitalize = require('./lib/capitalize');

// The overall layout remains the same between pages, so we use
// this helper function to wrap our page-specific content in the layout.
function getLayoutHTML(content) {
  // Template strings can span multiple lines, making them
  // well-suited for, well, acting as templates.
  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Adjacent App!</title>

        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/main.css">
        <meta charset='utf-8' />
      <link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.3.2/main.min.css' rel='stylesheet' />
      <script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.3.2/main.min.js'></script>
        <link href="https://fonts.googleapis.com/css2?family=Hind&display=swap" rel="stylesheet">
      </head>
      <body>
        <section id="content">
          ${content}
        </section>
      </body>
    </html>
  `;

  return html;
}

// app.get('/', (request, response) => {
//   let appDescription = `
//     <p>Welcome to the Adjancent App,Where Learning Has No Speed-Limit, the Autobahn of Education Really!</p>
//     <p>First Login with your Adjacent Academy Username and Password </p>
//   `;

//   let content = `
//     <h1>Adjacent App!</h1>
//     ${appDescription}
//     <p>Sign In</p>
//     `
//     /* here we would put the code for the sign in. We need to link the HTML for the
//     sign in box into this spot. Don't forget the javascript as well!!!*/

//     /* then we will need to find a way to link this page to the next required page,
//     the user home page. The path to the succesful logged in user home-page will
//     be ----------   /home ------------ */
//   ;

//   let pageHtml = getLayoutHTML(content);

//   response.send(pageHtml);
// });

app.get('/', (request, response) => { // this page will be the same as Trey's wireframe, there will be links to each page
  let content = `

    <main class="grid" id="content">

      <a href="/presentations"><img src="http://adjacent-app.surge.sh/images/presentations.png" alt="presentation"></a>
			<a href="/projects"><img src="http://adjacent-app.surge.sh/images/projects.png" alt="project"></a>
			<a href="/feedback"><img src="http://adjacent-app.surge.sh/images/feedback.png" alt="feedback"></a>
      <a href="/schedule"><img src="http://adjacent-app.surge.sh/images/schedule.png" alt="schedule"></a>
      <img src="http://adjacent-app.surge.sh/images/main.png" alt="adjacent app">
      <a href="/announcements"><img src="http://adjacent-app.surge.sh/images/announcements.png" alt=announcements></a>
			<a href="/curriculum"><img src="http://adjacent-app.surge.sh/images/curriculum.png"></a>
      <a href="/resources"><img src="http://adjacent-app.surge.sh/images/resources.png" alt="Resources"></a>
      <a href="/repository"><img src="http://adjacent-app.surge.sh/images/repository.png" alt="Repository"></a>
    </main>

  `;

  response.send(getLayoutHTML(content));
});

app.get('/presentations', (request, response) => {
  let content = `
    <h1>Presentations</h1>
    <h2>⚠️This page is under construction⚠️</h2>
    <p>Here are all of the Presentations for _______</p>

    <div id = "presentationList">
    <p> A list of the presentations supplied with data from the API will be in this spot </p>
    </div>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/projects', (request, response) => {
  let content = `
    <h1>Projects</h1>
    <h2>⚠️This page is under construction⚠️</h2>
    <p>Here are all of the projects for _______</p>

    <div id = "projectList">
    <p> We could have links to the google docs for each project, each projects description </p>
    </div>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});


app.get('/feedback', (request, response) => {
  let content = `
    <h1>Feedback</h1>
    <h2>⚠️This page is under construction⚠️</h2>
    <p>Here is all of the feedback for _______</p>

    <div id = "feedbackList">
    <p> We could have links to feedback for the specific user from all intructors, they could be their own pages as well  </p>
    </div>

    <p><a href="/">Back to the homepage</a></p>

  `;

  response.send(getLayoutHTML(content));
});


app.get('/schedule', (request, response) => {
  let content = `
    <h1>Schedule</h1>
    <h2>⚠️This page is under construction⚠️</h2>
    <p>Here is all of the feedback for _______ (There will be a schedule for each week)</p>
    <p> Could also put links to the google calendar</p>

    <div id = "ScheduleList">
    <p> We could put a link to an empty page with the schedule for week x </p>
    <p> We woudld then have links to pages for every week </p>
    </div>
    <button type = "button" id = "openCalendar">October Schedule</button>
    <div id= "calendar"></div>
    <p><a href="/">Back to the homepage</a></p>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2020-10-07',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-01T12:00:00',
            end: '2020-10-01T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-02T12:00:00',
            end: '2020-10-02T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-05T12:00:00',
            end: '2020-10-05T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-06T12:00:00',
            end: '2020-10-06T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-07T12:00:00',
            end: '2020-10-07T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-08T12:00:00',
            end: '2020-10-08T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-09T12:00:00',
            end: '2020-10-09T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-12T12:00:00',
            end: '2020-10-12T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-13T12:00:00',
            end: '2020-10-13T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-14T12:00:00',
            end: '2020-10-14T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-15T12:00:00',
            end: '2020-10-15T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-16T12:00:00',
            end: '2020-10-16T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-19T12:00:00',
            end: '2020-10-19T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-20T12:00:00',
            end: '2020-10-20T12:30:00'
          },

           {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-21T12:00:00',
            end: '2020-10-21T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-22T12:00:00',
            end: '2020-10-22T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-23T12:00:00',
            end: '2020-10-23T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-26T12:00:00',
            end: '2020-10-26T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-27T12:00:00',
            end: '2020-10-27T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-28T12:00:00',
            end: '2020-10-28T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-29T12:00:00',
            end: '2020-10-29T12:30:00'
          },

          {
            groupID: 'Daily Hands In',
            title: 'Adjancent Hands-In',
            start: '2020-10-30T12:00:00',
            end: '2020-10-30T12:30:00'
          },

          {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-01T14:45:00',
            end: '2020-10-01T16:00:00'
          },

          {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-06T14:45:00',
            end: '2020-10-06T16:00:00'
          },

           {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-08T14:45:00',
            end: '2020-10-08T16:00:00'
          },

           {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-13T14:45:00',
            end: '2020-10-13T16:00:00'
          },

            {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-20T14:45:00',
            end: '2020-10-20T16:00:00'
          },

          {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-22T14:45:00',
            end: '2020-10-22T16:00:00'
          },

          {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-27T14:45:00',
            end: '2020-10-27T16:00:00'
          },

          {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-29T14:45:00',
            end: '2020-10-29T16:00:00'
          },

          {
            groupID: 'CIS 101',
            title: 'CIS 101',
            start: '2020-10-15T14:45:00',
            end: '2020-10-15T16:00:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-01T13:30:00',
            end: '2020-10-01T14:30:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-05T13:30:00',
            end: '2020-10-05T14:30:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-08T13:30:00',
            end: '2020-10-08T14:30:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-12T13:30:00',
            end: '2020-10-12T14:30:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-15T13:30:00',
            end: '2020-10-15T14:30:00'
          },

           {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-19T13:30:00',
            end: '2020-10-19T14:30:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-26T13:30:00',
            end: '2020-10-26T14:30:00'
          },

          {
            groupID: 'Help Session',
            title: 'Jesse Help Session',
            start: '2020-10-29T13:30:00',
            end: '2020-10-29T14:30:00'
          },


        ]
      });
      calendar.render();
    });
    </script>

  `;

  response.send(getLayoutHTML(content));

  });



app.get('/announcements', (request, response) => {
  let content = `
  <div id =announcementHeading>
    <h1>Announcements</h1>
  </div>
    <div id = "announcementList">
      <ul>
        <li>The Election is Nov. 3rd <a href=https://vote.gov/>register to vote!<a></li>
        <li>A meteor may hit the earth on election day.</li>
        <li>Remember to push to github every day.</li>
        <li>Wear a mask.</li>
      </ul>
    </div>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/curriculum', (request, response) => {
  let content = `
    <h1>Curriculum</h1>
    <h2>⚠️This page is under construction⚠️</h2>
    <p> The curriculum outline will be displayed in a manner in which the team feels is good</p>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/resources', (request, response) => {
  let content = `
    <h1>Resources</h1>
    <h2>⚠️This page is under construction⚠️</h2>
    <p>Here is list of all the important Resources </p>
    <p> There is a lot of freedom here </p>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/repository', (request, res) => {
  let username = request.query.username;

  // if (username === undefined) {
    let content = `
    <h1>Repository</h1>
    <h3>This repository page allows you to check on the latest commitments made on GitHub by typing in a username.</h3>
    <h3>Get started by typing in a GitHub username.</h3>
    <form action="/repository">
        <label for="username">Username:</label>
        <input type="text" id="usrname" name="username" required>
        <input type="submit" value="Submit">
    </form>
  `;

  if (username === undefined) {
    res.send(getLayoutHTML(content));
  } else {
    let octokit = new Octokit({
      auth: '173f077550ed6c4fa40c4b481fa791049e857d17'
    });

    octokit.repos.listForUser({ username: username }).then(function(response) {
      let data = response.data;

      Promise.all(data.map(item => {
        return octokit.repos.listCommits({
          owner: username,
          repo: item.name,
        });
      })).then(responses => {
        content += '<ol>';
        for (let response of responses) {
          let data = response.data;
          let firstCommit = data[0].commit;

          content += `<li>${firstCommit.author.email}</li>`
        }
        content += '</ol>';

        res.send(getLayoutHTML(content));
      })
    });
  }
});


let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});
