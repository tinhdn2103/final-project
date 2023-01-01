import pandas as pd
import numpy as np
from pymongo import MongoClient
import datetime as dt

class Trending:
    def __init__(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['movie-web']
        self.col_movies = db.movies
        self.col_countviews = db.countviews
        self.col_comments = db.comments
        self.col_userratings = db.userratings
        self.my_col = db.trendings

    def get_trending_list(self):
        date = dt.datetime.now(dt.timezone.utc)
        date = date - dt.timedelta(days=30)
        
        cur_movies = self.col_movies.find({}, {'_id': 1})
        cur_countviews = self.col_countviews.find({'createdAt': { '$gte': date }}, {'movie': 1, '_id': 0})
        cur_comments = self.col_comments.find({'createdAt': { '$gte': date }}, {'movie': 1, '_id': 0})
        cur_userratings = self.col_userratings.find({'createdAt': { '$gte': date }}, {'movie': 1, 'rating': 1, '_id': 0})
        list_movies = []
        list_comments = []
        list_countviews = []
        list_userratings = []
        for i in cur_movies:
            list_movies.append(i)
        for i in cur_comments:
            list_comments.append(i)
        for i in cur_countviews:
            list_countviews.append(i)
        for i in cur_userratings:
            list_userratings.append(i)

        movies = pd.DataFrame(list_movies)
        comments = pd.DataFrame(list_comments, columns=['movie'])
        countviews = pd.DataFrame(list_countviews, columns=['movie'])
        userratings = pd.DataFrame(list_userratings, columns=['movie', 'rating'])
        
        df = pd.merge(movies, comments,left_on='_id', right_on='movie', how='left').rename(columns={"movie": "comments"})
        df = df.groupby('_id').agg({'comments': 'count'}).reset_index()
        df = pd.merge(df, countviews, left_on='_id', right_on='movie', how='left').rename(columns={"movie": "countviews"})
        df = df.groupby('_id').agg({'comments': 'first',
                                    'countviews': 'count'}).reset_index()
        df = pd.merge(df, userratings, left_on='_id', right_on='movie', how='left').rename(columns={"movie": "numRates"})
        df = df.groupby('_id').agg({'comments': 'first',
                                    'countviews': 'first',
                                    'numRates': 'count',
                                    'rating': 'mean'
                                     }).reset_index()
        df.fillna(0, inplace=True)
        df['rates'] = df['numRates']*df['rating']
        df2 = df[['countviews','comments', 'rates']].apply(lambda x:(x.astype(float) - min(x))/(max(x)-min(x)), axis = 0)
        df2.fillna(0, inplace=True)
        
        df['score'] = df2['countviews'].pow(2) + df2['comments'].pow(2) +  df2['rates'].pow(2)
        df3 = df.sort_values(by = 'score', ascending=False).head(10)
        if(df3['score'].iloc[0] > 0):
            df3 = df3.drop(df3.columns[[1, 2, 3, 4, 5]], axis=1)
            df3 = df3.rename({'_id': 'movie'}, axis=1)
            df3['timestamp'] = dt.datetime.now(dt.timezone.utc)
            my_dict = df3.to_dict('records')
           
            self.my_col.insert_many(my_dict)
            return df3['movie'].astype('string').tolist()
        return []