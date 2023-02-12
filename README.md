## Finance manager app

Finance manager app test project

## Local setup

1. Clone repo
2. Run `npm install` to install dependencies
3. Copy the `.env.example` file over to your own `.env` file and update the variables
4. Run `docker-compose up -d` to setup local environment with Docker
5. Run `npx prisma migrate dev` to run local database migrations

After make it steps runs 2 containers:

- api application
- postgresql for testing

## Swagger API docs

http://localhost:3000/api/docs

## Testing

1. For unit tests run `npm run test`
2. For e2e tests run `npm run test:e2e`
