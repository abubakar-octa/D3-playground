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
    // const canvas = d3.select('.canvas');
    // const svg = canvas.append('svg').attr('height', 600).attr('width', 600);
    // const group = svg.append('g').attr('transform', 'translate(0,100)');
    // append shapes to svg container
    // group
    //   .append('rect')
    //   .attr('height', 100)
    //   .attr('width', 200)
    //   .attr('fill', 'blue')
    //   .attr('x', 20)
    //   .attr('y', 20);
    // group
    //   .append('circle')
    //   .attr('r', 50)
    //   .attr('cx', 300)
    //   .attr('cy', 70)
    //   .attr('fill', 'pink');
    // group
    //   .append('line')
    //   .attr('x1', 370)
    //   .attr('x2', 400)
    //   .attr('y1', 20)
    //   .attr('y2', 120)
    //   .attr('stroke', 'red');
    // svg
    //   .append('text')
    //   .attr('x', 20)
    //   .attr('y', 200)
    //   .attr('fill', 'red')
    //   .text('Hello D3')
    //   .style('font-family', 'arial');

    // data driven svgs

    // d3 expects data in array format from our database
    const data = [
      { width: 200, height: 100, fill: 'purple' }, //each object represents on data point, like one object for one bar
      { width: 100, height: 50, fill: 'pink' }, //each object represents on data point, like one object for one bar
      { width: 50, height: 25, fill: 'red' }, //each object represents on data point, like one object for one bar
    ];

    const planets = [
      { radius: 50, distance: 110, fill: 'orange' },
      { radius: 70, distance: 260, fill: 'red' },
      { radius: 35, distance: 400, fill: 'brown' },
      { radius: 55, distance: 530, fill: 'green' },
    ];

    // first step: to get the reference of the svg
    const rectangle = d3.select('.rectangle');

    // step two: select a shape inside svg
    // here we are targetting the single svg we declare in DOM
    // usually D3 bind extra element in out case we have two with some vitual DOm elements which we called Enter Selection
    const rects = rectangle.selectAll('rect').data(data);

    // step three: apply attributes to this shape
    // here we are binding the only availble with data
    rects
      .attr('width', (data, index, array) => data.width)
      .attr('height', (data) => data.height)
      .attr('fill', (data) => data.fill);

    // here we are appending these extra to the originally availble svg and binding same attributes with this in short binding virtual nodes
    rects
      .enter()
      .append('rect')
      .attr('width', (data, index, array) => data.width)
      .attr('height', (data) => data.height)
      .attr('fill', (data) => data.fill);

    // for plannets data set
    const circle = d3.select('.circle');
    const circs = circle.selectAll('circle').data(planets);

    // add if there are any dom element inside svg
    circs
      .attr('cy', 200)
      .attr('cx', (planets) => planets.distance)
      .attr('r', (planets) => planets.radius)
      .attr('fill', (planets) => planets.fill);

    // append if there are no real only virtual elements availble
    circs
      .enter()
      .append('circle')
      .attr('cy', 200)
      .attr('cx', (planets) => planets.distance)
      .attr('r', (planets) => planets.radius)
      .attr('fill', (planets) => planets.fill);
  }
}
