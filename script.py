import re
import sys
import pickle
import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer

# load the pickled model
with open('model_cat.pkl', 'rb') as f:
    model = pickle.load(f)

# Read the responses from standard input
data = json.load(sys.stdin)

# Preprocess the responses as needed
numeric_responses = data['numeric']
textual_responses = data['textual']
numeric_responses = list(map(int, numeric_responses))

# # Remove URLs using regular expressions
# textual_responses = re.sub(r"http\S+", "", textual_responses)

# # Remove special characters using regular expressions
# textual_responses = re.sub(r"[^a-zA-Z0-9]+", " ", textual_responses)

# # Tokenize the textual_responses into words
# words = nltk.word_tokenize(textual_responses)

# # Remove stop words using NLTK's English stop words list
# stop_words = set(stopwords.words("english"))
# words = [word for word in words if word.lower() not in stop_words]

# # Join the words back into a string
# textual_responses = " ".join(words)

# Initialize the TF-IDF Vectorizer with 32 features
tfidf = TfidfVectorizer(max_features=32)

# Fit and transform the textual data
result_tfidf = tfidf.fit_transform([textual_responses]).toarray()

# Append the textual questions answer to numerical questions answer
numeric_responses.extend(result_tfidf.tolist())

# extend the last list in the array to the existing list
numeric_responses.extend(numeric_responses.pop())

# make the prediction
personality_type = model.predict(numeric_responses)

# Print the user's personality type
print(int(personality_type))
