# Plus Ultra Fitness Tracker

A beginner-friendly MERN fitness tracker that generates a personalized workout plan from age, height, weight, workout intensity, and fitness goal.

## Project Structure

```text
plus-ultra-fitness-tracker/
  client/
    index.html
    package.json
    src/
      App.jsx
      main.jsx
      styles.css
    public/
      logo.svg
  server/
    package.json
    server.js
    .env.example
    models/
      Plan.js
    routes/
      plans.js
    utils/
      generateWorkoutPlan.js
```

## What You Need Installed

You already have the main requirement:

- Node.js
- VS Code

You do not need to install React separately. React is listed in `client/package.json`, so `npm install` downloads it for this project.

MongoDB is only needed when you start the backend. You have two beginner-friendly choices:

- MongoDB Atlas: online MongoDB database, easiest if you do not want to install database software.
- MongoDB Community Server: installed on your laptop, useful if you want everything local.

## How To Open This Project

1. Open VS Code.
2. Click `File > Open Folder`.
3. Select the `plus-ultra-fitness-tracker` folder.
4. Open the VS Code terminal with `Terminal > New Terminal`.

## Run The Frontend First

```bash
cd client
npm install
npm run dev
```

After this, Vite will show a local URL like:

```bash
http://localhost:5173
```

Open that URL in your browser.

## Install MongoDB Later

### Option 1: MongoDB Atlas

1. Go to `https://www.mongodb.com/atlas`.
2. Create a free account.
3. Create a free cluster.
4. Create a database user and password.
5. Copy your connection string.
6. Paste it into `server/.env` as `MONGO_URI`.

Example:

```bash
MONGO_URI=mongodb+srv://yourUser:yourPassword@yourCluster.mongodb.net/plus-ultra
```

### Option 2: Local MongoDB

1. Download MongoDB Community Server from `https://www.mongodb.com/try/download/community`.
2. Install it with the default settings.
3. Keep this value in `server/.env`:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/plus-ultra
```

## Run The Backend When MongoDB Is Ready

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Update `server/.env` with your MongoDB connection string.

The backend will run on:

```bash
http://localhost:5000
```

## Logo

Replace `client/public/logo.svg` with your real logo file when ready. If your logo is named `logo.png`, update the image path in `client/src/App.jsx`.
