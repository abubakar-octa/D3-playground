import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor() {}

  async ngOnInit() {
    //this data is not valid find some valid data set before
    const data = [
      { date: new Date('December 17, 1995 03:24:00'), distance: 200 },
      { date: new Date('January 18, 1996 03:24:00'), distance: 400 },
      { date: new Date('February 30, 1997 03:24:00'), distance: 500 },
      { date: new Date('March 20, 1998 03:24:00'), distance: 100 },
    ];

    // const data = [
    //   { date: new Date(1995), distance: 200 },
    //   { date: new Date(1996), distance: 400 },
    //   { date: new Date(1997), distance: 500 },
    //   { date: new Date(1998), distance: 100 },
    //   { date: new Date(1995), distance: 700 },
    // ];

    // data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const margin = { top: 40, right: 20, bottom: 50, left: 100 };
    const graphWidth = 560 - margin.left - margin.right;
    const graphHeight = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', graphWidth + margin.left + margin.right)
      .attr('height', graphHeight + margin.top + margin.bottom);

    const graph = svg
      .append('g')
      .attr('width', graphWidth)
      .attr('height', graphHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // scales
    const x = d3.scaleTime().range([0, graphWidth]);
    const y = d3.scaleLinear().range([graphHeight, 0]);

    // setting up domain and range of scales
    x.domain(d3.extent(data, (d) => new Date(d.date)));
    y.domain([0, d3.max(data, (d) => d.distance)]);

    //axes group
    const xAxisGroup = graph
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${graphHeight})`);

    const yAxisGroup = graph.append('g').attr('class', 'y-axis');

    // d3 line path generator
    const line = d3
      .line()
      .x(function (d) {
        return x(new Date(d.data));
      })
      .y(function (d) {
        return y(d.distance);
      });

    // line path element
    const path = graph.append('path');

    //update path data
    path
      .data([data])
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('d', line);

    // create axes
    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(6);

    // call axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
  }

  ngAfterViewInit() {}
}
