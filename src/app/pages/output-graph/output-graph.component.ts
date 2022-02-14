import { Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";

import * as humidity from '../output-graph/humidity.json';
import * as temp from '../output-graph/temp.json';
import * as water_level from '../output-graph/water_level.json';

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {
  checks = {
    chk11: false,
    chk12: false,
    chk13: false,
    chk21: false,
    chk22: false,
    chk23: false,
  }
  form: FormGroup;
  Highcharts: typeof Highcharts = Highcharts;
  filter: boolean = false;

  expanded1 = false;
  expanded2 = false;

  chartOptions: Options = {
    chart: {
      events: {
        load: updateLegendLabel
      }
    },
    legend: {
      enabled: true
    },
    rangeSelector:{
      selected: 1
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

  private humidity = humidity;
  private temp = temp;
  private water_level = water_level;
  constructor(
    private formBuilder: FormBuilder
  ) { 
  }

  ngOnInit() {
    console.log(this.temp.data)
    this.createForm();

    this.setDataChart();

    this.form.controls['senser_1'].valueChanges.subscribe(
      (value) => {
        let sensers = [
          ...this.form.getRawValue().senser_1,
          ...this.form.getRawValue().senser_2
        ]
   
        if(sensers.length > this.form.getRawValue().max){

          // if(value.includes('Humidity')){
   
          //   setTimeout(() => {
          //     this.checks.chk11 = true;
          //   }, 100);
          // }else{
          //   setTimeout(() => {
          //     this.checks.chk11 = false;
          //   }, 100);
          // }
          
          // if(value.includes('Temperature')){
          //   setTimeout(() => {
          //     this.checks.chk11 = true;
          //   }, 100);
          // }else{
          //   setTimeout(() => {
          //     this.checks.chk11 = true;
          //   }, 100);
          // }

          alert("สำหรับ package ที่สูงกว่ากรุณาติดต่อ Admin เพื่อดำเนินการ");
          return;
        }

        this.setDataChart();
      }
    );

    this.form.controls['senser_2'].valueChanges.subscribe(
      (value) => {
        let sensers = [
          ...this.form.getRawValue().senser_1,
          ...this.form.getRawValue().senser_2
        ]
        if(sensers.length  > this.form.getRawValue().max){
          // if(value.includes('Humidity')){
   
          //   setTimeout(() => {
          //     this.checks.chk21 = false;
          //   }, 100);
          // }else if(value.includes('Temperature')){
          //   setTimeout(() => {
          //     this.checks.chk22 = false;
          //   }, 100);
          // }else{
          //   setTimeout(() => {
          //     this.checks.chk23 = false;
          //   }, 100);
          // }

          alert("สำหรับ package ที่สูงกว่ากรุณาติดต่อ Admin เพื่อดำเนินการ");
          return;
        }

        this.setDataChart();
      }
    );
  }

  createForm(){
    this.form = this.formBuilder.group({
      senser_1: [""],
      senser_2: [""],
      max: ["1"]
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


    let data = this.form.getRawValue().senser_1;

    if(data.length > 0){
      var index = data.indexOf(text);
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
  }

  setSenser2(text){

    let data = this.form.getRawValue().senser_2;

    if(data.length > 0){
      var index = data.indexOf(text);
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
          format: '{value}°C',
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
          data: this.temp['data'],
          tooltip: {
            valueSuffix: ' °C'
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
          data: this.humidity['data'],
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
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
      },
      series: {
          name: 'Warter level',
          type: 'spline',
          data: this.water_level['data'],
          tooltip: {
            valueSuffix: ' mm'
          },
          color: Highcharts.getOptions().colors[1]
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
        console.log(points.length)
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
