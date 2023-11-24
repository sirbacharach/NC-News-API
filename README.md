# Northcoders News API

description:
Northcoders News API is an application for querying an sql database.
the api endpoint contains objects describing the available endpoints and what they are used for.
records can be queried, added, updated and deleted.

Here is the link to the hosted version: https://robs-nc-news.onrender.com/api/

If you choose not to install locally and use the hosted version the link provided should take you to the api, which is a JSON containing a list of endpoints for you to type in to the address bad of your browser.
in order to see the information in a more readable format, you could install a either some software or a chrome plugin such as JSON viewer.

Setup instructions:

Minimum version requirements
Node v20.6.1
psql(PostgresSQL) v15.4

The following instructions assume you are using MS Visual Studio Code.

1. First you must make your own fork of the git-hub repository
https://github.com/sirbacharach/Robs-News-API/tree/main

2. In the terminal navigate to the directory where you want to clone the repository.

3. using the address of your cloned repo, type "git clone #Address goes here#", this should create a direcory containing the repo. navigate into that directory and open Visual Studio Code.

4. You should create 2 files in the root folder containing the following information.

file1 name: .env.test
containing: `PGDATABASE=nc_news_test`

file2 name: .env.development
containing: `PGDATABASE=nc_news`

5. ensure that they are added to your .gitignore file, they should be darker that the other file names if using visual studio code.

6. run "npm install" to install the dependancies which are in the "package.json".

7. Type "npm run setup-dbs", this will run the script to seed the database.

8. you may now run the tests app.test.js and utils.test.js either individually with "npm test -filename-" or all at the same time with "npm test"

