# Movie Review Application

## Overview
This application is a full-stack MERN project that allows users to add, edit, delete, and review movies. The frontend is built with React.js and styled with CSS, while the backend is powered by Node.js with an Express.js framework, connecting to a MongoDB database.

## Features
- List movies
- Add new movies
- Edit existing movies
- Delete movies
- Write reviews for movies
- View all reviews for a specific movie

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS

## Prerequisites
- Node.js and npm installed.
- MongoDB running locally or a MongoDB Atlas account.
- Knowledge of JavaScript, React, Node.js, and MongoDB.

## Installation & Setup

Clone the repository:
```bash

git clone https://github.com/YavuzYilmazz/movie-review-app.git

```
```bash
cd movie-review-app
```

```bash
cd movie-review-backend
```

change the app.js file to include your MongoDB URI

```bash
npm install
```

```bash
npm start
```

```bash
cd movie-review-frontend
```

```bash
npm install
```

```bash
npm start

```

GET /api/movies - Retrieve all movies
POST /api/movies - Add a new movie
GET /api/movies/:id - Retrieve a movie by ID
PUT /api/movies/:id - Update a movie by ID
DELETE /api/movies/:id - Delete a movie by ID
POST /api/movies/:id/reviews - Add a review to a movie
DELETE /api/movies/:id/reviews/:reviewId - Delete a review


## Contact
If you have any questions or need help with the setup, feel free to reach out to me at [`yavuz.yilmaz1@outlook.com`]




