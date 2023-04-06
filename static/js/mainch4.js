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
var geometriesData = "../../resources/country_geometries.json";
var emissionsData = "../../resources/country_ch4_emissions.json";


// Get the data with d3.
Promise.all([d3.json(geometriesData), d3.json(emissionsData)]).then(function([geoData, emissionsData]) {

   // Create a lookup object for the emissions data
   var emissionsLookup = {};
   emissionsData.forEach(function(country) {
     emissionsLookup[country["Country Code"]] = country["2000"];
   });
 
  // Join the emissions data to the GeoJSON data
  geoData.features.forEach(function(feature) {
    var countryCode = feature.properties.ISO_A3;
    feature.properties.ch4_emissions_2019 = emissionsLookup[countryCode];
  });

 
  // Create a new choropleth layer.
  L.geoJSON(geoData, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: getColor(feature.properties.ch4_emissions_2019),
        fillOpacity: 0.7,
        weight: 1.5
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.ADMIN + "</h3><hr><p>CH4 Emissions (2019): " + feature.properties.ch4_emissions_2019 + "</p>");
    }
  }).addTo(myMap);
});

// Define a function to set the color based on the CH4 emissions value
function getColor(d) {
  return d > 1000000 ? '#800026' :
         d > 500000  ? '#BD0026' :
         d > 200000  ? '#E31A1C' :
         d > 100000  ? '#FC4E2A' :
         d > 50000   ? '#FD8D3C' :
         d > 20000   ? '#FEB24C' :
         d > 10000   ? '#FED976' :
                       '#FFEDA0';
}

// Add a legend to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 10000, 20000, 50000, 100000, 200000, 1000000],
    labels = [
      "Extremely Low",
      "Very Low",
      "Low",
      "Low to Moderate",
      "Moderate",
      "Moderate to High",
      "High",
    ];

  // loop through our emission intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      labels[i] +
      ": " +
      '<span style="font-weight: bold;">' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+") +
      "</span>";
  }

  return div;
};
legend.addTo(myMap);

function getEmissionsLevelDescription(value) {
  if (value >= 1000000) return 'High';
  if (value >= 200000) return 'Moderate to High';
  if (value >= 100000) return 'Moderate';
  if (value >= 50000) return 'Low to Moderate';
  if (value >= 20000) return 'Low';
  if (value >= 10000) return 'Very Low';
  return 'Extremely Low';
}


// Bar chart

const barMargin = { top: 50, right: 30, bottom: 70, left: 60 },
    width = 500 - barMargin.left - barMargin.right,
    height = 400 - barMargin.top - barMargin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#bar")
    .append("svg")
    .attr("width", width + barMargin.left + barMargin.right)
    .attr("height", height + barMargin.top + barMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

// Bar chart code
d3.csv("/resources/methane_emissions_by_country.csv").then(
    function (barData) {
    var regionData = Array.from(d3.rollup(barData, v => d3.sum(v, d => d["2019"]), d => d["Region"]));
    console.log(regionData)

    // X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(regionData.map(function(d) { return d[0]; }))
        .padding(0.5);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(regionData, function(d) {return +d[1]+10; })])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    let barGroup = svg.append("g")
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')

    barGroup.selectAll(".myBar")
        .data(regionData)
        .enter()
        .append("rect")
        .attr('class', 'myBar')
        .attr("x", function(d) { return x(d[0])})
        .attr("y", function(d) { return y(d[1])})
        .attr("width", x.bandwidth())
        .attr("height", function(d) {return height - y(d[1]); })
        .attr("fill", "#d45087")

    // labels
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", (width/2)+30)
        .attr("y", height + barMargin.top)
        .text("Region");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", - barMargin.left + 20)
        .attr("x", - (height/2)+70)
        .text("Methane Emissions");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (barMargin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .style("font-weight", "500")
        .style("text-transform", "none") 
        .text("By Region");

})
