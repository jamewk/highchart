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

  expanded1 = false;
  expanded2 = false;

  chartOptions: Options = {
    chart: {
      zoomType: 'x',
      events: {
        load: updateLegendLabel
      }
    },
    legend: {
      enabled: true
    },
    rangeSelector:{
      enabled:true,
    },
    title: {
      text: 'Average Monthly Weather Data',
      align: 'left'
    },
    subtitle: {
        text: 'Source: abc.com',
        align: 'left'
    },
    xAxis: {
      events: {
        afterSetExtremes: updateLegendLabel
      }
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

  

  showCheckboxes1() {
    var checkboxes = document.getElementById("checkboxes1");
    if (!this.expanded1) {
      checkboxes.style.display = "block";
      this.expanded1 = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded1 = false;
    }
  }

  showCheckboxes2() {
    var checkboxes = document.getElementById("checkboxes2");
    if (!this.expanded2) {
      checkboxes.style.display = "block";
      this.expanded2 = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded2 = false;
    }
  }

  setSenser1(text){
    console.log(text)

    let data = this.form.getRawValue().senser_1;

    if(data.length > 0){
      var index = data.indexOf(text);
      console.log(index)
      if (index !== -1) {
        data.splice(index, 1);
      }else{

        data = [
          ...data,
          ...[
            text
          ]
        ]
      }

    }else{
      data = [text]
    }

    this.form.get('senser_1').setValue(data);
    console.log(data)
  }

  setSenser2(text){
    console.log(text)

    let data = this.form.getRawValue().senser_2;

    if(data.length > 0){
      var index = data.indexOf(text);
      console.log(index)
      if (index !== -1) {
        data.splice(index, 1);
      }else{

        data = [
          ...data,
          ...[
            text
          ]
        ]
      }
    }else{
      data = [text]
    }

    this.form.get('senser_2').setValue(data);
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
          },
          color: Highcharts.getOptions().colors[2]
      }
    }

    let humidity = {
      yAxis: { 
        gridLineWidth: 0,
        title: {
            text: 'Humidity',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} %',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
      },
      series: {
          name: 'Humidity',
          type: 'spline',
          data: [[1581345000000, 20.9], [1581431400000, 71.5], [1581517800000, 106.4], [1581604200000, 129.2], [1581690600000, 144.0], [1582036200000, 176.0], [1582122600000, 135.6], [1582209000000, 148.5], [1582295400000, 216.4], [1582554600000, 194.1], [1582641000000, 95.6], [1582727400000, 54.4]],
          tooltip: {
            valueSuffix: ' %'
          },
          color: Highcharts.getOptions().colors[0]
      }
    }

    let water = {
      yAxis: { 
        gridLineWidth: 0,
        title: {
            text: 'Warter level',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
      },
      series: {
          name: 'Warter level',
          type: 'spline',
          data: [[1581345000000, 200.9], [1581431400000, 100.5], [1581517800000, 300.4], [1581604200000, 100.2], [1581690600000, 50.0], [1582036200000, 150.0], [1582122600000, 135.6], [1582209000000, 148.5], [1582295400000, 216.4], [1582554600000, 194.1], [1582641000000, 95.6], [1582727400000, 54.4]],
          tooltip: {
            valueSuffix: ' mm'
          },
          color: Highcharts.getOptions().colors[0]
      }
    }

    let yAxis = [];
    let series = [];
    console.log(data.senser_1);

    if(data.senser_1.length > 0){
      data.senser_1.map((item)=> {
        if(item == 'Humidity'){
          yAxis.push(
            {
              ...humidity.yAxis,
              opposite:false,
            }
          )
          series.push(
            {
              ...humidity.series,
            }
          )
        }else if(item == 'Temperature'){
  
          yAxis.push(
            {
              ...temperature.yAxis,
              opposite:false
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
              ...water.yAxis,
              opposite:false
            }
          )
          series.push(
            {
              ...water.series,
            }
          )
        }

      })
    }

    if(data.senser_2.length > 0){
      data.senser_2.map((item)=> {
        if(item == 'Humidity'){
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
        }else if(item == 'Temperature'){
  
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
              ...water.yAxis,
              opposite:true,
            }
          )
          series.push(
            {
              ...water.series,
            }
          )
        }

      })
    }
    series.map((item, index)=>{
      if(index+1 != series.length){
        series[index].yAxis = index +1;
      }
    })
    this.chartOptions.yAxis = yAxis;
    this.chartOptions.series = series;

    if(yAxis.length > 0){
      setTimeout(() => {
        this.filter = true;
      }, 100);
    }
  }
}

function updateLegendLabel() {
  var chrt = !this.chart ? this : this.chart;
  chrt.update({
    legend: {
      labelFormatter: function() {
        var lastVal = this.yData[this.yData.length - 1],
          chart = this.chart,
          xAxis = this.xAxis,
          points = this.points,
          avg = 0,
          counter = 0,
          min, max;

        points.forEach(function(point, inx) {
          if (!min || min > point.y) {
            min = point.y;
          }

          if (!max || max < point.y) {
            max = point.y;
          }

          counter++;
          avg += point.y;
        });
        counter--;
        avg /= counter;

        return this.name + '<br>' + 'Now: ' + lastVal + ' <br>' +
        '<span style="color: red">Min: ' + min + ' </span><br/>' +
        '<span style="color: red">Max: ' + max + ' </span><br/>' +
        '<span style="color: red">Average: ' + avg.toFixed(2);
      }
    }
  });
}
