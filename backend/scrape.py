import twint
import nest_asyncio

nest_asyncio.apply()  # prevent event loop to be nested


def get_config(username):
    config = twint.Config()
    config.Hide_output = True
    config.Store_object = True
    config.Username = username
    return config


def get_info(username):
    c = get_config(username)
    twint.output.clean_lists()
    twint.run.Lookup(c)
    try:
        return twint.output.users_list[0].__dict__
    except:
        return []


def get_tweets(username):
    c = get_config(username)
    c.Lang = "en"
    c.Limit = 200
    twint.output.clean_lists()
    twint.run.Search(c)
    try:
        return twint.output.tweets_list
    except:
        return []


def scrape_tweets(username):
    return {
        "info": get_info(username),
        "tweets": [tweet.__dict__ for tweet in get_tweets(username)],
    }

