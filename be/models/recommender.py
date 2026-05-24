import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

dataset = pd.read_csv("dataset/prodi_dataset.csv")

def get_recommendation(user_input):

    prodi_names = dataset['prodi']

    # Menghapus kolom prodi dan mengganti NaN menjadi 0
    features = dataset.drop(columns=['prodi']).fillna(0)

    # Mengganti nilai kosong pada input user
    user_input = [0 if x is None else x for x in user_input]

    similarity = cosine_similarity([user_input], features)

    similarity_scores = similarity[0]

    results = []

    for i in range(len(prodi_names)):
        results.append({
            "prodi": prodi_names[i],
            "score": round(similarity_scores[i] * 100, 2)
        })

    results = sorted(results, key=lambda x: x['score'], reverse=True)

    return results