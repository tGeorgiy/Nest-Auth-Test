## Installation

```bash
$ yarn install
```

## Running the app

```bash
# docker
$ docker compose up

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Routes

### Register

POST `http://localhost:3000/register`
```bash
Body:
{
  "username": "qwerty@qwerty.com",
  "password": "SomePass"
}
Responce:
{
  "requestObject": {
    "userId": "63dd055b04cbe183c2431192",
    "userName": "qwerty@qwerty.com"
  },
  "message": "User successfully registered"
}
```

### Login

POST `http://localhost:3000/login`
```bash
Body:
{
  "username": "qwerty@qwerty.com",
  "password": "SomePass"
}
Responce:
{
  "requestObject": {
    "userId": "63dd055b04cbe183c2431192",
    "userName": "qwerty@qwerty.com",
    "needToChangePassword": false
  },
  "message": "User logged in"
}
```
### Password change

POST `http://localhost:3000/user/change-password`
```bash
Body:
{
  "newPassword": "NewPass"
}
Responce:
{
  "message": "Password changed successfully."
}
```
### Logout
POST `http://localhost:3000/logout`
```bash
Responce:
{
  "message": "The user session has ended"
}
```
