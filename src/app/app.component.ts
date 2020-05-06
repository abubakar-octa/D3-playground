import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  eduResp: any = [];
  educations: any = [];
  countiesResp: any = [];
  counties: any = [];
  data: any = {};
  constructor() {}

  async ngOnInit() {
    this.eduResp = await fetch(
      'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
    );
    this.educations = await this.eduResp.json();
    this.countiesResp = await fetch(
      'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
    );
    this.counties = await this.countiesResp.json();
    this.data = await topojson.feature(
      this.counties,
      this.counties.objects.counties
    );
    debugger;

    const path = d3.geoPath();
    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', 1200)
      .attr('height', 600);
    // create margins and dimensions
    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const graphWidth = 600 - margin.left - margin.right;
    const graphHeight = 600 - margin.top - margin.bottom;

    // Define the div for the tooltip
    // var body = d3.select('body');
    // var tooltip = body
    //   .append('div')
    //   .attr('class', 'tooltip')
    //   .attr('id', 'tooltip')
    //   .style('opacity', 0);
    const tooltip = document.getElementById('tooltip');
    svg
      .append('g')
      .selectAll('path')
      .attr('class', 'county')
      .data(this.data.features)
      .enter()
      .append('path')
      .attr('fill', 'black')
      .attr('d', path)
      .on('mouseover', (d, i) => {
        const { coordinates } = d.geometry;
        const [x, y] = coordinates[0][0];

        // matching and then mapping equal fips of baclor data with the svg graph
        const education = this.educations.find((edu) => edu.fips === d.id);

        tooltip.classList.add('show');
        debugger;
        tooltip.style.left = x - 50 + 'px';
        tooltip.style.top = y - 50 + 'px';
        tooltip.setAttribute('data-education', education.bachelorsOrHigher);

        tooltip.innerHTML = `
          <p>${education.area_name} - ${education.state}</p>
          <p>${education.bachelorsOrHigher}</p>
        `;
      })
      .on('mouseout', () => {
        tooltip.classList.remove('show');
      });
    debugger;
  }

  ngAfterViewInit() {
    // const path = d3.geoPath();
    // const svg = d3
    //   .select('.canvas')
    //   .append('svg')
    //   .attr('width', 600)
    //   .attr('height', 600);
    // // create margins and dimensions
    // const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    // const graphWidth = 600 - margin.left - margin.right;
    // const graphHeight = 600 - margin.top - margin.bottom;
    // svg
    //   .append('g')
    //   .selectAll('path')
    //   .data(this.data.features.slice(0, 10))
    //   .enter()
    //   .append('path')
    //   .attr('fill', 'black')
    //   .attr('d', path);
    // debugger;
  }
}
