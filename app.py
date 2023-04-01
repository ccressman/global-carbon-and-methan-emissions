#Import dependencies 
from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
import pandas as pd


#Flask setup
app = Flask(__name__)


#create homepage / required root directory
@app.route('/', methods=['GET'])
def home_page(): 
    return render_template('index.html') #index.html saved in Templates folder. It renders html page, indicating a webpage route. 


#create api route (jsonify carbon data)
@app.route('/carbon_data', methods=['GET'])
def sql_carbon_data():
    engine = create_engine ('sqlite:///resources/ghg_emissions.sqlite')
    conn = engine.connect()
    df = pd.read_sql('''SELECT * FROM country_co2_emissions''', con=conn)
    sql_carbon_data = df.to_dict('records') #method to create list of dictionaries
    return jsonify(sql_carbon_data)


#create api route (jsonify methane data)
@app.route('/methane_data', methods=['GET'])
def sql_methane_data():
    engine = create_engine ('sqlite:///resources/ghg_emissions.sqlite')
    conn = engine.connect()
    df = pd.read_sql('''SELECT * FROM country_ch4_emissions''', con=conn)
    sql_methane_data = df.to_dict('records') #method to make list of dictionaries
    return jsonify(sql_methane_data)


if __name__ == "__main__":
    app.run(debug=True)
