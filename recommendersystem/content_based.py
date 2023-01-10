import pandas as pd 
import numpy as np 
from sklearn.feature_extraction.text import TfidfVectorizer
from pymongo import MongoClient
from underthesea import word_tokenize
import pickle
from sklearn.decomposition import TruncatedSVD
from sklearn.linear_model import Ridge
from scipy import sparse
from sklearn.metrics.pairwise import linear_kernel


class CB:
    def __init__(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['movie-web']
        self.col_m = db.movies
        self.col_am = db.actormovies
        self.col_a = db.actors
        self.col_ur = db.userratings
        
    def get_items_rated_by_user(self, u):
        y = self.ratings.iloc[:,1]
        ids = np.where(y == u)[0]
        item_ids = self.ratings.iloc[ids, 0]
        scores = self.ratings.iloc[ids, 2]
        return (item_ids, scores)
    
    def fit(self):
        cur_m = self.col_m.find({}, {"title": 1, "desc": 1, "genre": 1})
        cur_am = self.col_am.find({}, {"movie": 1, "actor": 1, "character": 1, "_id": 0})
        cur_a = self.col_a.find({}, {"name": 1})
        cur_ur = self.col_ur.find({}, {"movie": 1, "user": 1, "rating": 1, "_id": 0})
        list_ur = []
        list_m = []
        list_am = []
        list_a = []
        for i in cur_ur:
            list_ur.append(i)
        self.ratings = pd.DataFrame(list_ur)
        
        for i in cur_m:
            list_m.append(i)
        for i in cur_am:
            list_am.append(i)
        for i in cur_a:
            list_a.append(i)
        m = pd.DataFrame(list_m)
        am= pd.DataFrame(list_am)
        a = pd.DataFrame(list_a)
        
        df = pd.merge(am, a, left_on='actor', right_on='_id', how='left').drop(columns = ['_id', 'actor'])
        df2 = pd.merge(m, df, left_on='_id', right_on='movie', how='left').drop(columns = ['movie'])
        df2 = df2.fillna('')
        df2 = df2.groupby('_id').agg({'title':'first', 
                              'desc':'first',
                              'genre':'first',
                              'character': ' '.join, 
                              'name': ' '.join,  }).reset_index()

        df2['tags'] = (df2['title'] + ' ' + df2['desc'] + ' ' + df2['genre'] + ' ' + df2['character'] 
                       + ' ' + df2['name'])
        
        self.tfidf = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.tfidf.fit_transform(df2['tags'])
#         df2['tags'] = df2.apply(lambda row: word_tokenize(row['tags'], format="text"), axis=1)
#         stop_words
        svd = TruncatedSVD(n_components=13)
        vectors = svd.fit_transform(self.tfidf_matrix)
        
        #recommend by movie
        self.cosine_sim = linear_kernel(vectors)
        
        #recommend by user
        d = vectors.shape[1] 
        self.users = self.ratings['user'].unique()
        self.movies = df2['_id'].unique()
        W = np.zeros((d, self.users.size))
        b = np.zeros((1, self.users.size))
        
        for n, u in enumerate(self.users):    
            ids, scores = self.get_items_rated_by_user(u)
            clf = Ridge(alpha = 1, fit_intercept  = True)
            idx = df2[df2['_id'].isin(ids)].index.tolist()
            Xhat = vectors[idx, :]
            clf.fit(Xhat, scores) 
            W[:, n] = clf.coef_
            b[0, n] = clf.intercept_

        self.Yhat = vectors.dot(W) + b
        
    def recommend_top(self, u, top):
        if u in self.users:
            item = {'movieId': None, 'score': None}
            list_items = []
            def take_score(elem):
                return elem['score']
            ids, score = self.get_items_rated_by_user(u)
            for n, m in enumerate(self.movies): 
                if m not in ids.tolist():
                    item['movieId'] = m
                    item['score'] = self.Yhat[n, np.where(self.users == u)[0][0]]
                    list_items.append(item.copy())  
            sorted_items = sorted(list_items, key=take_score, reverse=True)
            sorted_items = sorted_items[:top]
            result = []
            for i in sorted_items:
                result.append(str(i['movieId']))
            return result 
        return []
    
    def search(self, key):
        m_new = sparse.vstack((self.tfidf_matrix, self.tfidf.transform([key])))
        svd = TruncatedSVD(n_components=10)
        svd_tfidf_vector = svd.fit_transform(m_new)
        svd_query = np.reshape(svd_tfidf_vector[-1],(1,svd_tfidf_vector[-1].size))
        cosine_sim = linear_kernel(svd_query, svd_tfidf_vector)
        sim_scores = list(enumerate(cosine_sim[0]))
        sim_scores = sim_scores[:-1]
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        # sim_scores = sim_scores[0:5]
        sim_scores = [num for num in sim_scores if num[1] > 0]
        result = []
        for i in sim_scores:
            result.append(str(self.movies[i[0]]))
        return result
    
    def recommend_by_movie(self, m):
        if m in self.movies:
            sim = self.cosine_sim[np.where(self.movies == m)[0][0], :]
            sim_scores = list(enumerate(sim))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            sim_scores = sim_scores[1:10]
            result = []
            for i in sim_scores:
                result.append(str(self.movies[i[0]]))
            return result
        return []