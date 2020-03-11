from joblib import load


def predict_region(merged_tweets, xgb_region):

    return (
        xgb_region.predict(merged_tweets[list(range(24))])[0],
        [
            {"Region": region.capitalize(), "Probability": float(("%.3f" % proba))}
            for region, proba in zip(
                xgb_region.classes_,
                xgb_region.predict_proba(merged_tweets[list(range(24))])[0],
            )
        ],
    )


def predict_country(merged_tweets, xgb_country, tfidf_vectorizer):
    xgb_country = load("models/xgb_country.joblib")
    # tfidf_vectorizer = load("models/tfidf_vectorizer.joblib")
    tweets = [" ".join(merged_tweets["tweets"][0])]
    transformed_tweets = tfidf_vectorizer.transform(tweets)
    return (
        xgb_country.predict(transformed_tweets)[0],
        [
            {"Country": country.capitalize(), "Probability": float(("%.3f" % proba))}
            for country, proba in zip(
                xgb_country.classes_, xgb_country.predict_proba(transformed_tweets)[0],
            )
        ],
    )

