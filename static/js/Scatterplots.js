// Set up the dimensions of the plot
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// Set the ranges of the scales
var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.2);
var y = d3.scale.linear().range([height, 0]);

// Set the domain of the scales
x.domain(data.map(function(d) { return d.Continent; }));
y.domain([0, d3.max(data, function(d) { return d.CH4; })]);


// Create the SVG element and set its dimensions
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data file and process it
d3.json("../../resources/methane_and_GNI.json", function(error, data) {
  if (error) throw error;

  // Filter the data to keep only the rows for 2019
  data = data.filter(function(d) { return d.Year == "2019"; });

  // Group the data by continent
  var nestedData = d3.nest()
    .key(function(d) { return d.Continent; })
    .entries(data);

  // Set the domains of the x and y scales
  x.domain(nestedData.map(function(d) { return d.key; }));
  y.domain(d3.extent(data, function(d) { return +d.CH4_Emissions; })).nice();

  // Add the x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  // Add the y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("CH4 emissions (kt of CO2 equivalent)");

  // Add the data points
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.Continent); })
      .attr("cy", function(d) { return y(+d.CH4_Emissions); })
      .style("fill", function(d) { return color(d.Continent); });

//   // Add the legend
//   var legend = svg.selectAll(".legend")
//       .data(color.domain())
//     .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d, i) {

// Add the legend
var legend = svg.selectAll(".legend")
.data(color.domain())
.enter().append("g")
.attr("class", "legend")
.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// Add the legend colored rectangles
legend.append("rect")
.attr("x", width - 18)
.attr("width", 18)
.attr("height", 18)
.style("fill", color);

// Add the legend text
legend.append("text")
.attr("x", width - 24)
.attr("y", 9)
.attr("dy", ".35em")
.style("text-anchor", "end")
.text(function(d) { return d; });})

// d3.json("../../resources/methane_and_GNI.json").then((data)=>{
// console.log(data['Country Name']);

// var trace1 = {
//     x: [data['Country Name']],
//     y: [1, 6, 3, 6, 1],
//     mode: 'markers',
//     type: 'scatter',
//     name: 'Team A',
//     text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
//     marker: { size: 12 }
//   };
  

  
//   var data = [ trace1];
  
//   var layout = {
//     xaxis: {
//       range: [ 0, 500 ]
//     },
//     yaxis: {
//       range: [0, 1000000]
//     },
//     title:'Data Labels Hover'
//   };
  
//   Plotly.newPlot('myDiv', data, layout);


// })