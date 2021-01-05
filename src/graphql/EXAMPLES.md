# Mutations

Create new user:

```graphql
mutation {
  createUser(input: {
    firstName: "John"
    lastName: "Doe"
    username: "johndoe"
    email: "johndoe@gmail.com"
    password: "P4$$W0RD-3X4MPL3"
  }) {
    userId
    firstName
    lastName
    username
    email
  }
}
```

Authenticate user and generate token

```graphql 
mutation {
  login(
    email: "johndoe@gmail.com"
    password: "P4$$W0RD-3X4MPL3"
  ) {
    email
    token
  }
}
```

Create room reservation  
*Date/time accepted formats*:
- YYYY-MM-DDTHH:mm
- YYYY-MM-DD HH:mm:ss

*Requires header **x-access-token** (token returned on login mutation)*

```graphql
mutation {
  createReservation(input: {
    roomId: "36f7b7de-aedb-40db-9593-1bc68cc71c3c"
    start: "2021-01-05T08:00"
    end: "2021-01-05T09:00"
  }) {
    reservationID
    roomId
    roomDescription
    reservedBy
    reservedByName
    startAt
    endAt
  }
}
```

Cancel reservation

*Requires header **x-access-token** (token returned on login mutation)*


```graphql
mutation {
  cancelReservation(
    reservationId: "6b70c175-d930-4fab-8029-a7a3610b8131"
  ) {
    status
  }
}
```

# Queries

Get list of rooms / available rooms by timespan
*Date/time accepted formats*:
- YYYY-MM-DDTHH:mm
- YYYY-MM-DD HH:mm:ss

* Parameters *from* and *to* are optional. If not informed, query will return all existing rooms)  

```graphql
query {
  rooms(
    from: "2021-01-05T09:00"
    to: "2021-01-05T10:00"
  ) {
    roomId
    description
    openAt
    closeAt
  }
}
```

View user meetings schedule
*Date accepted format*:
- YYYY-MM-DD

* Parameter *date* is optional. If not informed, query will return schedule for current day.  

*Requires header **x-access-token** (token returned on login mutation)*

```graphql
query {
  userSchedule(
    date: "2020-01-05"
  ) {
    date
    schedule {
      reservationId
      roomId
      roomDescription
      reservedBy
      reservedByName
      startAt
      endAt
    }
  }
}
```

View room meetings schedule
*Date accepted format*:
- YYYY-MM-DD

* Parameter *date* is optional. If not informed, query will return schedule for current day.  

```graphql
query {
  roomSchedule(
    roomId: "36f7b7de-aedb-40db-9593-1bc68cc71c3c"
    date: "2020-01-05"
  ) {
    date
    schedule {
      reservationId
      roomId
      roomDescription
      reservedBy
      reservedByName
      startAt
      endAt
    }
  }
}
```