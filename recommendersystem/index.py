from flask import Flask, jsonify, request
from collaborative_filtering import CF
from content_based import CB
from trending import Trending
from bson import ObjectId

app = Flask(__name__)

cf = CF()
cf.fit()

cb = CB()
cb.fit()

td = Trending()

@app.route("/cf/users_based/<user>", methods = ["GET"])
def get_movies_by_cf(user):
    return jsonify(cf.recommend_top(ObjectId(user), 10))

@app.route("/cb/recommend_by_user/<user>", methods = ["GET"])
def get_movies_by_cb(user):
    return jsonify(cb.recommend_top(ObjectId(user), 10))

@app.route("/cb/recommend_by_movie/<movie>", methods = ["GET"])
def get_movies_by_movie(movie):
    return jsonify(cb.recommend_by_movie(ObjectId(movie)))

@app.route("/cb/search", methods = ["GET"])
def search_movies():
    q = request.args.get('q')
    return jsonify(cb.search(q))

@app.route("/trending", methods = ["GET"])
def get_trending():
    return jsonify(td.get_trending_list())

@app.route("/fit", methods = ["GET"])
def fit():
    cf.fit()
    cb.fit()
    return jsonify(message = "success")

@app.route("/cb/fit", methods = ["GET"])
def cb_fit():
    cb.fit()
    return jsonify(message = "success")

if __name__ == "__main__":
    app.run(debug=True)

