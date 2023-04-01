// Creating the map object
var myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  //var geoData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/ACS-ED_2014-2018_Economic_Characteristics_FL.geojson";
  
  var geoData = "../../resources/countries_boundaries.geojson";

  var geojson;
  

  // Get the data with d3.
  d3.json(geoData).then(function(data) {
    console.log (data)

    // Create a new choropleth layer.
    geojson = L.choropleth(data, {
  
      // Define which property in the features to use.
      valueProperty: "DP03_16E",
  
      // Set the color scale.
      scale: ["#ffffb2", "#b10026"],
  
      // The number of breaks in the step range
      steps: 10,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a popup to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Estimated employed population with children age 6-17: " +
          feature.properties.DP03_16E + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.DP03_75E);
      }
    }).addTo(myMap);
  
    // Set up the legend.
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
  
      // Add the minimum and maximum.
      var legendInfo = "<h1>Global Carbon and Methane emissions<br /></h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding the legend to the map
    legend.addTo(myMap);
  
  });
  








// d3.json("../../resources/countries_boundaries.geojson").then((data)=>{
//     console.log(data);
// })




// const width = 960;
// const height = 480;


// const svg = d3.select("body")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

// const projection = d3.geoMercator()
//     .translate([width / 2, height / 2])
//     .scale(150);

// const path = d3.geoPath()
//     .projection(projection);

// // Load the GeoJSON file containing the world's country boundaries
// d3.json("https://unpkg.com/world-atlas@2.0.0-pre.11/countries-110m.json").then(world => {
//     const countries = topojson.feature(world, world.objects.countries).features;
// console.log(countries)
//     // Load your country data and preprocess it
//     // For example, you can load a CSV file using `d3.csv("your_data.csv").then(data => { /* preprocess data here */ })`
//     // For this example, we will generate random data
//     const countryData = generateRandomCountryData();

//     svg.selectAll("path")
//         .data(countries)
//         .enter()
//         .append("path")
//         .attr("d", path)
//         .attr("fill", d => getColorForCountry(d.id, countryData))
//         .attr("stroke", "#999")
//         .attr("stroke-width", 0.5);

// });

// function getColorForCountry(countryId, countryData) {
//     // Define a color scale based on your data range
//     const colorScale = d3.scaleQuantize()
//         .domain([0, 100]) // Adjust the domain based on your data
//         .range(d3.schemeBlues[9]);

//     const data = countryData[countryId];
//     return data ? colorScale(data) : "#ccc";
// }

// function generateRandomCountryData() {
//     const data = {};
//     for (let i = 1; i <= 180; i++) {
//         data[i] = Math.random() * 100;
//     }
//     return data;
// }

