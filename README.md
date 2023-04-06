This project leverages Python, JavaScript, Leaflet, and SQLite to generate an interactive heat map displaying carbon and methane emissions for over 200 countries.

The base map created allows users to click on any of the countries included in the dataset to view a country's carbon and methane emissions metrics. A legend is included to communicate emissions levels. Coordinates used to generate the base map were sourced from: https://datahub.io/core/geo-countries#data.

Emissions data for this project was sourced from The World Bank (https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?end=2019&start=1990). This data was cleaned using Pandas to isolate country measurements by removing metrics associte with regions/country groups. Once the data was cleaned and reformatted, a SQLite database was build using Python to store the cleaned data. Flask was then utilized to build web and API routes. 

A combination of HTML, JavaScript, CSS, D3, and Leaflet were used to generate the final interactive dashboard housing the geographic heat map. Users are able to toggle between map views of carbon and methane emissions. The final result is pictured below:

![image](https://user-images.githubusercontent.com/119253324/230510975-8859a371-b7b1-45e4-a1f5-249bc1ecf976.png)

![image](https://user-images.githubusercontent.com/119253324/230511005-6ee493c6-2ab3-4f12-91f1-ac9191a8e047.png)



Relevance and future applications of this project:
According to the IPCC's AR6 Synthesis Report (https://report.ipcc.ch/ar6syr/pdf/IPCC_AR6_SYR_SPM.pdf), anthropogenic climate change is primarily the result of greenhouse gas (GHG) emissions. 1.09°C higher in 2011–2020 than 1850–1900. They report with high confidence that global surface temperature has increased faster since 1970 than in any other 50-year period over at least the last 2000 years. Anthropogenic climate change has already led to pervasive adverse impacts and significant losses to nature and humans and ultimately represents a global existential risk.

This project seeks to provide interactive visualizations of two GHG emissions to deliver information relevant to understanding and illustrating key drivers of anthropogenic climate change. 

Development pathways for this project could include the below:

1. Inclusion of additional variables, such as: 
    -Data measuring the emissions reductions required to prevent the most severe impacts of climate change

    -Financing required to realize emissions reductions goals

    -Data concerning localized climate impacts, which could effectively be compared to country emissions output

2. Additional Visualizations, such as:
    -Scatterplots, bar charts, etc. that could plot country data against global averages or calculated benchmarks  

3. Increased interactivity
    -The map's capabilities could be expanded to generate new pages as users click on countries included on the map. These pages could house visualizations illustrating the data specific to the country along with comparisons to global averages or other benchmarks. For example, comparisons could be generated based on groupings within The World Bank's country classification system (https://blogs.worldbank.org/opendata/new-world-bank-country-classifications-income-level-2022-2023).


