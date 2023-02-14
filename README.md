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

## Improwment before production

1. Add auth for transaction webhook
2. Add import by path alias (@)
3. Cover the entire project with tests
4. Add logging module and connect provider for aggregate logs, like https://www.datadoghq.com/ 
5. Improve protect before deleling categories, maibe use ON DELETE RESCTICT for relations beetwen categories and transactions in migration
