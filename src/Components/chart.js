import React, {useEffect, useRef, useState} from 'react'
import dayjs from 'dayjs'
import * as d3 from 'd3'
import { Typography } from '@mui/material';
import { useL10N } from '../Contexts/l10n/use';

export const Chart = ({name, dataset, size}) => {
  const {actions: {t}} = useL10N();
  const [dimensions, setDimensions] = useState({width: 600, height: 300, marginLeft: 80, marginRight: 80, marginTop: 60, marginBottom: 10});
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    if (size)
    {
      const svgEl = d3.select(svgRef.current);
      svgEl.selectAll('*').remove(); // Clear SVG
      if (size === 'big')
        setDimensions({width: 400, height: 200, marginLeft: 60, marginRight: 60, marginTop: 30, marginBottom: 30, fontsize: '0.75rem'});
      else if (size === 'small')
        setDimensions({width: window.innerWidth - 80, height: 150, marginLeft: 40, marginRight: 20, marginTop: 30, marginBottom: 20, fontsize: '0.5rem'});
    }
  },[size])

  useEffect(() => {
    if (dimensions && dataset)
      DrawSvg();
  },[dimensions]);

  useEffect(() => {
    if (!dataset)
      return; 
    DrawSvg();
  },[dataset])

  const DrawSvg = () => {
    setSvgWidth(dimensions.width + dimensions.marginLeft + dimensions.marginRight);
    setSvgHeight(dimensions.height + dimensions.marginBottom + dimensions.marginTop);
    const lastTime = dayjs();
    const firstTime = lastTime.subtract(dataset.length, 'hour');
    const xScale = d3.scaleTime()
                     .domain([firstTime, lastTime])
                     .range([dimensions.marginLeft, dimensions.width]);
    const yScale = d3.scaleLinear()
                     .domain([parseFloat(d3.min(dataset) * 0.95), parseFloat(d3.max(dataset)) * 1.05])
                     .range([dimensions.height, 0]);

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear SVG
    const svg = svgEl.append("g")
                     .attr('transform', `translate(${dimensions.marginLeft},30)`);
    const xAxis = d3.axisBottom(xScale)
                    .ticks(8)
                    .tickSize(-dimensions.height);
    const xAxisGroup = svg.append("g")
                          .attr("transform", 'translate(0,' + dimensions.height + ')')
                          .call(xAxis);

    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("stroke", "#333");
    xAxisGroup.selectAll("text")
              .attr("opacity", 0.5)
              .attr("color", "#333")
              .attr("font-size", dimensions.fontsize);
    
    const yAxis = d3.axisLeft(yScale)
                    .ticks(8)
                    .tickSize(-dimensions.width)
                    .tickFormat((val) => `${val} $`);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("line").attr("stroke", "#333");
    yAxisGroup.selectAll("text")
              .attr("opacity", 0.5)
              .attr("color", "#333")
              .attr("font-size", dimensions.fontsize);
      
    // Draw the lines
    const line = d3.line()
                   .x((d) => xScale(d.time))
                   .y((d) => yScale(d.value));
    const linedata = [];
    var currentTime = firstTime;
    for(var i = 0; i < dataset.length; i++)
    {
      linedata.push({value: dataset[i], time: currentTime})
      currentTime = currentTime.add(1, 'hour');
    }

    svg.selectAll(".line")
      .data(linedata)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", 'rgba(50,180,50,0.5)')
      .attr("stroke-width", 3)
      .attr("d", line(linedata));
  }

  if (!dataset)
    return <span/>
  else
    return (
      <div style={classes.wrapper}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} style={{backgroundColor: '#rgb(244,244,244)'}} />
        <div style={classes.textwrapper}>
          <Typography 
            sx={classes.header}
          >
            {name}
          </Typography>
          <Typography
            sx={classes.text}
          >
            {t('chart.sparkline')}
          </Typography>
        </div>
      </div>
    )
}

const classes = {
  wrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  textwrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    fontSize: 'clamp(2vw, 4vw, 20px)',
    margin: 0
  },
  text: {
    fontSize: 'clamp(2vw, 2.5vw, 18px)',
    display: 'inline',
    margin: 0,
    marginLeft: '0.5rem',
    marginRight: '0.5rem'
  }
}