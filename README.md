# Task Nest
## Overview
This React application is a basic ticket management system. It allows users to:
- View a list of tickets
- Search for tickets by name or description
- Filter tickets by status and assigned user
- View detailed information about a specific ticket
- Edit ticket details

## Setup
1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Add your API URL to ApiConfig.js file as follows:
    `export const ApiURL = "your-api-address/";`
4. Start the development server using `npm start` or `yarn start`.

## API
The application interacts with a TaskNest REST API to fetch and manage ticket data. The API Url is defined in the .env file.  
[API can be found in this repo](https://github.com/m-poznanski/TaskNestApi)

## Usage
- The application displays a list of tickets with basic information (name, status, assigned user).
- Users can search for tickets by entering keywords in the search bar.
- Users can filter tickets by status and assigned user.
- Clicking on a ticket displays its details.
- Logged in users can edit ticket details.

## Dependencies
- React
- Ant Design
- Axios (or fetch API)
- React Router (for navigation)

