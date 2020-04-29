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
    const canvas = d3.select('.canvas');

    const svg = canvas.append('svg').attr('height', 600).attr('width', 600);

    const group = svg.append('g').attr('transform', 'translate(0,100)');
    // append shapes to svg container
    group
      .append('rect')
      .attr('height', 100)
      .attr('width', 200)
      .attr('fill', 'blue')
      .attr('x', 20)
      .attr('y', 20);
    group
      .append('circle')
      .attr('r', 50)
      .attr('cx', 300)
      .attr('cy', 70)
      .attr('fill', 'pink');

    group
      .append('line')
      .attr('x1', 370)
      .attr('x2', 400)
      .attr('y1', 20)
      .attr('y2', 120)
      .attr('stroke', 'red');

    svg
      .append('text')
      .attr('x', 20)
      .attr('y', 200)
      .attr('fill', 'red')
      .text('Hello D3')
      .style('font-family', 'arial');
  }
}
