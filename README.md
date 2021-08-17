<h1 align="center">🎶 Sing Me a Song 🎵</h1>

Sing me a song is an API to recommend songs anonymously.<br>
The more people like a recommendation, the more likely it is to be recommended to others. 


### 🔹🔹About

This is the API that works with an application where people can send an old exam and search for old exams by teacher or by subject. Below are the implemented features:

- Adds a new music recommendation ***(/recommendations)***;
- Adds a point to recommendation score ***(/recommendations/:id/upvote)***;
- Removes a point to recommendation score ***(/recommendations/:id/downvote)***; <br>
  Based on business logic: if the score falls below -5, the recommendation must be deleted.
- Takes a random recommendation ***(/recommendations/random)***; <br>
  Based on business logic: 70% of the time: a song with a score greater than 10 should be randomly recommended and 30% score between -5 and 9.
- Lists the songs with the highest score and their score ***(/recommendations/top/:amount)***;


### 🔹🔹Technologies
- NodeJS
- Express
- Typescript
- PostgreSQL
- Jest
- Supertest
- <a href="https://www.npmjs.com/package/joi" target="_blank">Joi</a>


### 🔹🔹Disclaimer

On this project I was training Typescript for the very first time. <br>
It was very challenging, but the final result is great. <br>
➔ Next step here is to add routes that select and recommend songs by genre. <br>
➔ Also, I will fix fix integration tests adding tests for expected arrays. <br>

### 🔹🔹How to run

1. Clone this repository
2. Ypu can clone the front-end repository an follow its instruction for installation at https://github.com/jumeneguete/mywallet-front-end
3. Install dependencies
```bash
npm i
```
4. Ceate an .env file based on env.example
5. The database required to run the application can be found at assets/dump.sql;
6. Run server
```bash
npm run dev
```
7. Congrats! App is runnig and you can test it using some API Client or together with the <a href="https://github.com/jumeneguete/mywallet-front-end" target="_blank">front-end application</a>.

<br>

➔  You can also run integration tests following the additional steps:

1. Ceate an .env.test file based on env.example and set a cloned database to run tests;
2. Run server
```bash
npm run test
```
3. That's it! :D
