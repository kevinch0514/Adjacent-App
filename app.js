// Node's standard path module
// See https://nodejs.org/api/path.html
let path = require('path');

// The Express web application framework
// See http://expressjs.com/
let express = require('express');

// Library for nicer logging of HTTP requests
// See https://github.com/expressjs/morgan
let logger = require('morgan');

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
    <h1>Feedback Page</h1>
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
    <h1>Schedule Page</h1>
    <p>Here is all of the feedback for _______ (There will be a schedule for each week)</p>
    <p> Could also put links to the google calendar</p>

    <div id = "ScheduleList">
    <p> We could put a link to an empty page with the schedule for week x </p>
    <p> We woudld then have links to pages for every week </p>
    </div>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});


app.get('/announcements', (request, response) => {
  let content = `
    <h1>Announcements Page</h1>
    <p>Here is list of all the important announcements </p>


    <div id = "announcementList">
    <p> A list of announcements in chronological order, newest at top </p>
    </div>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/syllabus', (request, response) => {
  let content = `
    <h1>Syllabus Page</h1>
    <p> The syllabus will be displayed in a manner in which the team feels is good</p>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/repository', (request, response) => {
  let content = `
    <h1>Repository Page</h1>
    <p>Here is list of all repositories for __________ </p>

    <div id = "repositoryList">
    <p> A list of repositories in chronological order, newest at top </p>
    </div>

    <div id = "pushList">
    <p> here will be a list of all push requests from user x, in chronological order, newest at top </p>

    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/resources', (request, response) => {
  let content = `
    <h1>Resources Page</h1>
    <p>Here is list of all the important Resources </p>
    <p> There is a lot of freedom here </p>
  `;

  response.send(getLayoutHTML(content));
});


let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});