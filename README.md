This project will leverage JavaScript, Leaflet, and SQLite to generate an interactive heat map displaying carbon and methane emissions for over 200 countries and build a relational SQLite database that could be expanded with additional datapoints over time. 

The base map will allow users to click on any of the countries included in the dataset and navigate to a page with data visualizations specific to that country's carbon and methane emissions metrics. This will include both the country's emissions measures as well as a global average for comparison. Visualizations will include a bubble chart, line graph, and gauge chart. These visualizations will contain emissions measures from 1990-2019 and will be dynamic.

Data for this project is sourced from The World Bank (https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?end=2019&start=1990). This data will need to be cleaned to isolate country measurements by removing metrics associte with regions/country groups. Once the data is cleaned and reformatted, it will be stored using SQLite and used to generate visualizations. 

We sourced coordinates for world countries at https://datahub.io/core/geo-countries#data to generate the desired map.


Further Considerations:
Additionally, rather than using global averages a marker for emissions comparison, benchmarks may need to be generated based on The World Bank's country classification system (https://blogs.worldbank.org/opendata/new-world-bank-country-classifications-income-level-2022-2023) to provide a more appropriate comparison.


Relevance and future applications of this project:
According to the IPCC's AR6 Synthesis Report (https://report.ipcc.ch/ar6syr/pdf/IPCC_AR6_SYR_SPM.pdf), anthropogenic climate change is primarily the result of greenhouse gas (GHG) emissions. 1.09°C higher in 2011–2020 than 1850–1900. They report with high confidence that global surface temperature has increased faster since 1970 than in any other 50-year period over at least the last 2000 years. Anthropogenic climate change has already led to pervasive adverse impacts and significant losses to nature and humans and ultimately represents a global existential risk.

This project seeks to provide interactive visualizations of two GHG emissions to deliver information relevant to understanding and illustrating key drivers of anthropogenic climate change. 

In the future, this project can be expanding to incorporate necessary cuts in these emissions required to avoid the most severe impacts of climate change. Additionally, these measures could be linked to required financing figures necessary to realizing these emissions reductions. 


