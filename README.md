# Simplifii

### Feture

1. generate OTP

 ◉ User will send his email address (which also acts as the login id) in the request body

 ◉ backend will generate an OTP and send it back to the user provided certain conditions are met. The conditions that need to be met are listed below. 


2. Login API

 ◉ User will send his email address and OTP in the request body

 ◉ If OTP is valid then generate a new JWT token and send it back to the user


### Important Conditions:

 ◉ OTP once used can not be reused

 ◉ OTP is valid for 5 minutes only. Not after that.

 ◉ 5 consecutive wrong OTP will block the user account for 1 hour. The login can be reattempted only after an hour.

 ◉ There should be a minimum 1 min gap between two generate OTP requests. 


### APIs Used
The following APIs were used in this project:

1. Sign Up: ```curl --location 'https://simplifii-production.up.railway.app/api/signUp' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"patil120140@gmail.com"
}'```


2. Login: ```curl --location 'https://simplifii-production.up.railway.app/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
       "email":"patil120140@gmail.com",
    "otp":435994
}'```

### Credits
This project was created by *Vishal Patil*.

### Contact
For any questions or feedback, please contact me at *patil120140@gmail.com*.

