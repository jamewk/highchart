import { Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";

import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);


@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {
  form: FormGroup;
  Highcharts: typeof Highcharts = Highcharts;


  chartOptions: Options = {
    title: {
      text: 'Average Monthly Weather Data',
      align: 'left'
    },
    subtitle: {
        text: 'Source: abc.com',
        align: 'left'
    },
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}°C',

      },
      title: {
        text: 'Temperature',
      },
      opposite:true
    }, { // Secondary yAxis
      title: {
        text: 'Rainfall',
      },
      labels: {
        format: '{value} mm',
      },
      opposite:false
    }],
    tooltip: {
      shared: true
    },
    series: [{
      name: 'Rainfall',
      type: 'spline',
      yAxis: 1,
      data: [[1581345000000, 49.9], [1581431400000, 71.5], [1581517800000, 106.4], [1581604200000, 129.2], [1581690600000, 144.0], [1582036200000, 176.0], [1582122600000, 135.6], [1582209000000, 148.5], [1582295400000, 216.4], [1582554600000, 194.1], [1582641000000, 95.6], [1582727400000, 54.4]],
      tooltip: {
        valueSuffix: ' mm'
      }
  
    }, {
      name: 'Temperature',
      type: 'spline',
      data: [[1581345000000,7.0], [1581431400000,6.9], [1581517800000, 9.5], [1581604200000, 14.5], [1581690600000, 18.2], [1582036200000, 21.5], [1582122600000, 25.2], [1582209000000, 26.5], [1582295400000, 23.3], [1582554600000, 18.3], [1582641000000, 13.9], [1582727400000, 9.6]],
      tooltip: {
        valueSuffix: '°C'
      }
    }]
  };

  constructor(
    private formBuilder: FormBuilder
  ) { 
  }

  ngOnInit() {
    console.log(window);
  }
}
