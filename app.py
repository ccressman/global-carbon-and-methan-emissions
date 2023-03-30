#Import dependencies 
from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base


# Create engine to connect to PostgreSQL
engine = create_engine('postgresql://postgres:password@localhost/pokedex')#change location
Base = automap_base()
Base.prepare(engine, reflect=True)


#Flask setup
app = Flask(__name__)



#create homepage??
@app.route('/', methods=['GET'])
    def_home():
    return render_template('index.html')




if __name__ == "__main__":
    app.run(debug=True)
