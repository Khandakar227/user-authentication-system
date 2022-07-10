# User Authentication System
An example of secured user authentication using Mongodb, Express.


## API endpoints

| Route | Request method | Description |
|---------|--------------|-------------|
| `/api/user/signup` | POST | Create a new user account |
| `/api/verify/:token` | GET | Verify the email of a user account |
| `/api/user/login` | POST | Log in to a user account |
| `/api/user/:id` | PUT | Update user account |
| `/api/user/:id` | DELETE | Delete user account |
| `/api/forgotpassword` | POST | Send password reset link email of a user account |
| `/api/resetpassword/:token` | GET | A password resetting form to change password of the email (signed in the jwt token) |
| `/api/resetpassword/:token` | POST | Send new password and change the user account password |


## Folder structure

```
├──controller
|   ├──userSignUp.js
|   ├──verificationHandler.js
|   ├──userLoginHandler.js
|   ├──updateUser.js
|   ├──deleteUser.js
|   ├──forgotPasswordHandler.js
|   └──resetPasswordHandler.js
|
├──lib
|  ├──index.js
|  └──verifyEmail.js
|
├──middlewares
|  ├──checkAuth.js
|  ├──verifyId.js
|  └──rateLimiterFlexible.js
|
├──models
|  └──user.js
|
├──routes
|  ├──forgotpassword.js
|  ├──resetpassword.js
|  ├──verify.js
|  └──user.js
|
├──index.js
├──package.json
├──README.md
```
## Security feature
1. User input validation
2. DDOS, Bruteforce and password attack protection
3. Prevention of unauthorized user account update and delete.

## Improvements and updates
Feel free to make any changes and a pull request.
