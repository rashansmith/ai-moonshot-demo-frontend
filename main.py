import json
from flask import Flask, jsonify, request
import pandas as pd
from dotenv import load_dotenv
import os
from pandasai import PandasAI
from pandasai.llm.openai import OpenAI
from json_image import image_to_json
import matplotlib
matplotlib.use('agg')

app = Flask(__name__)
sheets = pd.read_excel('Moonshot Tracker Results.xlsx', sheet_name=None)

load_dotenv()
API_KEY = os.environ['OPENAI_API_KEY']
llm = OpenAI(api_token=API_KEY)
pandas_ai = PandasAI(llm, save_charts=True)

@app.route('/', methods = ['POST'])
def send_promt():

    table_name, prompt = request.get_json()['table_name'], request.get_json()['prompt']
    if table_name not in sheets.keys():
        error_message = {
            "error": "Table does not exist!"
        }
        return json.dumps(error_message)

    df = sheets[table_name]
    output = pandas_ai.run(df, prompt=prompt)

    if output is None:
        with open('pandasai.log', 'r') as log_file:
            lines = log_file.readlines().copy()
            reverse_line = lines[::-1]
            for i in range(1, len(reverse_line)):
                if reverse_line[i].startswith('plt.savefig'):
                    line = reverse_line[i-1]
                    break
        path = line.strip().strip("'")

        return image_to_json(path)

    if isinstance(output, pd.DataFrame) or isinstance(output, pd.Series):
        return output.to_json()
    else:
        return json.dumps(output)
    
app.run()
