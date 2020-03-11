import pandas as pd
from collections import defaultdict, Counter
from datetime import datetime
from time import time
import string
import re
from urllib.parse import urlparse
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]


def remove_pattern(input_txt, pattern):
    r = re.findall(pattern, input_txt)
    for i in r:
        input_txt = re.sub(i, "", input_txt)
    return input_txt


def remove_url(text):
    r = [w for w in text.split() if "pictwittercom" in w]
    for i in r:
        text = re.sub(i, "", text)
    return text


def remove_emoji(text):
    text = " ".join(text)
    return text.encode("ascii", "ignore").decode("ascii")


def clean_tweet(text):
    text = remove_pattern(text, "@[\w]*")  # Remove @mentions
    text = re.sub(r"http[s]{0,1}://[^\s]*", "", text)  # remove http websites
    text = text.replace("\n", " ")  # replace \n
    text = text.replace("\xa0", " ")
    text = text.translate(
        str.maketrans("", "", string.punctuation)
    )  # remove punctuation
    text = remove_url(text)

    return text


def clean_df(df):

    df["hour"] = df["datetime"].map(
        lambda x: int(datetime.utcfromtimestamp((x / 1000) + 28800).strftime("%H"))
    )
    df["week"] = df["datetime"].map(
        lambda x: datetime.utcfromtimestamp((x / 1000) + 28800).strftime("%A")
    )
    hours = pd.DataFrame(
        pd.DataFrame(pd.get_dummies(df["hour"]), columns=range(24)).fillna(0).sum()
    ).T.astype(int)
    days = pd.DataFrame(
        pd.DataFrame(pd.get_dummies(df["week"]), columns=weekdays).fillna(0).sum()
    ).T.astype(int)
    final = pd.concat([hours, days], axis=1)
    final["tweets"] = ""
    final.at[0, "tweets"] = [clean_tweet(t) for t in df["tweet"]]
    final["tweets_noemoji"] = final["tweets"].map(remove_emoji)
    return final


def year_month(info):
    delta = datetime.utcfromtimestamp(time() + 28800) - datetime.strptime(
        info["join_date"], "%d %b %Y"
    )
    return delta.days // 365, (delta.days % 365) // 30


def month_graph(tweets):
    d = defaultdict(lambda: defaultdict(int))
    for t in tweets:
        if len(t["reply_to"]) == 1:
            d[t["datestamp"]]["tweet"] += 1
        else:
            d[t["datestamp"]]["reply"] += 1

    df = pd.DataFrame(d).T.fillna(0)
    if "reply" not in df.columns:
        df["reply"] = 0

    df.index = pd.to_datetime(df.index)

    if len(df.resample("M")) < 3:
        dates = df.resample("W")
        dic = dates.sum()[["reply", "tweet"]].to_dict(orient="index")

        return [
            {
                "Date": date.to_pydatetime().strftime("%d %b"),
                "Replies": reply,
                "Tweets": tweet,
            }
            for date, reply, tweet in zip(
                dic.keys(),
                [i["reply"] for i in dic.values()],
                [i["tweet"] for i in dic.values()],
            )
        ]
    else:
        dates = df.resample("M")
        dic = dates.sum()[["reply", "tweet"]].to_dict(orient="index")
        return [
            {
                "Date": date.to_pydatetime().strftime("%b %Y"),
                "Replies": reply,
                "Tweets": tweet,
            }
            for date, reply, tweet in zip(
                dic.keys(),
                [i["reply"] for i in dic.values()],
                [i["tweet"] for i in dic.values()],
            )
        ]


def hour_graph(merged_tweets):
    return [
        {"Hour": k, "Count": v}
        for k, v in zip(range(24), merged_tweets[list(range(24))].loc[0])
    ]


def day_graph(merged_tweets):
    return [
        {"Day": d, "Count": v} for d, v in zip(weekdays, merged_tweets[weekdays].loc[0])
    ]


def day_time_graph(tweets):
    df = pd.DataFrame(tweets)
    days = [
        [{"hour": h, "index": 1, "count": 0} for h in list(range(24))]
        for day in weekdays
    ]
    for date in [
        datetime.utcfromtimestamp((t / 1000) + 28800) for t in list(df["datetime"])
    ]:
        days[int(date.strftime("%w"))][int(date.strftime("%H"))]["count"] += 1
    days = days[1:] + days[:1]
    total, counter = [], 0
    for day in days:
        total.extend([hour["count"] for hour in day])
    maximum, minimum = max(total), min(total)
    normalized = [(i - minimum) / (maximum - minimum) for i in total]
    for day in days:
        for hour in day:
            hour["normalized"] = normalized[counter]
            counter += 1
    for d in days:
        d.append({"normalized": 1})
    return days


def wordcloud(merged_tweets):
    with open("models/stopwords.txt") as f:
        stopwords = {line.rstrip("\n") for line in f if "#" not in line}
    words = merged_tweets["tweets_noemoji"]  # List of tweets
    words = " ".join(words).lower()
    cnt = Counter(
        [word for word in words.split() if word not in stopwords]
    ).most_common(100)
    return [{"text": k, "value": v} for k, v in cnt]


def sentiment_graph(merged_tweets, tweets):
    df = pd.DataFrame(tweets)
    dates = df["datetime"][:100][::-1]
    raw_tweets = df["tweet"][:100][::-1]
    tweet_list = merged_tweets["tweets"][0][:100][::-1]  # List of clean tweets
    analyzer = SentimentIntensityAnalyzer()
    return [
        {
            "tweet": raw_tweet,
            "score": analyzer.polarity_scores(tweet)["compound"],
            "date": datetime.utcfromtimestamp((date / 1000) + 28800).strftime(
                "%d %b %Y"
            ),
        }
        for raw_tweet, tweet, date in zip(raw_tweets, tweet_list, dates)
    ]


def hmu_graph(tweets):
    df = pd.DataFrame(tweets)
    return [
        {"category": "tweets", "count": len(df)},
        {"category": "mentions", "count": len([1 for i in df["mentions"] if i])},
        {"category": "urls", "count": len([1 for i in df["urls"] if i])},
        {"category": "hashtags", "count": len([1 for i in df["hashtags"] if i])},
    ]


def hashtag_graph(tweets):
    df = pd.DataFrame(tweets)
    hashtags = []
    for h in df["hashtags"]:
        hashtags.extend(h)
    hashtags = {h: defaultdict(int) for h in hashtags}
    for tweet in tweets:
        for h in tweet["hashtags"]:
            hashtags[h]["count"] += 1
            hashtags[h]["retweets"] += int(tweet["retweets_count"])
            hashtags[h]["likes"] += int(tweet["likes_count"])
    for h in hashtags:
        hashtags[h]["retweets"] = int(hashtags[h]["retweets"] / hashtags[h]["count"])
        hashtags[h]["likes"] = int(hashtags[h]["likes"] / hashtags[h]["count"])
    return [
        {
            "hashtag": k,
            "retweets": v["retweets"],
            "likes": v["likes"],
            "count": v["count"],
        }
        for k, v in hashtags.items()
    ]


def log_scale(tweets):
    df = pd.DataFrame(tweets)
    df["retweets_count"] = df["retweets_count"].map(lambda x: int(x))
    df["likes_count"] = df["likes_count"].map(lambda x: int(x))
    rt_log, likes_log = False, False
    if df["retweets_count"].max() // (df["retweets_count"].min() + 1) > 1000:
        rt_log = True
    if df["likes_count"].max() // (df["likes_count"].min() + 1) > 1000:
        likes_log = True
    return [rt_log, likes_log]


def mentions(tweets):
    df = pd.DataFrame(tweets)
    mentions = []
    for m in df["mentions"]:
        mentions.extend(m)
    return [[m[0], m[1]] for m in Counter(mentions).most_common(24)]


def urls(tweets):
    df = pd.DataFrame(tweets)
    urls = []
    for u in df["urls"]:
        urls.extend(u)
    urls = Counter(
        ["https://{uri.netloc}".format(uri=urlparse(u)) for u in urls]
    ).most_common(24)
    return [[u[0], u[0] + "/favicon.ico", u[1]] for u in urls]


def process(tweets):
    df = pd.DataFrame(tweets)
    return clean_df(df)

