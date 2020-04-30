import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const menu = [
      { name: 'soup', orders: 200 },
      { name: 'curry', orders: 600 },
      { name: 'pasta', orders: 300 },
      { name: 'surprise meal', orders: 1000 },
      { name: 'burger', orders: 1500 },
    ];

    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', 600)
      .attr('height', 600);

    // create margins and dimensions
    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const graphWidth = 600 - margin.left - margin.right;
    const graphHeight = 600 - margin.top - margin.bottom;

    const graph = svg
      .append('g')
      .attr('width', graphWidth)
      .attr('height', graphHeight)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // axis groups
    // to invert x-axis to the bottom
    const xAxisGroup = graph
      .append('g')
      .attr('transform', `translate(0, ${graphHeight})`);
    const yAxisGroup = graph.append('g');

    // we use d3 scale to range our values in reasonable number of pixel height
    // domain is our original data scale while range is what which will be scaled on the web page
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(menu, (m) => m.orders)])
      .range([graphHeight, 0]);

    // dynamically find min,max values from the array
    const min = d3.min(menu, (m) => m.orders);
    const max = d3.max(menu, (m) => m.orders);
    // or we can use extent to get min and max in one go
    // this will give us an array with min[0] and max[1]
    const extent = d3.extent(menu, (m) => m.orders);

    const x = d3
      .scaleBand()
      .domain(menu.map((m) => m.name))
      .range([0, 500])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const rects = graph.selectAll('rect').data(menu);

    rects
      .attr('width', x.bandwidth)
      .attr('height', (menu) => graphHeight - y(menu.orders))
      .attr('fill', 'orange')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.orders));

    rects
      .enter()
      .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', (menu) => graphHeight - y(menu.orders))
      .attr('fill', 'orange')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.orders));

    // create and call the axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
  }
}
