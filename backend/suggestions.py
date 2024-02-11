import ssl
import sys
ssl._create_default_https_context = ssl._create_unverified_context
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import json

# Access the first command-line argument (user_data)
user_data = sys.argv[1]

#pass task name
new_task_name = sys.argv[2]




def convert_to_desired_format(input_data):
    converted_data = []
    for entry in input_data:
        user_data = {
            "user": {
                "_id": {"$oid": entry["_id"]},
                "employeeName": entry["employeeName"],
                "employeeId": entry["employeeId"],
                "password": entry["password"],
                "tasks": [
                    {
                        "taskName": task["taskName"],
                        "taskSize": task["taskSize"] / 100,  # Convert taskSize to range between 0 and 1
                        "activeTask": bool(task.get("activeTask", False))  # Convert to boolean, default to False if key doesn't exist
                    }
                    for task in entry.get("tasks", [])  # Handle cases where "tasks" key might not exist
                ]
            }
        }
        converted_data.append(user_data)
    return converted_data

input_data = json.loads(user_data)
employeesData = convert_to_desired_format(input_data)

nltk.download('punkt')
nltk.download('stopwords')

# Extract data from the provided JSON format
employee_data = []
for employee in employeesData:
    employee_id = employee["user"]["_id"]["$oid"]
    employee_name = employee["user"]["employeeName"]
    employee_tasks = [(task["taskName"], task["taskSize"], task["activeTask"]) for task in employee["user"]["tasks"]]
    employee_data.append((employee_id, employee_name, employee_tasks))

# Create DataFrame from the extracted data
df = pd.DataFrame(employee_data, columns=["EmployeeID", "EmployeeName", "Tasks"])

# Tokenize and remove stopwords from all task names
stop_words = set(stopwords.words('english'))
df['TokenizedTaskNames'] = df['Tasks'].apply(
    lambda tasks: [' '.join([word.lower() for word in word_tokenize(task[0]) if word.isalnum() and word.lower() not in stop_words]) for task in tasks]
)

# # New Task to be compared
#new_task_name = "Review code changes"

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

# Calculate relative availability for each employee based on the tasks they are currently working on
df['RelativeAvailability'] = (
    df.apply(lambda row: sum([task[1] for task in row['Tasks'] if task[2]]) / sum([task[1] for task in row['Tasks']]) if sum([task[1] for task in row['Tasks']]) != 0 else 0, axis=1)
)

# Normalize the values for relative availability
df['RelativeAvailability'] = df['RelativeAvailability'].transform(lambda x: 1 - ((x - x.min()) / (x.max() - x.min())))

# Calculate alpha based on the given equation
df['Alpha'] = (0.7 * df['TaskRelevancy']) + (0.3 * df['RelativeAvailability'])

# Display the top 5 entries based on 'Alpha'
top_5_entries = df.nlargest(5, 'Alpha')
print(top_5_entries[['EmployeeName']])