### Proposal

- What problem does your app solve?
  Organizes your last few days on Earth. :(
- Be as specific as possible; how does your app solve the problem?
  Creates a todo list with various features
- What is the mission statement?
  Welcome to the ultimate time-boxed bucket list app. We all have that list of items we want to achieve before different milestones in our lives, or maybe we're just going through a mid-life crises and we need to see our goals laid out before us in a user friendly way.
  Features

- What features are required for your minimum viable product? - Able to create items with links to activity sites - Able to check off completed items - Able to make board public to get feedback/commentary (default: private) - Able to create an account + login
- What features may you wish to put in a future release? - Able to share list on social media platform of their choice
- What do the top 3 similar apps do for their users?
  Provide the user a page with todo list functionality
  Frameworks - Libraries

- What 3rd party frameworks/libraries are you considering using? - express - jest - bcrypt - supertest - jsonwebtokens - cors - helmet - knex - sqlite3 - nodemon

- Do APIs require you to contact its maintainer to gain access?
  No
- Are you required to pay to use the API?
  Absolutely
- Have you considered using Apple Frameworks? (MapKit, Healthkit, ARKit?)
  No
  For Data Scientists

* Describe the Established data source with at least rough data able to be provided on day 1.
* You can gather information about the data set you’ll be working with from the project description. Be sure to collaborate with your PM, and your Backend Architect to chat about the resources you have.
* Write a description for what the DS problem is (what uncertainty/prediction are we trying to do here? Sentiment analysis? Why is this a useful solution to a problem?)
* A target (e.g. JSON format or such) for output that DS students can deliver to web/other students for them to ingest and use in the app

Target Audience

- Who is your target audience? Be specific.
  Anyone needing a good bucket list tracker
- What feedback have you gotten from potential users?
- Have you validated the problem and your solution with your target audience? How?

Research

- Research thoroughly before writing a single line of code. Solidify the features of your app conceptually before implementation. Spend the weekend researching so you can hit the ground running on Monday.
  Prototype Key Feature(s)

- This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.

| Request Methods |             API Endpoint              |                                                                                             Description |
| --------------- | :-----------------------------------: | ------------------------------------------------------------------------------------------------------: |
| POST            |          /api/auth/register           |        allows user to create a new user account with username, email, and password. Responds with a 201 |
| POST            |            /api/auth/login            |                        logs in user, returns json response 200 with message 'Logged in as \${username}' |
| DELETE          |           /api/auth/logout            |                                                                   logs user out and responds with a 204 |
| GET             |              /api/users/              |                                                      returns a list of all users. Returns status of 200 |
| PUT             |            /api/users/:id             | allows logged in user to edit their username, email, or password. Returns message 'Updated user \${id}' |
| DELETE          |            /api/users/:id             |                    allows logged in user to delete their account. Returns message 'Deleted user \${id}' |
| GET             |            /api/activities            |                                                  returns list of all activities. Returns status of 200. |
| GET             |          /api/activities/:id          |                                                   returns activity with that id. Returns status of 200. |
| POST            |            /api/activities            |                                              allows user to create new activity. Returns status of 201. |
| PUT             |          /api/activities/:id          |                                            allows user to update activity by id. Returns status of 200. |
| DELETE          |          /api/activities/:id          |                         allows user to delete activity. Returns message 'The activity has been deleted. |
| GET             | /api/activities/:activity_id/comments |                                                     returns all comments for the activity with that id. |
| POST            | /api/activities/:activity_id/comments |                                           allows user to create new comments for activity with that id. |
| PUT             | /api/activities/comments/:comment_id  |                                                   allows user to update a comment with that comment id. |
| DELETE          | /api/activities/comments/:comment_id  |                                                   allows user to delete a comment with that comment id. |
