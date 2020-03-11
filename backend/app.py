from quart import Quart, request, jsonify
from scrape import scrape_tweets
from preprocess import (
    process,
    month_graph,
    hour_graph,
    day_graph,
    day_time_graph,
    wordcloud,
    sentiment_graph,
    year_month,
    hmu_graph,
    hashtag_graph,
    mentions,
    log_scale,
    urls,
)
from model import predict_region, predict_country
from joblib import load
from time import time
import json

app = Quart(__name__)
xgb_region = load("models/xgb_region.joblib")
xgb_country = load("models/xgb_country.joblib")
tfidf_vectorizer = load("models/tfidf_vectorizer.joblib")


@app.route("/wake/")
async def wake():
    return jsonify({"status": "woke"})


@app.route("/api/", methods=["GET"])
async def api():
    username = request.args.get("username")
    before = time()
    result = scrape_tweets(username)
    result["took"] = time() - before  # Measure time taken to scrape
    print(result["took"])
    return jsonify(result)


@app.route("/analyze/", methods=["POST"])
async def analyze():
    result = await request.body
    result = json.loads(result.decode("utf-8"))
    if result["tweets"]:
        before = time()
        result["vaildAccount"] = True
        merged_tweets = process(result["tweets"])
        result["year"], result["month"] = year_month(result["info"])
        result["monthGraph"] = month_graph(result["tweets"])
        result["hourGraph"] = hour_graph(merged_tweets)
        result["dayGraph"] = day_graph(merged_tweets)
        result["dayTimeGraph"] = day_time_graph(result["tweets"])
        result["region"], result["regionProba"] = predict_region(
            merged_tweets, xgb_region
        )
        result["country"], result["countryProba"] = predict_country(
            merged_tweets, xgb_country, tfidf_vectorizer
        )
        result["wordcloud"] = wordcloud(merged_tweets)
        result["sentimentGraph"] = sentiment_graph(merged_tweets, result["tweets"])
        result["hmuGraph"] = hmu_graph(result["tweets"])
        result["hashtagGraph"] = hashtag_graph(result["tweets"])
        result["logScale"] = log_scale(result["tweets"])
        result["mentions"] = mentions(result["tweets"])
        result["urls"] = urls(result["tweets"])
        result["took"] = f"{time()-before} seconds"
        print(result["took"])
        return jsonify(result)
    else:
        result["vaildAccount"] = False
        return jsonify(result)


if __name__ == "__main__":
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
