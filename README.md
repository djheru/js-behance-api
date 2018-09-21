# Challenge Implementation

## Overview

Thank you for the opportunity to complete this coding challenge as part of the hiring process. 
This was an original concept for a coding exercise, and hopefully will demonstrate that my skills and ability are well-
suited for this position.

The name of my application is Dēsigner Finder. It consists of two main views. The home page contains a search input
component where you can enter a search term and press "Enter" to submit. Then, displayed underneath the search input, 
you'll notice a scrolling list of profiles Bēhance has returned as results. The list contains the profile avatar, name,
and location to assist you in choosing the correct one. Upon selecting one of the list items by clicking, you will be 
navigated to the profile details page for that user. This page contains the following information:

- Full name
- Username
- Occupation
- Job title
- User location (city and country)
- Their Bēhance join date
- Their Stats (follower and following count, appreciations, and views)
- Work experience
- A tab interface showing the following
    - Their projects, displayed as thumbnails with a pop-up displaying the project name. When clicked, a new window
    will open to the project details page on the Bēhance site
    - The top 20 users they follow ordered by their number of followers descending
    - The top 20 users following them, also ordered by their number of followers descending
        - Followers and following users contain that user's avatar, their location, and their counts of followers and 
        following
        - Clicking a follow will take you to that user's page on Bēhance

Rather than simply building a React client appliation that consumes data from the Bēhance API, I decided to go another
route. Of course, the first thing that I'd like to mention is that I would never expand the scope of a feature or project
in this fashion at work. My reason for doing so is that I wanted to demonstrate my knowledge of Node.js in a server-side
environment, so I decided to implement an Express.js server backend using Apollo Server to implement a GraphQL endpoint
as the data source for the React application. The GraphQL server, in turn, consumes the Bēhance API using the Apollo
Server RESTDataSource to create a BehanceAPI service. I hope you will find this to be an interesting and appropriate
implementation of the DealerInspire Bēhance coding challenge!

### Observations

As I worked with the Bēhance API, I noticed that the `/user` endpoint does return inconsistent data for text queries. I 
confirmed this to be the case using plain HTTP requests via the Postman client and CURL. They also seem to have frequent
lapses in operation, and occasionally would have extremely long (10-20 second) response times, so I'm hoping you will 
take this into account when putting the application through its paces ;-)

## Architecture

As mentioned before, this coding challenge was implemented as a client/server application, with the server sitting in
front of the Bēhance API as an additional layer. The advantage to this approach is REST is schemaless, GraphQL provides 
an introspectable way to communicate to clients what Types and operations are available. It also provides flexibility 
to allow transformations of the data on the server, before being sent to the client, and allows server-side request 
caching (not implemented here), to manage API resource usage limits, for example.

### Server Side

As mentioned, the server is an Express.js server using ApolloServer for GraphQL. There's no middleware or authentication
to speak of, aside from CORS, as it wasn't really necessary. The server uses the Apollo RESTDataSource to implement a 
REST client for the Bēhance API.

### Client Side

Dēsigner Finder uses a React application (bootstrapped by create-react-app) along with the SemanticUI React component
library and the ApolloClient library for GraphQL requests.

## Features

#### Server 

- GraphQL server
- Bēhance API client with retry feature that will, uh, re-try API requests up to 3 times in the event of e.g. a network
failure
- Unit tests covering main business logic and utils
- Scalable and maintainable application structure
- ES2017 features including transpiling with Babel, using stage-2 presets
- Linting with eslint using google style rules

#### Client

- GraphQL client
- Service workers implementing application caching 
- Component-centric code splitting to reduce load time by breaking bundle into pieces and loading asynchronously
- Clean, attractive, responsive design
- Some unit tests (admittedly, this is an area where I could refine and hone my skills)

## How to Use

The first step is to copy `./server/.env.dist` to `./server/.env` (`mv ./server/.env.dist ./server.env`) and enter a 
Bēhance API key (e.g. `NdTKNWys9AdBhxMhXnKuxgfzmqvwkg55`). Normally I would not commit an API key, but in this case... 

#### Server

Invoke npm scripts from the `./server` directory

- Install dependencies: `npm i`
- Start server: `npm start`
- Start in dev mode, with hot reloading and debugging output: `npm run dev`
- Run tests: `npm t`

#### Client

Invoke npm scripts from the `./client` directory

- Install dependencies: `npm i`
- Build production bundle: `npm run build`
- Build production bundle and serve locally: `npm run serve:build`
- Run in dev mode: `npm start`
- Run tests: `npm t`


## Screeenshots

### Home Page

![Homepage 1 Desktop](homepage-1_desktop.png)

![Homepage 2 Desktop](homepage-2_desktop.png)

![Homepage 1 Mobile](homepage-1_mobile.png)

![Homepage 2 Mobile](homepage-2_mobile.png)

### Profile Page

![Profile 1 Desktop](profile-1_desktop.png)

![Profile 2 Desktop](profile-2_desktop.png)

![Profile 3 Desktop](profile-3_desktop.png)

![Profile 1 Mobile](profile-1_mobile.png)

![Profile 2 Mobile](profile-2_mobile.png)

![Profile 3 Mobile](profile-3_mobile.png)
