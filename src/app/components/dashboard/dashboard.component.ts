import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit {
    

  constructor() { }

  ngOnInit():any { }

    chartOption = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
      
        series: [
            {   name: '业务指标',
                type: 'gauge',
                detail: {show:false,formatter:'{value}%'},
                data: [{value: 50, name: ''}],
                radius : '100%',
                pointer :{
                  length : '100%',
                  width : 3
                },
                axisLine :{
                  lineStyle :{
                    width : 10
                  }
                },
                axisLabel :{
                  textStyle : {
                    fontSize : 10
                  }

                },
                splitLine:{
                  length : 10
                },

            }
        ]
    };

}
