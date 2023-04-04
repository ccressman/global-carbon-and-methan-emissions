# %%
import pandas as pd
from sqlalchemy import create_engine



# %%
#Create engine using SQLAlchemy to set up db and create sqlite file (sqlite protocol then file path)
engine = create_engine ('sqlite:///../../resources/ghg_emissions.sqlite')

conn = engine.connect() #connect to db


# %%
#Read in cleaned METHANE emissions data and upload to database
methane_dataset = pd.read_csv('../../resources/methane_and_GNI.csv')
methane_dataset.to_sql('country_ch4_emissions', conn, if_exists='replace', index=False) 
methane_dataset.to_json('../../resources/country_ch4_emissions.json', 'records')

# %%
#read methane data back out of df to verify process complete
dataframe_check = pd.read_sql("SELECT * FROM country_ch4_emissions", conn)
print(dataframe_check)



#%%
#read in cleaned CARBON emissions data and upload to database
carbon_dataset = pd.read_csv('../../resources/carbon_and_GNI.csv')
carbon_dataset.to_sql('country_co2_emissions', conn, if_exists='replace', index=False)
carbon_dataset.to_json('../../resources/country_co2_emissions.json', 'records')


#%%
#read data back out of df to verify process complete
dataframe2_check = pd.read_sql("SELECT * FROM country_co2_emissions", conn)
print(dataframe2_check)


