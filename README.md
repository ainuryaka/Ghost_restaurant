# Ghost restaurant project

## Description

This project is a web application that allows users to view and order from "Phantom Taste" restaurant. The application is built using React/Redux in the frontend and FastAPI in the backend. The application is deployed on Render.com.

## Features

-   Users can view the menu and add items to their cart
-   Users can view their cart and remove items from their cart
-   Users can place an order

## Technologies

-   React
-   Redux
-   FastAPI
-   PostgreSQL

## Installation

1. Clone the repository
2. Install the dependencies

```bash
cd backend
pip install -r requirements.txt
```

```bash
cd frontend
yarn install
```

3. Create a `.env` file in the `backend` directory and add the following environment variables

```
POSTGRESQL_URL=postgresql+psycopg2://username:password@host:port/database
```

4. Create a `.env` file in the `frontend` directory and add the following environment variables

```
REACT_APP_API_URL=http://localhost:8000
```

## Usage

1. Start the backend server

```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend server

```bash
cd frontend
yarn run dev
```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
