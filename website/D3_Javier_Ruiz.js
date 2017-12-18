// Ask user for number of populations shown on map


var num1 = (function ask() {
    var x = prompt("Insert number (in digits) of towns shown on map", "");
    return isNaN(x) ? ask() : x;
}());

//Width and height of svg

var width = 960,
    height = 650;

// Map Position

var projection = d3.geo.albers()
    .center([0, 55.5])
    .rotate([4.4, 0])
    .scale(700 * 5)
    .translate([width / 2, height / 2]);

// Define path generator

var path = d3.geo.path()
    .projection(projection);

//Create SVG element in order to append map to the SVG

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


// Load UK map data

d3.json("uk.json", function(error, uk) {
    svg.selectAll(".subunit")
      .data(topojson.feature(uk, uk.objects.subunits).features)
      .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path);
});

//Load in UK data

d3.json("http://35.188.184.73/Circles/Towns/"+num1, function(data) {
    
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx",function(d) {
            return projection([d.lng, d.lat])[0];
        })
        .attr("cy", function(d) {
            return projection([d.lng,d.lat])[1];
        })
        .attr("r",7)
        .style("fill","red")
        .style("opacity",1)
        .style("stroke", "white")
        .attr("r", function(d) {
            return Math.sqrt(parseInt(d.Population) * 0.0004);
        })
       
        .on("mouseover", function(d) {
            var xPosition = d3.mouse(this)[0];
            var yPosition = d3.mouse(this)[1] - 30;
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text("Town"+": "+ d.Town +" | "+ "Population"+": " + d.Population);
            d3.select(this).raise
            d3.select("#tooltip").classed("hidden", false);
        })
        
        .on("mouseout", function(d) {
            d3.select("#tooltip").classed("hidden", true);
        });       
});
