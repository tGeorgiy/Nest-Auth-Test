## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Routes

# Register

POST `http://localhost:3000/register`
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

# Login

POST `http://localhost:3000/login`
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

# Password change

POST `http://localhost:3000/user/change-password`
Body:
{
"newPassword": "NewPass"
}
Responce:
{
"message": "Password changed successfully."
}

# Logout

POST `http://localhost:3000/logout`
Responce:
{
"message": "The user session has ended"
}
