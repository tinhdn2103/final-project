from flask import Flask, jsonify
from collaborative_filtering import CF
from bson import ObjectId

app = Flask(__name__)

cf = CF()
cf.getUserRatings()

@app.route("/<user>", methods = ["GET"])
def get_movies(user):
    return jsonify(cf.recommend_top(ObjectId(user), 10))

if __name__ == "__main__":
    app.run(debug=True)

