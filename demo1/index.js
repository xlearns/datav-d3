const config = {
  width: 400,
  height: 400,
  padding: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  },
  rect: {
    step: 35,
    width: 30,
    background: "blue",
  },
};

function buildRect(dom = "body", data = [], c = {}) {
  const _config = Object.assign({}, config, c);
  const svg = d3
    .select(dom)
    .append("svg")
    .attr("width", _config.width)
    .attr("height", _config.height);
  const _config_rect = _config.rect;
  svg
    .selectAll(".class_svg_rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", `class_svg_rect`)
    .attr("fill", _config_rect.background)
    .attr("x", (d, i) => {
      return _config.padding.left + i * _config_rect.step;
    })
    .attr("y", (d) => {
      return _config.height - _config.padding.bottom - d;
    })
    .attr("width", _config_rect.width)
    .attr("height", (d) => {
      return d;
    });
  svg
    .selectAll(".class_svg_text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", `class_svg_text`)
    .attr("fill", "white")
    .attr("font-size", "14px")
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
      return _config.padding.left + i * _config.rect.step;
    })
    .attr("y", function (d, i) {
      return _config.height - _config.padding.bottom - d;
    })
    .attr("dx", _config.rect.width / 2)
    .attr("dy", "1em")
    .text(function (d, i) {
      return d;
    });
  // 坐标系
  //用于坐标轴的线性比例尺
  var xScale = d3.scaleBand().domain([0, 10]).rangeRound([0, _config.width]);
  //定义坐标轴
  var axis = d3.axisBottom(x) //刻度方向向下

  //在svg中添加一个包含坐标轴各元素的g元素
  var gAxis = svg
    .append("g")
    .attr("transform", "translate(80,80)") //平移到(80,80)
    .attr("class", "axis");
  //在gAxis中绘制坐标轴
  axis(gAxis);
}
