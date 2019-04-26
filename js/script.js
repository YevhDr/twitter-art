
/**
 * Created by yevheniia on 26.04.19.
 */
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.name; }))
    .force("charge", d3.forceManyBody().strength(20))
    .force("center", d3.forceCenter(width / 3, height / 3));

d3.json("data/nodes_links_network.json", function(error, graph) {
    if (error) throw error;

    graph.links.forEach(function(d){
        // d.source = d.source;
        // d.target = d.target;
    });

    var link = svg.append("g")
        .style("stroke", "#aaa")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 2)
        // .call(d3.drag()
        //     .on("start", dragstarted)
        //     .on("drag", dragged)
        //     .on("end", dragended))
        ;

    // var label = svg.append("g")
    //     .attr("class", "labels")
    //     .selectAll("text")
    //     .data(graph.nodes)
    //     .enter().append("text")
    //     .attr("class", "label")
    //     .text(function(d) { return d.name; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("r", 2)
            .style("fill", "black")
            // .style("stroke", "#969696")
            .style("stroke-width", "1px")
            .attr("cx", function (d) { return d.x+6; })
            .attr("cy", function(d) { return d.y-6; });

        // label
        //     .attr("x", function(d) { return d.x; })
        //     .attr("y", function (d) { return d.y; })
        //     .style("font-size", "20px").style("fill", "#4393c3");
    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    simulation.fix(d);
}

function dragged(d) {
    simulation.fix(d, d3.event.x, d3.event.y);
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    simulation.unfix(d);
}
