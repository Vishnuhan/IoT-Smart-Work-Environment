import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Extended Sample Data with 10 more entries
data = {
    'EmployeeID': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    'TasksID': [
        [101, 102, 103], [104, 105, 106], [107, 108, 109],
        [110, 111, 112], [113, 114, 115], [116, 117, 118],
        [119, 120, 121], [122, 123, 124], [125, 126, 127],
        [128, 129, 130], [131, 132, 133], [134, 135, 136],
        [137, 138, 139], [140, 141, 142], [143, 144, 145]
    ],
    'TaskName': [
        ["Develop new feature", "Review code changes", "Test software"],
        ["Optimize database queries", "Write documentation", "Collaborate with team"],
        ["Design UI mockups", "Implement new feature changes", "Conduct user testing"],
        ["Data analysis", "Create presentation", "Attend team meeting"],
        ["Build prototype", "Code refactoring", "Peer code review"],
        ["Market research", "Prepare report", "Client meeting"],
        ["Bug fixing", "Update documentation", "Code deployment"],
        ["Algorithm optimization", "Write technical documentation", "Team coordination"],
        ["User interface design", "Feature testing", "Customer support"],
        ["Project planning", "Code integration", "Performance testing"],
        ["System architecture design", "Code optimization", "User feedback analysis"],
        ["Product demonstration", "Feature enhancement", "Usability testing"],
        ["Quality assurance", "Technical support", "Code maintenance"],
        ["API integration", "Code debugging", "Code review"],
        ["Security analysis", "Feature prioritization", "End-to-end testing"]
    ],
    'TaskWeights': [
        [0.8, 0.5, 0.7], [0.6, 0.4, 0.9], [0.2, 0.1, 0.1],
        [0.7, 0.6, 0.8], [0.5, 0.7, 0.6], [0.9, 0.8, 0.4],
        [0.6, 0.7, 0.5], [0.8, 0.4, 0.6], [0.7, 0.5, 0.8],
        [0.5, 0.6, 0.7], [0.8, 0.7, 0.9], [0.6, 0.8, 0.7],
        [0.7, 0.9, 0.6], [0.5, 0.6, 0.8], [0.9, 0.8, 0.7]
    ]
}

# Create a DataFrame
df = pd.DataFrame(data)

# New Task to be compared
new_task_name = "Review code quality and provide feedback"

# Tokenize and remove stopwords from all task names
stop_words = set(stopwords.words('english'))
df['TokenizedTaskNames'] = df['TaskName'].apply(
    lambda tasks: [' '.join([word.lower() for word in word_tokenize(task) if word.isalnum() and word.lower() not in stop_words]) for task in tasks]
)

# Tokenize and remove stopwords from the new task
tokenized_new_task = ' '.join([word.lower() for word in word_tokenize(new_task_name) if word.isalnum() and word.lower() not in stop_words])

# Calculate TF-IDF for all task names
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['TokenizedTaskNames'].apply(lambda x: ' '.join(x)))
tfidf_new_task = tfidf_vectorizer.transform([tokenized_new_task])

# Calculate cosine similarity between the new task and all existing tasks for each employee
cosine_similarities = cosine_similarity(tfidf_new_task, tfidf_matrix).flatten()

# Calculate task relevancy for each employee
df['TaskRelevancy'] = cosine_similarities

# Calculate relative availability for each employee
df['RelativeAvailability'] = (
    df['TaskWeights'].apply(lambda x: sum(x)) / len(df['TaskWeights'].iloc[0])
)  # Sum of task weights for each employee

# Normalize the values for relative availability
df['RelativeAvailability'] = df['RelativeAvailability'].transform(lambda x: 1 - ((x - x.min()) / (x.max() - x.min())))

# Calculate alpha based on the given equation
df['Alpha'] = (0.7 * df['TaskRelevancy']) + (0.3 * df['RelativeAvailability'])

# Display the top 5 entries based on 'Alpha'
top_5_entries = df.nlargest(5, 'Alpha')
print(top_5_entries[['EmployeeID', 'TasksID', 'TaskName', 'TaskRelevancy', 'RelativeAvailability', 'Alpha']])
