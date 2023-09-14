# Content Generator serverless API

### Config

Create a copy of the `example.env` file and rename it to `.env` and update the env values.

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `OPEN_AI_API_KEY`

### Install

`npm install`

### Deploy

`npm run deploy`

### To add a new serverless function

- Create a ts file with a handler function inside `src/functions` and include the logic
- Update `serverless.yml` to create a new lambda function for the new handler
- Deploy
