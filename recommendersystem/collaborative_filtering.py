import numpy as np
import pandas as pd
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient


class CF:
    def __init__(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['movie-web']
        self.collection = db.userratings
    
    def standardize(self, col):
        new_col = (col - col.mean())
        return new_col

    def fit(self):
        cursor = self.collection.find({}, {"movie": 1, "user": 1, "rating": 1, "_id": 0})
        list_cur = []
        for i in cursor:
            list_cur.append(i)
        self.ratings = pd.DataFrame(list_cur)
        self.mu = self.ratings.pivot_table(index=['movie'],
                        columns=['user'], values='rating')
        
        self.mu = self.mu.apply(self.standardize, axis = 0)
        self.mu.fillna(0, inplace=True)
        self.sparse_df = sparse.csr_matrix(self.mu.values)
        self.corr = pd.DataFrame(cosine_similarity(self.sparse_df.T), 
                        index=self.mu.columns, 
                        columns=self.mu.columns)

    def pred(self, u, i):
        ids = np.where(self.ratings.iloc[:, 0] == i)[0]
        users_rated_i = self.ratings.iloc[ids, 1]
        sim = self.corr.loc[u, users_rated_i]
        sim = sim.sort_values().iloc[-2:]
        idx = sim.index
        r = self.sparse_df[self.mu.index.get_loc(i), self.mu.columns.get_indexer(idx)]
        return (r * sim)[0] / (np.abs(sim).sum() + 1e-8)

    def recommend_top(self, u, top_x):
        users = self.mu.columns.tolist()
        if u in users:
            ids = np.where(self.ratings.iloc[:, 1] == u)[0]
            items_rated_by_u = self.ratings.iloc[ids, 0].tolist()
            items = self.mu.index.tolist()
            item = {'movieId': None, 'score': None}
            list_items = []
            def take_similar(elem):
                    return elem['score']
            for i in items:
                if i not in items_rated_by_u:
                    rating = self.pred(u, i)
                    item['movieId'] = i
                    item['score'] = rating
                    list_items.append(item.copy())  
            sorted_items = sorted(list_items, key=take_similar, reverse=True)
            sorted_items = sorted_items[:top_x]
            result = []
            for i in sorted_items:
                result.append(str(i['movieId']))
            return result 
        return []