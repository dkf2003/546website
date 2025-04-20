# WiFly NYC


## Project Description

Discover the perfect blend of connectivity and comfort in the heart of New York City (and possibly Hoboken). WiFly NYC is your go-to guide for finding free WiFi hotspots and cozy spaces to work, study, or simply unwind, as well as events happening in the city, such as festivals, street markets, or sports events.

## Installation

To get started with WiFly NYC locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/eduzeu/546website.git
cd 546website
npm install
```

If you already have the project downloaded, you can skip the `clone` step.

If it doesn't run on the first try, then do the following command on the terminal: 
```bash
npm i
```

## Cloudinary API Credentials
To use the image saving functionality of WiFly, you will need a [Cloudinary](https://cloudinary.com) account and credentials. You can sign up for free and get the required API information.

Rename `.env.example` to `.env` and update the values of `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` with your credentials.

The upload preset must be unsigned.

## Running the Application

To run the app and get started with WiFly NYC, run the following command after installation: 

```bash
npm start
```

Enter the following url into your web browser to start using the website:
```
localhost:3000
```

To seed the application run:
```bash
npm run seed
```

## Running the Application through a Docker Container

To Build (First time use)
```
docker-compose up --build
```

To start

```
docker-compose up
```

To seed the db

```
docker-compose exec app npm run seed
```