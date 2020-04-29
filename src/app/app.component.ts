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
      { name: 'veg soup', orders: 200 },
      { name: 'veg curry', orders: 600 },
      { name: 'veg pasta', orders: 300 },
      { name: 'veg surprise', orders: 900 },
    ];

    const rectangle = d3.select('.rectangle');

    const rects = rectangle.selectAll('rect').data(menu);

    rects
      .attr('width', 50)
      .attr('height', (menu) => menu.orders)
      .attr('fill', 'orange')
      .attr('x', (d, i) => i * 70);

    rects
      .enter()
      .append('rect')
      .attr('width', 50)
      .attr('height', (menu) => menu.orders)
      .attr('fill', 'orange')
      .attr('x', (d, i) => i * 70);
  }
}
