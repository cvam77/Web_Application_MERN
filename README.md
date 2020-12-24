"# Watchman-MERN" 

git subtree push --prefix web heroku master

***APIs***

-Register

https://watchman3.herokuapp.com/user/register

Format-
{
    "username" : "blahblah",
    "password" : "blahblah"
}

-Login

https://watchman3.herokuapp.com/user/login

{
    "username" : "blahblah",
    "password" : "blahblah"
}

-Adding URL and keyword

https://watchman3.herokuapp.com/user/urlkeyword

{
    "url" : "abc.com",
    "keyword" : "abc"
}

-Listing URL and keyword
https://watchman3.herokuapp.com/user/listurlkeyword

-Logout
https://watchman3.herokuapp.com/user/logout
