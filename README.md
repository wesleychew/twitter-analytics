## Twitter User Country and User Prediction

### Problem Statement

To identify which region (America, Asia, Europe, Oceania) each twitter users are from based on their tweet activities timing as well as identifying the country they are from based on their tweet text using  machine learning and deep learning models. 

### Data Set

A list of twitter users from each country are scrapped from [Social Bakers](https://www.socialbakers.com/statistics/twitter/profiles/singapore) using selenium, which provides 1000 twitter usernames for each country. The 9 different countries that I've scrapped from are Canada, United States, United Kingdom, Belgium, Singapore, Malaysia, Indonesia, Australia and New Zealand as these are the countries that tweet mainly in English.

Tweets are then scrapped from the [list](notebooks/crawler/usernames.json) of users using [twint](https://github.com/twintproject/twint) into csv format. 

### Region prediction

Using traditional machine models such as logistic regression, random forest and xg boost to predict which region a persion might be from using only tweet count per hour as features. 

Example of first 3 row of data set (Data filled randomly)

| username | 0    | 1    | 2    | 3    | 4    | 5    | 6    | ...  | 18   | 19   | 20   | 21   | 22   | 23   |
| -------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| User1    | 10   | 22   | 3    | 11   | 0    | 0    | 1    | ...  | 6    | 8    | 9    | 19   | 21   | 11   |
| User2    | 0    | 3    | 2    | 5    | 1    | 0    | 13   | ...  | 19   | 32   | 11   | 17   | 8    | 3    |
| User3    | 11   | 21   | 14   | 12   | 22   | 13   | 12   | ...  | 0    | 1    | 3    | 0    | 1    | 1    |

Accuracy of around ~85% for most modes including feed forward neural networks. Reason might be due to countries in Oceania region, such as Australia, have overlapping timezone as some countries in the Asia reasion. However, it is also too big of a region to be removed completely. In addition, there may be some outliers in the data, where users are posting tweets on irregular timings within their timezone.

### Country prediction

Did a general NLP preprocessing, removing stopwords, lower case, remove urls, emojis, and punctuation. Each row of data consist of 500 tweets merged into a string. Again, used different classification models to predict which country a user might be from. Achieved quite a decent accuracy of 90+% with xgboost. However, this is only restricted to 9 countries that I've scrapped from. There is still room for improvement for adding more countries.

### Deployment on Heroku

Deployed model to website [here](https://folloing.com) with Heroku. It takes a while to generate results as tweets are being scrapped on the fly. Page Should be loaded within 30 seconds. If it is not loaded, it means heroku server is experiencing high traffic.

