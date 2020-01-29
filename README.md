# Express React Template with Typescript

[![CircleCI](https://circleci.com/gh/bondz/node-express-react-ts.svg?style=svg)](https://circleci.com/gh/bondz/node-express-react-ts)

Run the server with

```bash
yarn
yarn start
```

---

Then run the client

```bash
cd client
yarn
yarn start
```

---

**API Endpoints**

| HTTP Verbs | Endpoints                | Action                         |
| ---------- | ------------------------ | ------------------------------ |
| GET        | /api/v1/users            | To get all users               |
| GET        | /api/v1/users/:id        | To get a specific user         |
| GET        | /api/v1/transactions     | To get all transactions        |
| POST       | /api/v1/users            | To create a user/account       |
| POST       | /api/v1/transactions/:id | To transfer funds              |
| DELETE     | /api/v1/users/:id        | To delete a user/close account |
| PATCH      | /api/v1/users/:id        | To edit user details           |
