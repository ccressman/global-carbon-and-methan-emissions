#%%
#import dependencies
import pandas as pd

#read in GNI raw data, which will be merged with cleaned dataset for carbon emissions
raw_GNI = pd.read_excel('../Raw Data/Excel/GNI_by_country_worldbank.xls')
carbon_dataset = pd.read_excel('../Cleaned Datasets/Carbon_justcountries.xlsx')

print(type(raw_GNI))

#drop top two rows
# drop_GNI = raw_GNI.drop(['0','1'])
# print(drop_GNI)

#merge data
# merged_data = pd.merge(carbon_dataset,raw_GNI, how="left", on=["Country Code",raw_GNI[1]])
# print(merged_data)

