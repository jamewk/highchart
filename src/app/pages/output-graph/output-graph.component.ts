import { Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";


@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {
  form: FormGroup;
  Highcharts: typeof Highcharts = Highcharts;
  filter: boolean = false;

  chartOptions: Options = {
    title: {
      text: 'Average Monthly Weather Data',
      align: 'left'
    },
    subtitle: {
        text: 'Source: abc.com',
        align: 'left'
    },
    yAxis: [],
    tooltip: {
      shared: true
    },
    series: []
  };

  constructor(
    private formBuilder: FormBuilder
  ) { 
  }

  ngOnInit() {
    console.log(window);

    this.createForm();

    this.setDataChart();

    this.form.controls['senser_1'].valueChanges.subscribe(
      (value) => {
        this.setDataChart();
      }
    );

    this.form.controls['senser_2'].valueChanges.subscribe(
      (value) => {
        this.setDataChart();
      }
    );
  }

  createForm(){
    this.form = this.formBuilder.group({
      senser_1: [""],
      senser_2: [""],
    })
  }

  setDataChart(){
    this.filter = false;

    let data = this.form.getRawValue();
    let temperature = {
      yAxis: { 
        labels: {
          format: '{value}°F',
          style: {
              color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
      },
      series: {
          name: 'Temperature',
          type: 'spline',
          data: [[1581345000000,20], [1581431400000,200.9], [1581517800000, 30.5], [1581604200000, 40.5], [1581690600000, 18.2], [1582036200000, 21.5], [1582122600000, 25.2], [1582209000000, 26.5], [1582295400000, 100.3], [1582554600000, 18.3], [1582641000000, 13.9], [1582727400000, 9.6]],
          tooltip: {
            valueSuffix: ' °F'
          }
      }
    }

    let humidity = {
      yAxis: { 
        gridLineWidth: 0,
        title: {
            text: 'Main Power',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} volts',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
      },
      series: {
          name: 'Main Power',
          type: 'spline',
          data: [[1581345000000, 20.9], [1581431400000, 71.5], [1581517800000, 106.4], [1581604200000, 129.2], [1581690600000, 144.0], [1582036200000, 176.0], [1582122600000, 135.6], [1582209000000, 148.5], [1582295400000, 216.4], [1582554600000, 194.1], [1582641000000, 95.6], [1582727400000, 54.4]],
          tooltip: {
            valueSuffix: ' volts'
          }
      }
    }
    let yAxis = [];
    let series = [];
    if(data.senser_1){
 
      if(data.senser_1 == 'Humidity'){
        yAxis.push(
          {
            ...humidity.yAxis,
            opposite:false,
          }
        )
        series.push(
          {
            ...humidity.series,
            yAxis: 1,
          }
        )
      }else{

        yAxis.push(
          {
            ...temperature.yAxis,
            opposite:false
          }
        )
        series.push(
          {
            ...temperature.series,
            yAxis: 1,
          }
        )
      }
    }

    if(data.senser_2){
 
      if(data.senser_2 == 'Temperature'){
        yAxis.push(
          {
            ...temperature.yAxis,
            opposite:true,
          }
        )
        series.push(
          {
            ...temperature.series,
          }
        )
      }else{

        yAxis.push(
          {
            ...humidity.yAxis,
            opposite:true,
          }
        )
        series.push(
          {
            ...humidity.series,
          }
        )
      }
    }

    this.chartOptions.yAxis = yAxis;
    this.chartOptions.series = series;

    console.log(yAxis)
    console.log(series)

    if(yAxis.length > 1){
      setTimeout(() => {
        this.filter = true;
      }, 100);
    }
  }
}
