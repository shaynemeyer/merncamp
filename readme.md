# Merncamp 
A social media clone. Client side uses NextJS & React, Server side uses express.

## Project Structure

```ascii
.
├── client
│   ├── .next                             # NextJS Build files
│   ├── components           
│   │   ├── cards                
│   │   │    ├── People.js                # Card for displaying user info in lists (sidebar)
│   │   │    └── PostList.js              # Card for showing lists of Posts
│   │   ├── forms                
│   │   │    ├── AuthForm.js              # Form used for Registration, Profile Editing, etc.
│   │   │    ├── ForgotPasswordForm.js    # For requesting a password reset
│   │   │    └── PostForm.js              # For creating/editing Posts
│   │   ├── images
│   │   │    └── PostImage.js             # Component Optimizes rendering of images
│   │   ├── routes
│   │   │    └── UserRoute.js             # Wrapper component that ensures the user is logged in 
│   │   └── nav.js                        # Navigation component
│   ├── context  
│   │   └── index.js                      # Maintains context code for the app
│   ├── pages  
│   │   ├── user 
│   │   │     ├── post 
│   │   │     │    └── `[id].js`          # Edit Post page
│   │   │     ├── profile 
│   │   │     │    └── update.js          # Update user profile page
│   │   │     └── dashboard.js            # Users Dashboard page
│   │   ├── _app.js                       # NextJS -> app wrapper 
│   │   ├── _document.js                  # NextJS -> importing js from cdn  
│   │   ├── forgot-password.js            # NextJS -> Forgot Password page 
│   │   ├── index.js                      # Home page 
│   │   ├── login.js                      # Login page 
│   │   └── register.js                   # Registration page
│   ├── public  
│   │   ├── images              # Public share for images 
│   │   └── css                 # Public share for css files
│   ├── package-lock.json 
│   └── package.json                
├── server
│   ├── controllers           
│   │   ├── auth.js             # Handles authentication code such as login, register, etc
│   │   ├── post.js             # Handles working with Posts
│   ├── helpers  
│   │   └── auth.js             # Helper functions such as hashing passwords
│   ├── middlewares  
│   │   └── index.js            # application middlewares
│   ├── models  
│   │   ├── post.js             # Post model 
│   │   └── user.js             # User model
│   ├── routes  
│   │   ├── auth.js             # Auth routes 
│   │   └── post.js             # Post routes
│   ├── package-lock.json 
│   ├── package.json 
│   └── server.js               # Server start point
└── .gitignore               # Git Ignore
```