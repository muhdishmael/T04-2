const createBarChart = (data) => {
// --- Sizes (logical vs. display) ---
const viewW = 800;
const viewH = Math.max(350, data.length * 35);
const labelX = 213;
// --- SVG root ---
const svg = d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", `0 0 ${viewW} ${viewH}`)
.style("width", "100%")
.style("max-width", `${viewW}px`)
.style("height", "auto")
.style("border", "1px solid #ccc");
// --- Scales (from T04-6) ---
const xMax = d3.max(data, d => d.count);
const xScale = d3.scaleLinear()
.domain([0, xMax])
.range([0, viewW - labelX - 152]);
const yScale = d3.scaleBand()
.domain(data.map(d => d.brand)) 
.range([0, viewH])
.paddingInner(0.2)
.paddingOuter(0.1);
// OLD rectangle-only drawing block from T04-6 (COMMENTED OUT for T04-7). //
/* svg.selectAll("rect")
.data(data)
.join("rect")
.attr("class", d => `bar bar-${d.count}`)
.attr("x", 0) .attr("y", d => yScale(d.brand))
.attr("width", d => xScale(d.count))
.attr("height", yScale.bandwidth())
.attr("fill", "steelblue");
*/
// --- NEW in T04-7: group per row (bar + labels move together) ---
// Align labels at x = 213 and start each bar at the same position.
const barAndLabel = svg
.selectAll("g")
.data(data)
.join("g")
.attr("transform", d => `translate(0, ${yScale(d.brand)})`);
// --- Bar rectangle inside the group ---
// y is 0 because the group sets vertical position via transform.
barAndLabel
.append("rect")
.attr("x", labelX)
.attr("y", 0)
.attr("width", d => xScale(d.count)) // scaled width fits the viewBox
.attr("height", yScale.bandwidth()) // bar thickness from band scale
.attr("fill", "steelblue");
// --- Category text (left of bar, right-aligned at the bar start) ---
barAndLabel
.append("text")
.text(d => d.brand) // change if your category column differs
.attr("x", labelX)
.attr("y", 15) // adjust to center in the band
.attr("text-anchor", "end") // right-align so text ends where the bar starts
.style("font-family", "sans-serif")
.style("font-size", "13px");
// --- Value text (at the end of each bar) ---
barAndLabel
.append("text")
.text(d => d.count) // numeric label
.attr("x", d => labelX + xScale(d.count) + 4) // just past bar end
.attr("y", 15) // align with the category label
.style("font-family", "sans-serif")
.style("font-size", "13px");
};