console.log('loading cp');
$.fn.cp_bubble = function (o) {
        var s = $.extend (true,{
            design: {
                fillColor:'#009CCC',               
                unit: '%',
                scoreFontSize: '22',
                scoreFontFamily: 'Helvetica',
                scoreFontColor: '#666666',
                titleFontSize: '12',
                titleFontFamily: 'Helvetica',
                titleFontColor: '#666666',
                titlePosition: 'center',
                gap: '3',
                displayText: 'true'                
            },
            size: {
                radius: '40',
                width: '100',
                height: '100',
                lineWidth: '10'
            },
            data: {
                canvas_id:'c1',
                score: '90',
                max:'100',                
                subtitle: 'Awesome'
            }
        },o);

      var c = document.createElement('canvas');
      c.id = s.data.canvas_id;
      
      $(this).html(c.outerHTML);

      var canvas = document.getElementById(s.data.canvas_id);

      var context = canvas.getContext('2d');
      
      var score = s.data.score; //score is a value from 0 to 100
      var max = s.data.max;
      canvas.width = s.size.width;
      canvas.height = s.size.height;
      canvas.style.display = 'block';
      canvas.style.margin = 'auto';
      
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = s.size.radius;
       
      
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);            
      context.fillStyle = s.design.fillColor;
      context.fill();

      var o = radius-((radius*2 - (radius*2)*(s.data.score/s.data.max)));      
      var alpha = Math.asin(o/radius);
      console.log(alpha);
      if (alpha > 1.5) {alpha=1.5};
      if (alpha < -1.5) {alpha=-1.5};
      context.beginPath();
      context.arc(centerX, centerY, radius, 0-alpha, (1 * Math.PI)+alpha, true);            
      context.fillStyle = 'rgba(255,255,255,0.5)';
      context.fill();

      if (s.design.displayText == 'true') {
        context.font= s.design.scoreFontSize+'px '+s.design.scoreFontFamily;
        context.fillStyle = s.design.scoreFontColor;
        var measure_Y,measure_X, title_Y, title_X = 0;
        
        if (s.data.subtitle == null) {
          //center
          measure_Y = centerY+(s.design.scoreFontSize/2.5);
          measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
        } else {
          measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
          title_X = centerX-(context.measureText(s.data.subtitle).width/2);
          if (s.design.titlePosition == 'center') {
            measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);                              
            title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
          } else if (s.design.titlePosition == 'bottom') {
            measure_Y = centerY+(s.design.scoreFontSize/2.5);
            title_Y = centerY + radius*1 + s.design.gap*1;
          } else if (s.design.titlePosition == 'top') {
            measure_Y = centerY+(s.design.scoreFontSize/2.5);     
            title_Y = centerY - radius*1 - s.design.gap*1;
          } else {
            measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);                              
            title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
          }
        }
        context.fillText(score+s.design.unit,measure_X ,measure_Y);
        context.fillStyle = s.design.titleFontColor;

        context.font= s.design.titleFontSize+'px '+s.design.titleFontFamily;
        context.fillText(s.data.subtitle, centerX-(context.measureText(s.data.subtitle).width/2),title_Y);      
      }
    }
  $.fn.cp_circle = function (o) {
          var s = $.extend (true,{
              design: {
                  borderWidth:'1px',
                  borderColor:'#009CCC',
                  boderStyle:'none',
                  backgroundColor:'#009CCC',
                  fontColor:'#FFFFFF',
                  fontFamily: 'Segoe UI, Arial',
                  fontSize:'36',
                  offset:0,
                  subtitleFontSize:'12',
                  clickFunction:'',
                  icon:'',
                  iconPosition:'left',
                  iconPaddingLeft:'0',
                  iconPaddingRight:'0'
              },
              size: {
                  width:'120px',
                  height:'120px',
                  radius:'50',
                  borderRadius:'50'
              }, 
              data: {
                  value:'42',
                  subtitle:'is the asnwer'
              }
          }, o);

          return this.each (function(){
              var d = s.size.radius*2;
                          
              var c = $.parseHTML('<div>');
              $(c).css({display:'flex',
                        flexDirection: 'column',
                        width:d,
                        height:d,
                        margin:'auto',
                        borderRadius:s.size.borderRadius+'%',
                        borderWidth:s.design.borderWidth,
                        borderStyle:s.design.borderStyle,
                        color:s.design.fontColor,
                        textAlign:'center',
                        borderColor:s.design.borderColor,
                        backgroundColor:s.design.backgroundColor,
                        position:'relative'
                      });                        


              var t = $.parseHTML('<div>');
              $(t).css({position:'relative',
                        fontSize: s.design.fontSize,
                        margin:'auto',                      
                        fontFamily:s.design.fontFamily
                      });
              $(t).text(s.data.value);

              if (s.design.icon != '') {
                var i = $.parseHTML('<i>');
                $(i).addClass('fa');
                $(i).addClass(s.design.icon);              
                $(i).css({
                  paddingLeft: s.design.iconPaddingLeft,
                  paddingRight: s.design.iconPaddingRight
                });
                s.design.iconPosition=='left'?$(t).prepend(i):$(t).append(i);
              }

              if (s.design.clickFunction != '' && typeof(window[s.design.clickFunction])=='function') {
                $(t).on('click',window[s.design.clickFunction]);
                $(t).css('cursor','pointer');
              }

              $(c).append(t);

              if (s.data.subtitle != '') {            
                $(t).css('marginBottom',0);
                var st = $.parseHTML('<div>');
                $(st).css({position:'realtive',
                          fontSize:s.design.subtitleFontSize,
                          margin:'auto',
                          marginTop:0,
                          fontFamily:s.design.fontFamily
                        });
                $(st).text(s.data.subtitle);
                $(c).append(st);
              }

              $(this).html(c);
          });            
    }
$.fn.cp_donut = function (o) {
    var s = $.extend (true,{
        design: {
            fillColor:'#009CCC',
            remainingColor:'#E4E4E4', 
            circleFillColor:'rgba(255,255,255,0)',               
            unit: '%',
            scoreFontSize: '22',
            scoreFontFamily: 'Helvetica',
            scoreFontColor: '#666666',
            titleFontSize: '12',
            titleFontFamily: 'Helvetica',
            titleFontColor: '#666666',                
            gap: '3',
            displayText: 'true',
            clickFunction:'',
            lineStyle:'solid',
            dashWidth:2,
            dashGaps:2,
            animate:false,
            animateInterval:5,
        },
        size: {
            radius: '40',
            width: '100',
            height: '100',
            lineWidth: '10'
        },
        data: {
            canvas_id:'c1',
            score: '90',
            max:'100',                
            subtitle: 'Awesome'
        }
    },o);

  var c = document.createElement('canvas');
  c.id = s.data.canvas_id;
  
  $(this).html(c.outerHTML);

  var canvas = document.getElementById(s.data.canvas_id);

  if (s.design.clickFunction != '' && typeof(window[s.design.clickFunction])=='function') {
          console.log(s.design.clickFunction)
          canvas.addEventListener("click", window[s.design.clickFunction]);
          canvas.style.cursor = 'pointer';
  }

  var context = canvas.getContext('2d');
  var context2 = canvas.getContext('2d');
  var context3 = canvas.getContext('2d');
  
  var score = s.data.score; //score is a value from 0 to 100
  var max = s.data.max;
  canvas.width = s.size.width;
  canvas.height = s.size.height;
  
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = s.size.radius;
   
  
  context2.beginPath();
  context2.arc(centerX, centerY, radius, 1.5 * Math.PI, ((100*2*Math.PI)/100)+(1.5*Math.PI), false);
  
  context2.lineWidth = s.size.lineWidth;
  context2.strokeStyle = s.design.remainingColor;
  context2.stroke();
  
  if (s.design.animate == false) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 1.5 * Math.PI, ((score*2*Math.PI)/max)+(1.5*Math.PI), false);
    
    context.lineWidth = s.size.lineWidth;
    context.strokeStyle = s.design.fillColor;

    if (s.design.lineStyle == 'dashed') {
      context.translate(0.5,0.5);
      context.setLineDash([s.design.dashWidth,s.design.dashGaps]);
    }

    
    context.fillStyle = s.design.circleFillColor;
    context.fill();  
    context.stroke();
  } else {
      var minAngle = 0;
      var maxAngle = (score*2*Math.PI)/max;
      var currentAngle = minAngle;
      var drawingInterval = setInterval(function(){ 
          context.beginPath();
          context.arc(centerX, centerY, radius, 1.5 * Math.PI, currentAngle+(1.5*Math.PI), false);              
          context.lineWidth = s.size.lineWidth;
          context.strokeStyle = s.design.fillColor;

          if (s.design.lineStyle == 'dashed') {                
            context.setLineDash([s.design.dashWidth,s.design.dashGaps]);
          }

          context.stroke();
          currentAngle += 0.01;
          if (currentAngle >= maxAngle) {
            clearInterval(drawingInterval);            
          }
      }, s.design.animateInterval);
  }
  
  if (s.design.displayText == 'true') {
    context.font= s.design.scoreFontSize+'px '+s.design.scoreFontFamily;
    context.fillStyle = s.design.scoreFontColor;
    var measure_Y,measure_X, title_Y, title_X = 0;
    
    if (s.data.subtitle == null) {
      //center
      measure_Y = centerY+(s.design.scoreFontSize/2.5);
      measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
    } else {
      measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);        
      measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
      title_X = centerX-(context.measureText(s.data.subtitle).width/2);
      title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
    }
    context.fillText(score+s.design.unit,measure_X ,measure_Y);
    context.fillStyle = s.design.titleFontColor;
    context.font= s.design.titleFontSize+'px '+s.design.titleFontFamily;
    context.fillText(s.data.subtitle, centerX-(context.measureText(s.data.subtitle).width/2),title_Y);  
    
  }
}
$.fn.cp_donutd3 = function (o) {
    var s = $.extend (true,{
        design: {
            fillColor:'#009CCC',
            remainingColor:'#E4E4E4', 
            circleFillColor:'rgba(255,255,255,0)',               
            unit: '%',
            scoreFontSize: '22',
            scoreFontFamily: 'Helvetica',
            scoreFontColor: '#666666',
            titleFontSize: '12',
            titleFontFamily: 'Helvetica',
            titleFontColor: '#666666',                
            gap: '3',
            displayText: 'true',
            clickFunction:'',
            lineStyle:'solid',
            dashWidth:2,
            dashGaps:2,
            animate:false,
            animateInterval:5,
        },
        size: {
            radius: '40',
            width: '100',
            height: '100',
            lineWidth: '10'
        },
        data: {
            canvas_id:'c1',
            score: '90',
            max:'100',                
            subtitle: 'Awesome'
        }
    },o);

  var c = document.createElement('canvas');
  c.id = s.data.canvas_id;
  var canvas = document.getElementById(s.data.canvas_id);
  var context = canvas.getContext('2d');
  var colors = [s.design.fillColor, s.design.remainingColor];
var pie = d3.layout.pie();
var color_scale = d3.scale.category10();

var w = s.size.width;
var h = s.size.height;

var outerRadius = s.size.radius;
var innerRadius = outerRadius - s.size.lineWidth;

var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);


var svg = d3.select(this[0])
      .append("svg")
      .attr("width",w)
      .attr("height",h)
      .style("margin","auto")
      .style("display","block")

var arcs = svg.selectAll("g.arc")
      .data(pie([s.data.score, s.data.max-s.data.score]))
      .enter()
      .append("g")
      .attr("class",arc)
      .attr("transform","translate("+outerRadius+","+outerRadius+")");
  
  var centerX = s.size.width / 2;
  var centerY = s.size.height / 2;


  if (s.display.displayText == 'true') {
    var text = arcs.selectAll("text")
        .data([{"text":s.data.score + s.design.unit,"offset":0,"fontSize":s.design.scoreFontSize+'px',"fontFamily":s.design.scoreFontFamily,"color":s.design.scoreFontColor},
               {"text":s.data.subtitle,"offset":20,"fontSize":s.design.titleFontSize+'px',"fontFamily":s.design.titleFontFamily,"color":s.design.titleFontColor}])
        .enter()
        .append("text");

    var textLabels = text
                 .attr("y", function(d){return d.offset;})
                 .attr("text-anchor","middle")
                 .text( function (d) {return d.text;})
                 .attr("font-family", function(d) {return d.fontFamily;})
                 .attr("font-size", function(d) {return d.fontSize;})
                 .attr("fill", function(d) {return d.color;});

  }

arcs.append("path")
  .attr("fill", function(d,i) {
    return colors[i];
  })
  .attr("d",arc);
}

(function($) {
        $.fn.cp_gauge = function(options) {

            var settings = $.extend(true, {
                design: {
                    needleColor: "#000",
                    lowerBoxVisible: "true",
                    lowerBoxHeight: 25,
                    lowerBoxBackground: "#AAA",
                    lowerBoxTextcolor: "#FFF",
                    lowerBoxTextSize: 13,
                    upperBoxVisible: "true",
                    upperBoxText: "",
                    upperBoxTextColor: "#777",
                    upperBoxTextSize: 30,

                },

                size: {
                    rangeSize: 35,
                    minorTick: 10,
                },

                data: {
                    value: 0,
                    max: 100,
                    unit: '',
                    dataRange: [{
                        from: 0,
                        to: 100,
                        color: "#CCC"
                    }],

                    textBox: [{
                        lowerBoxText: "value is.."
                    }],

                }


            }, options);

            return this.each(function() {

                for (var i in settings.data.dataRange) {
                    if (settings.data.max < settings.data.dataRange[i].to) {
                        settings.data.max = settings.data.dataRange[i].to
                    }
                }



                var pi = 3.14159;
                var ratio = 180 / settings.data.max;
                var angle = ratio * settings.data.value

                //function provides the cordinate (x,y) 
                //currently distance(needle length or tick mark distance from center) is fixed, in future it has to change according to rangeSize
                //marker : value in the graph, for which cordinates are required
                // disatance : needle length or tick mark distance from center
                //initial : Initial cordinate (x or y )
                function getCordinates(marker, ratio, distance, initial) {
                    var angle = ratio * marker
                    var pi = 3.14159;

                    var ydistance = Math.sin(angle * (pi / 180)) * distance;
                    var xdistance = Math.cos(angle * (pi / 180)) * distance;
                    var y = initial - ydistance;
                    var x = initial - xdistance;
                    return [x, y];

                };

                //preparing svg for plotting tick marks
                var tickmark_element = '';
                for (var x = 0; x <= settings.data.max; x = x + settings.size.minorTick) {

                    var cordinate1 = getCordinates(x, ratio, 77, 100);
                    var cordinate2 = getCordinates(x, ratio, 85, 100);

                    var cordinate3 = getCordinates(x, ratio, 92, 100);

                    var element = '<line  x1="' + cordinate1[0] + '" y1="' + cordinate1[1] + '"  x2="' + cordinate2[0] + '" y2="' + cordinate2[1] + '" stroke-width="0.5" stroke="#2E2E2E"/>' +
                        '<text text-anchor="middle" x="' + cordinate3[0] + '"  y="' + cordinate3[1] + '"  style="font-size: 10px;" fill="#2E2E2E">' + x + settings.data.unit + '</text>';

                    tickmark_element = tickmark_element + element;

                }

                //get top needle pointer 
                var needle_tip = getCordinates(settings.data.value, ratio, 80, 100);

                //get lower base of needle pointer
                var y1distance = Math.sin((90 - angle) * (pi / 180)) * 3;
                var x1distance = Math.cos((90 - angle) * (pi / 180)) * 3;
                var x1value = 100 + x1distance;
                var y1value = 96 - y1distance;
                var x2value = 100 - x1distance;
                var y2value = 96 + y1distance;

                var gaugeWrapper = $(this);
                var gaugeContainer_element = $.parseHTML('<div style="width:100%;height:100%" class="gaugeContainer"> </div>');
                gaugeWrapper.append(gaugeContainer_element);
                var gaugeContainer = gaugeWrapper.find('.gaugeContainer');
                var scale = 180 / settings.data.max;

                //preparing svg for circles according to the data range
                var cirle_element;
                for (var i in settings.data.dataRange) {
                    var start_pos = -180 + settings.data.dataRange[i].from * scale;
                    var element = '<circle cx="100" cy="100" r="57" fill="none" stroke="' + settings.data.dataRange[i].color + '" stroke-width="' + settings.size.rangeSize + '" transform="rotate(' + start_pos + ',100,100)" stroke-dasharray="' + (settings.data.dataRange[i].to - settings.data.dataRange[i].from) * scale + ',2000" />';

                    cirle_element = cirle_element + element;
                }

                gaugeContainer.append(

                    $('<svg viewBOx="0 0 205 100">' +
                        '<circle cx="100" cy="100" r="57" fill="none" stroke="#ccc" stroke-width="' + settings.size.rangeSize + '" />' +
                        cirle_element +
                        //'<text text-anchor="middle" x="100" y="95" style="font-size: ' + settings.size.textSize + 'px;" fill="' + settings.design.textColor + '">' + settings.value + '</text>'+
                        '<circle cx="100" cy="96" r="4" fill-opacity="1" stroke-opacity="1" fill="' + settings.design.needleColor + '"></circle>' +
                        '<path  style="display: block; " d="M' + needle_tip[0] + '+' + needle_tip[1] + ' ' + x1value + ' ' + y1value + ' ' + x2value + ' ' + y2value + ' z" stroke-linecap="square" stroke-linejoin="round" fill-opacity="1" stroke-opacity="1" fill="' + settings.design.needleColor + '"></path>' + tickmark_element

                    ));

                if (settings.design.lowerBoxVisible == 'true') {
                    var html_element = $.parseHTML('<div style ="height:' + settings.design.lowerBoxHeight + 'px;background-color:' + settings.design.lowerBoxBackground + ';" class="lower_box"><div class="lower_box_inner" width="100%" height="100%"></div></div>');
                    gaugeContainer.append(html_element);

                    for (var i = 0; i < settings.data.textBox.length; i++) {

                        var lower_box_element = $.parseHTML('<div style ="line-height:' + settings.design.lowerBoxHeight + 'px;color:' + settings.design.lowerBoxTextcolor + ';font-size:' + settings.design.lowerBoxTextSize + 'px" class="lower_box_text">' + settings.data.textBox[i].lowerBoxText + ' </div>');
                        //$('.lower_box_inner').append(lower_box_element);
                        gaugeWrapper.find('.lower_box_inner').append(lower_box_element);
                    }

                }

                

                if (settings.design.upperBoxVisible == 'true') {
                    var upperValue = settings.design.upperBoxText;
                    if (settings.design.upperBoxText=="")
                        { upperValue = settings.data.value}
                    var upper_box_element = $.parseHTML('<div style="font-size:' + settings.design.upperBoxTextSize + 'px;font-weight:500;color:' + settings.design.upperBoxTextColor + ';text-align:center;font-family:Century Gothic;    padding-bottom: 8px;">'+upperValue+'</div>');
                    gaugeContainer.prepend(upper_box_element);




                }

            });

        }
    }(jQuery));
$.fn.cp_horizontal_bar = function(o) {
    var s = $.extend (true,{
        design: {
            fillColor: '#009CCC',
            remainingColor: '#E4E4E4',
            paddingBottom: '1px',
            showValues:'true',
            markerFontFamily: 'Segoe UI',
            markerFontSize: 14,
            markerFontColor: '#FFFFFF',
            markerPaddingLeft: '5px',
            markerUnit: '',
            markerValuesLocation:'middle',
            showAxisValues:'true',                
            axisFontFamily: 'Segoe UI',
            axisFontSize: '14',
            axisFontColor: '#666666',
            axisPaddingTop: '3px',
            axisRotation: '315deg'                
        }, 
        size: {
            barWidth:350,
            barHeight:20
        },
        data: {
            value:7,
            maxValue: 10,
            axisValue: 'Dec'
        }
    },o);

    return this.each (function() {
        var barContainer = document.createElement('div');            
        barContainer.style.cssText = "margin:auto;width:"+s.size.barWidth+"px;height:"+s.size.barHeight+"px;position:relative;padding-bottom:"+s.design.paddingRight;

        var fullBar = document.createElement('div');
        fullBar.style.height = s.size.barHeight+'px';
        fullBar.style.width = s.size.barWidth+'px';
        fullBar.style.position = 'absolute';
        fullBar.style.backgroundColor = s.design.remainingColor;

        var filledBar = document.createElement('div');
        var h = (s.size.barWidth*s.data.value)/s.data.maxValue;
        var o = s.size.barWidth - h;
        filledBar.style.width = h+'px';            
        filledBar.style.height = s.size.barHeight + 'px';
        filledBar.style.position = 'absolute';
        filledBar.style.backgroundColor = s.design.fillColor;
        barContainer.appendChild(fullBar);
        barContainer.appendChild(filledBar);        

        if (s.design.showValues == 'true') {
          var marker = document.createElement('div');
          var pos = 0;
          if ((s.design.markerValuesLocation == 'right') || (h < (s.design.markerFontSize*1)+5)) {
            console.log(h);
            pos = h +5;
          } else if (s.design.markerValuesLocation == 'middle') {
            pos = h/2;               
          } else {
            pos = h- s.design.markerFontSize- 5-(s.design.markerFontSize/2);
          }
          marker.style.left = pos + 'px';  
          marker.textContent = s.data.value + '' + s.design.markerUnit;            
          marker.style.position = 'absolute';
          marker.style.textAlign = 'center';
          marker.style.lineHeight = s.size.barHeight+'px';
          marker.style.fontFamily = s.design.markerFontFamily;
          marker.style.color = s.design.markerFontColor;
          marker.style.fontSize = s.design.markerFontSize;
          marker.style.paddingLeft = s.design.markerPaddingTop;
          barContainer.appendChild(marker);
        }    

        $(this).html(barContainer.outerHTML);

    });

}    
$.fn.cp_kpi_tile = function (o) {
    var s = $.extend (true,{
                design: {
                  titleFontSize:'14px',
                  kpiFontSize:'28px',
                  subtitleFontSize:'11px',
                  fontFamily:'Segoe UI,Hevetica',
                  tileBorder: '1px solid #666666'                    
                },
                size: {
                    titleHeight:'25%',
                    kpiHeight:'60%',
                    subtitleHeight:'15%',
                    kpiContainerWidht:'70%',
                    extraIndicatorsWidth:'30%'
                },
                data: {
                  kpi:{title:'FEED',
                       kpi:'6,478',
                       kpi_color:'#00FF00',
                       subtitle:'MMSCFD'
                  },
                  extra_indicators:[
                    {title:'',
                     icon:'',
                     indicator:'+5%',
                     indicator_color:'#00FF00'
                    },
                    {title:'',
                     icon:'',
                     indicator:'-1,500',
                     indicator_color:'#FF0000'
                    }]
                }
            },o);

        return this.each (function() {
          var c = $.parseHTML('<div>');
          $(c).css({
                "display":"flex",
                "flex-direction":"row",        
                "justify-content":"center",
                "align-items":"center", 
                "border":s.design.tileBorder
          });

          var k_c = $.parseHTML('<div>');
          $(k_c).css({
                "display":"flex",
                "flex-direction":"column",
                "justify-content":"center",
                "align-items":"center",
                "font-family":s.design.fontFamily,
                "width":s.size.kpiContainerWidht
          });          

          var k_c_t = $.parseHTML('<div>');
          $(k_c_t).css({"color":"#666666",
                        "font-size":s.design.titleFontSize
                    });
          $(k_c_t).text(s.data.kpi.title);

          var k_c_k = $.parseHTML('<div>');
          $(k_c_k).css({"color":s.data.kpi.kpi_color,
                        "font-size":s.design.kpiFontSize
                      });
          $(k_c_k).text(s.data.kpi.kpi);

          var k_c_st = $.parseHTML('<div>');
          $(k_c_st).css({"color":"#666666",
                         "font-size":s.design.subtitleFontSize});
          $(k_c_st).text(s.data.kpi.subtitle);

          $(k_c).append(k_c_t);
          $(k_c).append(k_c_k);
          $(k_c).append(k_c_st);

          /* now we work in the extra indicators */
          var k_e = $.parseHTML('<div>');
          $(k_e).css({
                "display":"flex",
                "flex-direction":"column",
                "justify-content":"center",
                "align-items":"center",
                "height":"50%",
                "width":s.size.extraIndicatorsWidth
          }); 

          $.each(s.data.extra_indicators, function(index){
              var e = $.parseHTML('<div>');
              $(e).text(s.data.extra_indicators[index].indicator);
              $(e).css({"color":s.data.extra_indicators[index].indicator_color,
                        "display":"flex",
                        "align-items":"center",
                        "justify-content":"center",
                        "height":"100%",
                        "width":"100%"
                        });
              $(k_e).append(e);              
          });

          /* finally we append both kpi and extra indicator containers */

          $(c).append(k_c);
          $(c).append(k_e);

          $(this).html($(c)[0].outerHTML);

        });
 }    
$.fn.cp_percentage_bar_h = function(o) {
        var s = $.extend (true,{
            design: {
                positiveColor: '#4DB6AC',
                negativeColor: '#E57373',
                remainingColor: '#FFF',
                paddingRight: '5px',
                showValues:'true',
                showDelta:'false',
                markerFontFamily: 'Segoe UI',
                markerFontSize: '10',
                markerFontColor: '#666666',
                markerUnit: '%',
                markerValuesLocation:'middle',
                markerBarColor:'#999999',               
                axisFontFamily: 'Segoe UI',
                axisFontSize: '10',
                axisFontColor: '#666666',
                deltaUnit: '',
                scaleBarPosition:'top',
                displayZeroline:'true',
                zerolineColor:'#C4C4C4'
            }, 
            size: {
                barWidth:65,
                barHeight:15,
                scaleHeight:5,
                zerolineHeight:28,
                zerolineWidth:2
            },
            data: {
                referenceValue:'',
                newValue:'',
                delta:'',
                value:35,
                maxValue: 100,
                minValue: -100
            }
        },o);



        return this.each (function() {

          if (s.data.newValue != '' && s.data.referenceValue != '') {
            s.data.delta = Math.round(((s.data.newValue - s.data.referenceValue)*10))/10;

            if (s.data.referenceValue == 0) {
              s.data.value = 0;
            } else {
              s.data.value = Math.floor((((s.data.newValue - s.data.referenceValue) * 100) / s.data.referenceValue));  
            }          

            if (s.data.value > 100) {
              s.data.maxValue = s.data.value;
              s.data.minValue = -100;
            } else if (s.data.value < -100) {
              s.data.maxValue = 100;
              s.data.minValue = -1*(s.data.value);            
            } else {
              s.data.maxValue = 100;
              s.data.minValue = -100;                        
            }
          }

          var container = $.parseHTML('<div>');
          $(container).css({"display":"flex",
                 "flex-direction":"column",
                 "width":2*s.size.barWidth
            });


          var b = $.parseHTML('<div>');
          $(b).css({"display":"flex",
                 "flex-direction":"row",
                 "height":s.size.scaleHeight,
                 "width":2*s.size.barWidth,
                 "margin-bottom":s.design.paddingRight
            });

          if(s.design.scaleBarPosition == 'top') {
            $(b).css({"margin-bottom":s.design.paddingRight});
          } else {
            $(b).css({"margin-top":s.design.paddingRight});
          }

          var btop = $.parseHTML('<div>');
          $(btop).css({"height":"100%",
                      "width":"50%",
                      "display":"flex",
                      "justify-content":"flex-start",
                      "border-left":"2px solid "+s.design.markerBarColor,                      
            });          

          var bbot = $.parseHTML('<div>');
          $(bbot).css({"height":"100%",
                    "width":"50%",
                    "display":"flex",
                    "justify-content":"flex-start",
                    "border-left":"2px solid "+s.design.markerBarColor,
                    "border-right":"2px solid "+s.design.markerBarColor,                    
                    "position":"relative"
            });          
          var zero_line = $.parseHTML('<div>');
          $(zero_line).css({"width":s.size.zerolineWidth,
                            "z-index":1,
                            "left":-2,
                            "height":s.size.zerolineHeight,
                            "background-color":s.design.zerolineColor,
                            "position":"absolute"
            });  

          if (s.design.scaleBarPosition == "top")  {
            $(btop).css({"border-bottom":"2px solid "+s.design.markerBarColor});
            $(bbot).css({"border-bottom":"2px solid "+s.design.markerBarColor});
            
          } else {
            $(btop).css({"border-top":"2px solid "+s.design.markerBarColor});
            $(bbot).css({"border-top":"2px solid "+s.design.markerBarColor});           
            $(zero_line).css({"top":-1*s.size.zerolineHeight-2+5});             
          }

          var scaleContainer = $.parseHTML('<div>');
          $(scaleContainer).css({"display":"flex",
                 "flex-direction":"row",
                 "width":2*s.size.barWidth,                 
                 "position":"relative",
                 "margin-bottom":"5px",
                 "height":"10px"
            });


          var scaleTop = $.parseHTML('<div>');
          $(scaleTop).text(s.data.maxValue+s.design.markerUnit);
          $(scaleTop).css({
              "position":"absolute",
              "left":2*s.size.barWidth-10,
              "font-size":s.design.markerFontSize+'px',
              "font-family":s.design.markerFontFamily,
              "text-align":"right",
              "height":"100%",
              "color":s.design.markerFontColor
          }); 


          var scaleMid = $.parseHTML('<div>');
          $(scaleMid).text("0");
          $(scaleMid).css({
              "position":"absolute",
              "left":s.size.barWidth-3,
              "font-size":s.design.markerFontSize+'px',
              "font-family":s.design.markerFontFamily,
              "text-align":"right",
              "height":"100%",
              "color":s.design.markerFontColor
          }); 

          var scaleBot = $.parseHTML('<div>');
          $(scaleBot).text(s.data.minValue+s.design.markerUnit);
          $(scaleBot).css({
              "position":"absolute",
              "left":-10,
              "font-size":s.design.markerFontSize+'px',
              "font-family":s.design.markerFontFamily,
              "text-align":"right",
              "height":"100%",
              "color":s.design.markerFontColor
          }); 

          $(scaleContainer).append(scaleTop);
          $(scaleContainer).append(scaleMid);
          $(scaleContainer).append(scaleBot)
          if (s.design.displayZeroline == 'true') {
            $(bbot).append(zero_line);
          }
          $(b).append(btop);
          $(b).append(bbot);
          
          /* percentage bar div */
          var p = $.parseHTML('<div>');
          $(p).css({"display":"flex",
                 "flex-direction":"row",
                 "height":s.size.barHeight,
                 "width":2*s.size.barWidth,
                 "margin-right":"10px"
            });        

          var positiveWidth = 0;
          var negativeWidth = 0;

          if (s.data.value >=0) {
            negativeWidth = 0;
            positiveWidth = (s.size.barWidth * s.data.value) / s.data.maxValue;
          } else {
            negativeWidth = (s.size.barWidth * s.data.value) / s.data.minValue;
            positiveWidth = 0;
          }
          console.log(positiveWidth);
          console.log(negativeWidth);

          var positiveBar = $.parseHTML('<div>');
          var negativeBar = $.parseHTML('<div>');

          $(positiveBar).css({"display":"flex","wdith":"50%","design":"flex","justify-content":"flex-start","background-color":s.design.remainingColor});
          $(negativeBar).css({"display":"flex","width":"50%","design":"flex","justify-content":"flex-end","background-color":s.design.remainingColor});

          var ptop = $.parseHTML('<div>');
          $(ptop).css({"width":positiveWidth,
                       "height":s.size.barHeight,
                       "background-color":s.design.positiveColor,
                       "position":"relative"
            });          

          var pbot = $.parseHTML('<div>');
          $(pbot).css({"width":negativeWidth,
                       "height":s.size.barHeight,
                       "background-color":s.design.negativeColor,
                       "position":"relative"
            });          

          var axisValue = $.parseHTML('<div>');
          if (s.design.showValues == 'true') {
            var barText = s.data.value + s.design.markerUnit;
            if (s.design.showDelta == 'true') {
              barText += ' ('+ (s.data.value>0?'+':'') + s.data.delta+s.design.deltaUnit+')';
            }
            $(axisValue).text(barText);
          }
          
          $(axisValue).css({              
              "font-size":s.design.axisFontSize+'px',
              "font-family":s.design.axisFontFamily,
              "color":s.design.axisFontColor,
              "height":"100%",
              "position":"absolute"           
          });

          $(negativeBar).append(pbot);
          $(positiveBar).append(ptop);
          

          $(p).append(negativeBar);
          $(p).append(positiveBar);
          

          var posititeOffset = 3;
          var negativeOffset = 33;
         
          if (s.data.value >=0) { 
            $(ptop).append(axisValue);
            $(axisValue).offset({"left":$(axisValue).position().left+(positiveWidth)+posititeOffset});
          } else {
            $(pbot).append(axisValue);
            $(axisValue).offset({"left":$(axisValue).position().left-negativeOffset})
          }

          if (s.design.scaleBarPosition == 'top') {
            $(container).append(scaleContainer);
            $(container).append(b);
            $(container).append(p);
          } else {
            $(container).append(p);
            $(container).append(b);            
            $(container).append(scaleContainer);
          }
          
          $(this).html($(container)[0].outerHTML);

      });
}
$.fn.cp_percentage_bar = function(o) {
        var s = $.extend (true,{
            design: {
                positiveColor: '#4DB6AC',
                negativeColor: '#E57373',
                remainingColor: '#FFF',
                paddingRight: '10',
                showValues:'true',
                showDelta:'false',
                markerFontFamily: 'Segoe UI',
                markerFontSize: '10',
                markerFontColor: '#666666',
                markerUnit: '%',
                markerValuesLocation:'middle',
                markerBarColor:'#666666',               
                axisFontFamily: 'Segoe UI',
                axisFontSize: '10',
                axisFontColor: '#666666',
                deltaUnit: '',
                scaleBarPosition:'right',
                displayZeroline:'true',
                zerolineColor:'#C4C4C4'
            }, 
            size: {
                barWidth:25,
                barHeight:65,
                scaleWidth:10,
                zerolineWidth:35,
                zerolineHeight:2
            },
            data: {
                referenceValue:'',
                newValue:'',
                delta:'',
                value:35,
                maxValue: 100,
                minValue: -100
            }
        },o);

        if (s.data.newValue != '' && s.data.referenceValue != '') {
          s.data.delta = Math.round(((s.data.newValue - s.data.referenceValue)*10))/10;

          if (s.data.referenceValue == 0) {
            s.data.value = 0;
          } else {
            s.data.value = Math.floor((((s.data.newValue - s.data.referenceValue) * 100) / s.data.referenceValue));  
            console.log('derived: ' + s.data.value);
          }          

          if (s.data.value > 100) {
            s.data.maxValue = s.data.value;
            s.data.minValue = -100;
          } else if (s.data.value < -100) {
            s.data.maxValue = 100;
            s.data.minValue = -1*(s.data.value);            
          } else {
            s.data.maxValue = 100;
            s.data.minValue = -100;                        
          }
        }

        return this.each (function() {
          var container = $.parseHTML('<div>');
          $(container).css({"display":"flex",
                 "flex-direction":"row",
                 "height":2*s.size.barHeight
            });


          var b = $.parseHTML('<div>');
          $(b).css({"display":"flex",
                 "flex-direction":"column",
                 "height":2*s.size.barHeight,
                 "width":s.size.scaleWidth,
                 "margin-right":s.design.paddingRight
            });

          var btop = $.parseHTML('<div>');
          $(btop).css({"height":"50%",
                      "width":"100%",
                      "display":"flex",
                      "justify-content":"flex-start",
                      "border-top":"2px solid "+s.design.markerBarColor
            });       

          var bbot = $.parseHTML('<div>');
          $(bbot).css({"height":"50%",
                    "width":"100%",
                    "display":"flex",
                    "justify-content":"flex-start",
                    "border-top":"2px solid "+s.design.markerBarColor,                    
                    "border-bottom":"2px solid "+s.design.markerBarColor,
                    "position":"relative"
            });          

          var zero_line = $.parseHTML('<div>');

          $(zero_line).css({"height": s.size.zerolineHeight,
                            "z-index":1,
                            "top":-2,
                            "width":s.size.zerolineWidth,
                            "background-color":s.design.zerolineColor,
                            "position":"absolute"
            });          


          if (s.design.scaleBarPosition == "right")  {
            $(btop).css({"border-left":"2px solid "+s.design.markerBarColor});
            $(bbot).css({"border-left":"2px solid "+s.design.markerBarColor});
            $(zero_line).css({"left":-1*s.size.zerolineWidth-2});            
          } else {
            $(btop).css({"border-right":"2px solid "+s.design.markerBarColor});
            $(bbot).css({"border-right":"2px solid "+s.design.markerBarColor});            
            $(zero_line).css({"left":"5"});
          }

          var scaleContainer = $.parseHTML('<div>');
          $(scaleContainer).css({"display":"flex",
                 "flex-direction":"column",
                 "height":2*s.size.barHeight,
                 "margin-right":"5px",
                 "position":"relative",
                 "width":"40px"
            });

          var scaleTop = $.parseHTML('<div>');
          $(scaleTop).text(s.data.maxValue+s.design.markerUnit);
          $(scaleTop).css({
              "position":"absolute",
              "top":0-(s.design.markerFontSize/2),
              "font-size":s.design.markerFontSize+'px',
              "font-family":s.design.markerFontFamily,
              "text-align":(s.design.scaleBarPosition == "right"?"left":"right"),
              "width":"100%",
              "color":s.design.markerFontColor
          }); 


          var scaleMid = $.parseHTML('<div>');
          $(scaleMid).text("0");
          $(scaleMid).css({
              "position":"absolute",
              "top":s.size.barHeight-(s.design.markerFontSize/2),
              "font-size":s.design.markerFontSize+'px',
              "font-family":s.design.markerFontFamily,
              "text-align":(s.design.scaleBarPosition == "right"?"left":"right"),
              "width":"100%",
              "color":s.design.markerFontColor
          }); 

          var scaleBot = $.parseHTML('<div>');
          $(scaleBot).text(s.data.minValue+s.design.markerUnit);
          $(scaleBot).css({
              "position":"absolute",
              "top":(2*s.size.barHeight)-(s.design.markerFontSize/2),
              "font-size":s.design.markerFontSize+'px',
              "font-family":s.design.markerFontFamily,
              "text-align":(s.design.scaleBarPosition == "right"?"left":"right"),
              "width":"100%",
              "color":s.design.markerFontColor
          }); 

          $(scaleContainer).append(scaleTop);
          $(scaleContainer).append(scaleMid);
          $(scaleContainer).append(scaleBot)
          if (s.design.displayZeroline == 'true') {
              $(bbot).append(zero_line);  
          }
          
          $(b).append(btop);
          $(b).append(bbot);
          
          /* percentage bar div */
          var p = $.parseHTML('<div>');
          $(p).css({"display":"flex",
                 "flex-direction":"column",
                 "height":2*s.size.barHeight,
                 "width":s.size.barWidth,
                 "margin-right":"10px"
            });        

          var positiveHeight = 0;
          var negativeHeight = 0;

          if (s.data.value >=0) {
            negativeHeight = 0;
            positiveHeight = (s.size.barHeight * s.data.value) / s.data.maxValue;
          } else {
            negativeHeight = (s.size.barHeight * s.data.value) / s.data.minValue;
            positiveHeight = 0;
          }
          console.log(positiveHeight);
          console.log(negativeHeight);

          var positiveBar = $.parseHTML('<div>');
          var negativeBar = $.parseHTML('<div>');

          $(positiveBar).css({"display":"flex","height":"50%","design":"flex","align-items":"flex-end","background-color":s.design.remainingColor});
          $(negativeBar).css({"display":"flex","height":"50%","design":"flex","align-items":"flex-start","background-color":s.design.remainingColor});

          var ptop = $.parseHTML('<div>');
          $(ptop).css({"height":positiveHeight,
                       "width":s.size.barWidth,
                       "background-color":s.design.positiveColor,
                       "position":"relative"
            });          

          var pbot = $.parseHTML('<div>');
          $(pbot).css({"height":negativeHeight,
                       "width":s.size.barWidth,
                       "background-color":s.design.negativeColor,
                       "position":"relative"
            });          

          var axisValue = $.parseHTML('<div>');
          if (s.design.showValues == 'true') {
            var barText = s.data.value + s.design.markerUnit;
            if (s.design.showDelta == 'true') {
              barText += ' ('+ (s.data.value>0?'+':'') + s.data.delta+s.design.deltaUnit+')';
            }
            $(axisValue).text(barText);
          }
          
          $(axisValue).css({              
              "font-size":s.design.axisFontSize+'px',
              "font-family":s.design.axisFontFamily,
              "text-align":"center",
              "color":s.design.axisFontColor,
              "width":"100%",
              "position":"absolute"           
          });

          $(positiveBar).append(ptop);
          $(negativeBar).append(pbot);

          $(p).append(positiveBar);
          $(p).append(negativeBar);

          var topOffset = (s.design.showDelta=='true'? (2*s.design.axisFontSize)+12 : (s.design.axisFontSize*1)+6);
         
          if (s.data.value >=0) { 
            $(ptop).append(axisValue);
            $(axisValue).offset({"top":$(axisValue).position().top-topOffset});
          } else {
            $(pbot).append(axisValue);
            $(axisValue).offset({"top":$(axisValue).position().top+negativeHeight})
          }

          if (s.design.scaleBarPosition == 'right') {
            $(container).append(p);
            $(container).append(b);
            $(container).append(scaleContainer);
          } else {
            $(container).append(scaleContainer);
            $(container).append(b);
            $(container).append(p);            
          }
          
          
          
          $(this).html($(container)[0].outerHTML);

        });
}
$.fn.cp_pyramid = function(o) {
  var s = $.extend (true,{
      design: {
          showOutline:'false',
          outlineColor: '#4DB6AC',
          outlineWidth:'2',          
          drawValueLines:'true'     
      }, 
      size: {
          base:300,
          height:180                            
      },
      data: {
          sections:[{color:'red',
                     label:{text:'Sections',
                            fontFamily:'Verdana',
                            fontSize:16,
                            fontColor:'#37474F'},
                     value:{text:70,
                            gap:20,
                            fontFamily:'Verdana',
                            fontSize:16,
                            fontColor:'#666'
                     }
                    },
                    {color:'green',
                     label:{text:'Departments',
                            fontFamily:'Verdana',
                            fontSize:14,
                            fontColor:'#37474F'},
                     value:{text:42,
                            gap:20,
                            fontFamily:'Verdana',
                            fontSize:16,
                            fontColor:'#666'
                     }
                    },
                    {color:'blue',
                     label:{text:'Divisions',
                            fontFamily:'Verdana',
                            fontSize:12,
                            fontColor:'#37474F'},
                     value:{text:20,
                            gap:20,
                            fontFamily:'Verdana',
                            fontSize:16,
                            fontColor:'#666'
                     }
                    },
                    {color:'red',
                     label:{text:'Groups',
                            fontFamily:'Verdana',
                            fontSize:10,
                            fontColor:'#37474F'},
                     value:{text:7,
                            gap:20,
                            fontFamily:'Verdana',
                            fontSize:16,
                            fontColor:'#666'
                     }
                    }]
      }
  },o);



  return this.each (function() {

    var d = {b:s.size.base, h:s.size.height, s:s.data.sections.length};
    

    var c = $.parseHTML('<canvas>');
    $(c)[0].width = d.b+100;
    $(c)[0].height = d.h;
    var ctx=$(c)[0].getContext("2d");

    /* draw full triangle */
    if (s.design.showOutline == 'true') {
      ctx.beginPath();
      ctx.moveTo(0,d.h);
      ctx.lineTo(d.b,d.h);
      ctx.lineTo(d.b/2,0);
      ctx.closePath();   
      ctx.lineWidth = s.design.outlineWidth;
      ctx.strokeStyle = s.design.outlineColor; 
      ctx.stroke();  
    }
    

    /* draw sections */


    var s_h = 0;
    var o_b = 0;
    var o_h = d.h;
    r = 0;
    for (var i=0;i<d.s;i++) {
      ctx.beginPath();
      ctx.moveTo(o_b,o_h);
      ctx.lineTo(d.b-r,d.h-s_h);
      var r_old = r;
      s_h += d.h/d.s;
      r = ((d.b)/2 * s_h) / d.h;
      ctx.lineTo(d.b-r,d.h-s_h);
      ctx.lineTo(r,d.h-s_h);
      ctx.closePath();
      ctx.fillStyle=s.data.sections[i].color;
      ctx.fill();
      /* label */
      if (typeof s.data.sections[i].label != 'undefined') {
        var l = $.extend(true,{text:'<missing text>',
                            fontFamily:'Arial',
                            fontSize:10,
                            fontColor:'black'},s.data.sections[i].label);

        ctx.fillStyle = l.fontColor;
        ctx.font = l.fontSize+'px ' + l.fontFamily;
        ctx.fillText(l.text,((d.b/2)-(ctx.measureText(l.text).width/2)),(d.h-s_h)+((d.h/d.s)/2)+(l.fontSize/2));
      } 
      /* value */
      if (typeof s.data.sections[i].value != 'undefined') {
        var v = $.extend(true,{text:'<missing value>',
                    gap:20,
                    fontFamily:'Arial',
                    fontSize:10,
                    fontColor:'black'},s.data.sections[i].value);        
        ctx.fillStyle = v.fontColor;
        ctx.font = v.fontSize+'px ' + v.fontFamily;
        ctx.fillText(v.text,d.b+v.gap,(d.h-s_h)+((d.h/d.s)/2)+(v.fontSize/2));
        if (s.design.drawValueLines == 'true') {
          ctx.beginPath();          
          ctx.moveTo(d.b-r_old,(d.h-s_h)+((d.h/d.s)/2)+3);
          ctx.lineTo(d.b+v.gap-5,(d.h-s_h)+((d.h/d.s)/2)+3);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#666';
          ctx.closePath();           
          ctx.stroke();
        }
      }

      o_b = r;
      o_h = d.h-s_h; 
    }

    /* we repeat this to draw the outlines on top of the shapes */    
    var s_h = 0;
    var o_b = 0;
    var o_h = d.h;
    r = 0;
    for (var i=0;i<d.s;i++) {
      ctx.beginPath();
      ctx.moveTo(o_b,o_h);
      ctx.lineTo(d.b-r,d.h-s_h);
      s_h += d.h/d.s;
      r = ((d.b)/2 * s_h) / d.h;
      ctx.lineTo(d.b-r,d.h-s_h);
      ctx.lineTo(r,d.h-s_h);
      ctx.closePath();
      if (typeof s.data.sections[i].outline != 'undefined') {
        ctx.lineWidth = s.data.sections[i].outline.width;
        if (s.data.sections[i].outline.style == 'dashed') {
          ctx.setLineDash([10]);
        }
        ctx.strokeStyle = s.data.sections[i].outline.color;      
        ctx.stroke();
      }
      o_b = r;
      o_h = d.h-s_h; 
    }

    $(this).append(c);

  });
  }
$.fn.cp_scale= function (o) {
  var s = $.extend (true,{
              design: {
                  borderStyle:'none'
              },
              size: {
                  length: 300,                    
                  height:35,
                  color_frame_gap:2
              },
              data: {
                  min:0,
                  max:5,
                  color_stops:['red','blue','white']            
              }
          },o);

      return this.each (function() {
        
      var scale_bar = $.parseHTML('<div>');
      $(scale_bar).css({border:s.design.borderStyle,
                        width:s.size.length,
                        height:s.size.height});

      var color_scale = d3.scale.linear()
          .domain([0,(s.size.length)/s.size.color_frame_gap/2,(s.size.length)/s.size.color_frame_gap])
          .range (s.data.color_stops);

      for (var i=0;i<s.size.length/s.size.color_frame_gap;i++) {
        var d = $.parseHTML('<div>');
        $(d).css({backgroundColor:color_scale(i),
                  display:"inline-block",
                  height:"100%",
                  width:s.size.color_frame_gap});
        $(scale_bar).append(d);
      }
      $(this).append(scale_bar);

  });    
}
$.fn.cp_scale_d3= function (o) {
  var s = $.extend (true,{
              design: {
                  borderStyle:'none'
              },
              size: {
                  length: 300,                    
                  height:35,
                  color_frame_gap:2
              },
              data: {
                  min:0,
                  max:5,
                  color_stops:['red','yellow','green']            
              }
          },o);
      
      var xScale = d3.scale.linear()
          .domain([s.data.min,s.data.max])
          .range([0,s.size.length]);

      var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");


      var color_scale = d3.scale.linear()
          .domain([0,(s.size.length)/s.size.color_frame_gap/2,(s.size.length)/s.size.color_frame_gap])
          .range (s.data.color_stops);

      var svg = d3.select(this[0])
        .append("svg")
        .attr("width",s.size.length)
        .attr("height",s.size.height)
        .style("margin","auto")
        .style("display","block");

      var steps = [];
      for (var i=0;i<s.size.length/s.size.color_frame_gap;i++) {
        steps[i]=i;
      }

      console.log(steps)

      svg.selectAll("rect")
         .data(steps)
         .enter()
         .append("rect")
         .attr({width:s.size.color_frame_gap,
                height:s.size.height,
                fill:function(d,i){return color_scale(i)},
                x:function(d,i){return d*s.size.color_frame_gap},
       });

      svg.append("g")
         .call(xAxis);
 
}
$.fn.cp_tile = function (o) {
        var s = $.extend (true,{
            design: {
                backgroundColor:'#FFFFFF00',
                titleFontSize: '22',
                titleFontFamily: 'Helvetica',
                titleFontColor: '#666666',
                titlePaddingTop: '5px',                
                subtitleFontSize: '12',
                subtitleFontFamily: 'Helvetica',
                subtitleFontColor: '#666666',
                borderStyle: '1px solid #EBEBEB',

            },
            size: {                
                width: '150',
                height: '150',
                titleHeightPer: '15',
                contentHeightPer: '70',
                subtitleHeightPer:'15'
            },
            data: {
                content_id:'t_c1',
                title: 'This is title',    
                subtitle: 'Awesome!'
            }
        },o);

        return this.each (function() {

          var c = document.createElement('div');
          c.style.width = s.size.width;
          c.style.height = s.size.height;
          c.style.backgroundColor = s.design.backgroundColor;
          c.style.border = s.design.borderStyle;

          var title = document.createElement('div');
          title.style.width = '100%'
          title.style.height = s.size.height * (s.size.titleHeightPer/100);
          title.style.fontSize = s.design.titleFontSize;
          title.style.color = s.design.titleFontColor;
          title.style.fontFamily = s.design.titleFontFamily;
          title.style.textAlign = 'center';
          title.style.lineHeight = title.style.height;
          title.style.paddingTop = s.design.titlePaddingTop;
          title.innerText = s.data.title;

          var content = document.createElement('div');
          content.style.width = '100%';
          content.style.height = s.size.height * (s.size.contentHeightPer/100);
          content.id = s.data.content_id;          
          content.style.position = 'relative';
          content.style.margin = 'auto';  

          var subtitle = document.createElement('div');
          subtitle.style.width = '100%';
          subtitle.style.height = s.size.height * (s.size.subtitleHeightPer/100);
          subtitle.style.fontSize = s.design.subtitleFontSize;
          subtitle.style.color = s.design.subtitleFontColor;
          subtitle.style.fontFamily = s.design.subtitleFontFamily;
          subtitle.style.textAlign = 'center';
          subtitle.style.lineHeight = subtitle.style.height;
          subtitle.innerText = s.data.subtitle;          

          c.appendChild(title);
          c.appendChild(content);
          c.appendChild(subtitle);

          $(this).html(c.outerHTML);
        });

    }
$.fn.cp_timeline = function (o) {
  var s = $.extend (true,{
              design: {
                  lineColor:'#009CCC',
                  markerColor: '#D4D4D4',                    
                  markerFontSize: '12',
                  highlighMarkerColor:'#3f3f3f',
                  eventsFontFamily:'Helvetica',
                  showMarkers: 'true',
                  showEvents: 'true',
                  showEventsCaption:'true',
                  showMarkerCaption: 'true',
                  highlightGaps:'true',
                  gapColor:'#E57373'
              },
              size: {
                  lenght: 400,                    
                  height:100,
                  paddingTop: 50,
                  markerPaddingTop: 30,
                  iconPaddingTop:0,
                  lineWidth: 2,                    
                  markerRadius:4
              },
              data: {
                  min:6,
                  max:18,
                  intervals:[{start:6.5,end:8.5,color:'#009CCC'}],
                  markers:[7,15],
                  events:[{value:6.5,
                           icon:'fa-angle-up',
                           caption:'in'
                           },
                           {value:15,
                           icon:'fa-angle-down',
                           caption:'out'
                           }],
                  dayDuration:24,
                  prefix:'tl_'              
              }
          },o);

      return this.each (function() {
      var adjusted, dayCrossOver;  
      var mintime = s.data.min;
      var maxtime = s.data.max;

      if (maxtime < mintime) {
        maxtime += s.data.dayDuration; /* TODO: make parameter */
        dayCrossOver = 1;
      }
      
      var line_width = s.size.lenght;        
      var box_height = s.size.height;


      var minute_width = line_width/(maxtime * 60  - mintime * 60);
      var uid = s.data.prefix + 'container';

      var c = document.createElement('div');
      c.id = uid;
      c.style.width = line_width+'px';
      c.style.height = box_height+'px';
      c.style.position = 'relative';
      c.style.margin = 'auto';
      

      var bl = document.createElement('div');
      bl.id = 'timeline';
      bl.style.width = line_width+'px';
      bl.style.height = s.size.lineWidth+'px';
      bl.style.backgroundColor = '#E0E4CC';
      bl.style.margin = 'auto';
      bl.style.position = 'absolute';
      bl.style.marginTop = s.size.paddingTop+'px';

      c.appendChild(bl);

      if (s.design.highlightGaps == 'true') {
        var firststarttime = s.data.intervals[0].start;
        var lastendtime= s.data.intervals[s.data.intervals.length-1].end;

        var l = document.createElement('div');
        var lw = (lastendtime * 60  - firststarttime * 60) * minute_width;
        l.style.width = lw+'px';
        l.style.height = s.size.lineWidth+'px';
        l.style.backgroundColor = s.design.gapColor;
        l.style.position = 'absolute';
        var ll = (firststarttime * 60 - mintime * 60) * minute_width;
        l.style.left = ll+'px'
        l.style.marginTop = s.size.paddingTop+'px';
        c.appendChild(l);          

      }
      
      dayCrossOver =0;
      for (interval in s.data.intervals) {
        
        var actualstarttime = s.data.intervals[interval].start;        
        var actualendtime= s.data.intervals[interval].end;
        if (dayCrossOver == 1) {
          actualendtime+=s.data.dayDuration;
          actualstarttime +=s.data.dayDuration;          
        }
        if (actualendtime < actualstarttime) {
          actualendtime+=s.data.dayDuration;
          dayCrossOver =1;
        }        
        var l = document.createElement('div');
        var lw = (actualendtime * 60  - actualstarttime * 60) * minute_width;
        l.style.width = lw+'px';
        l.style.height = s.size.lineWidth+'px';
        if (s.data.intervals[interval].hasOwnProperty('color')) {
          l.style.backgroundColor = s.data.intervals[interval].color;
        } else {
          l.style.backgroundColor = s.design.lineColor;  
        }
        
        l.style.position = 'absolute';
        var ll = (actualstarttime * 60 - mintime * 60) * minute_width;
        l.style.left = ll+'px'
        l.style.marginTop = s.size.paddingTop+'px';
        c.appendChild(l);
      
      }

      if (s.design.showMarkerCaption == 'true') {
        for (var i=mintime; i<=maxtime;i++) {
              var h = document.createElement('div');
              
              i>=s.data.dayDuration?adjusted = i-s.data.dayDuration:adjusted = i;           
              h.textContent = adjusted;     
              h.style.fontFamily = 'Open Sans';
              h.style.width = '12px';
              h.style.textAlign = 'center';
              h.style.fontSize = '10px'
              if ($.inArray(adjusted, s.data.markers)!= -1) {
                h.style.color = s.design.highlighMarkerColor;  
              } else {
                h.style.color = s.design.markerColor;
              }      
              h.style.position = 'absolute';
              var hl = ((i * 60  - mintime * 60) * minute_width) - 6;
              h.style.left = hl+'px';
              h.style.top = s.size.markerPaddingTop+'px';
          c.appendChild(h);
        }
      }
      
      if (s.design.showMarkers == 'true') {
        for (var j =0;j<s.data.markers.length;j++) {          
          var c1 = document.createElement('canvas');
          c1.id = s.data.prefix+j;
          c1.width = (s.size.markerRadius+s.size.lineWidth)*2;
          c1.height = (s.size.markerRadius+s.size.lineWidth)*2;
          c1.style.position = 'absolute';
          var fromTop = s.size.paddingTop-s.size.markerRadius-(s.size.lineWidth/2);
          c1.style.top = fromTop+'px';
          adjusted = s.data.markers[j];
          if (j>0) {
            if (s.data.markers[j] < s.data.markers[j-1]) {
              adjusted = s.data.markers[j]+s.data.dayDuration;
            }
          }          
          var c1l = (adjusted * 60 - mintime * 60) * minute_width - s.size.markerRadius-s.size.lineWidth;
          c1.style.left = c1l+'px';          
          c.appendChild(c1);        
        }
      }
      if (s.design.showEvents == 'true') {
        for (j=0;j<s.data.events.length;j++) {
          var e = document.createElement('div');
          e.style.width = '14px';
          e.style.height= '14px';
          adjusted = s.data.events[j].value;
          if (j>0) {
            if (s.data.events[j].value < s.data.events[j-1].value||dayCrossOver==1) {
              dayCrossOver = 1;
              adjusted = s.data.events[j].value+s.data.dayDuration;
            }
          }          
          var el = ((adjusted * 60 - mintime * 60) * minute_width)-7;
          e.style.left = el+'px';
          e.style.top = (s.size.paddingTop + (s.size.lineWidth/2) + s.size.iconPaddingTop) + 'px';
          e.style.textAlign = 'center';
          e.style.fontFamily= s.design.eventsFontFamily;
          e.style.position = 'absolute';
          e.innerHTML = '<i style="color:'+s.data.events[j].color+'" class="fa '+s.data.events[j].icon+'"></i><span style="font-size:10px">'+ (s.design.showEventsCaption=='true'?s.data.events[j].caption:'')+'<span>';
          c.appendChild(e);    
        }
      } 

      $(this).html(c.outerHTML);

      if (s.design.showMarkers == 'true') {
        for (var j =0;j<s.data.markers.length;j++) {
          var canvas = document.getElementById(s.data.prefix+j);
          var context = canvas.getContext('2d');
          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;
          var radius = s.size.markerRadius;

          context.beginPath();
          context.arc(centerX, centerY, radius, 0, 2* Math.PI);
          context.fillStyle = 'white';
          context.fill();
          context.lineWidth = s.size.lineWidth;
          context.strokeStyle = s.design.lineColor;
          context.stroke();
        }
      }
  });    
}
$.fn.cp_vertical_bar = function(o) {
        var s = $.extend (true,{
            design: {
                fillColor: '#009CCC',
                remainingColor: '#E4E4E4',
                paddingRight: '1px',
                showValues:'true',
                markerFontFamily: 'Segoe UI',
                markerFontSize: '14',
                markerFontColor: '#FFFFFF',
                markerPaddingTop: '5px',
                markerUnit: '',
                markerValuesLocation:'middle',
                showAxisValues:'true',                
                axisFontFamily: 'Segoe UI',
                axisFontSize: '14',
                axisFontColor: '#666666',
                axisPaddingTop: '3px',
                axisRotation: '315deg',
                extraCss: '' 
            }, 
            size: {
                barWidth:12,
                barHeight:50
            },
            data: {
                value:7,
                maxValue: 10,
                axisValue: 'Dec'
            }
        },o);

        return this.each (function() {
            var barContainer = document.createElement('div');            
            barContainer.style.cssText = "width:"+s.size.barWidth+"px;height:"+s.size.barHeight+"px;position:relative;padding-right:"+s.design.paddingRight;

            var fullBar = document.createElement('div');
            fullBar.style.height = s.size.barHeight+'px';
            fullBar.style.width = s.size.barWidth+'px';
            fullBar.style.position = 'absolute';
            fullBar.style.backgroundColor = s.design.remainingColor;

            var filledBar = document.createElement('div');
            var h = (s.size.barHeight*s.data.value)/s.data.maxValue;
            var o = s.size.barHeight - h;
            filledBar.style.height = h+'px';
            filledBar.style.top = o + 'px';
            filledBar.style.width = s.size.barWidth + 'px';
            filledBar.style.position = 'absolute';
            filledBar.style.backgroundColor = s.design.fillColor;
            for (p in s.design.extraCss) {
              filledBar.style[s.design.extraCss[p].key] = s.design.extraCss[p].value;
            }
            console.log(s.design.extraCss);
            barContainer.appendChild(fullBar);
            barContainer.appendChild(filledBar);

            if (s.design.showValues == 'true') {
              var marker = document.createElement('div');
              var pos = 0;
              if ((s.design.markerValuesLocation == 'above') || (h < (s.design.markerFontSize*1)+5)) {
                pos = o - s.design.markerFontSize-5-(s.design.markerFontSize/2);
              } else if (s.design.markerValuesLocation == 'middle') {
                pos = (s.size.barHeight-h)+(h/2)-5-(s.design.markerFontSize/2);                
              } else {
                pos = o;
              }
              marker.style.top = pos + 'px';  
              marker.textContent = s.data.value + '' + s.design.markerUnit;   
              marker.style.width = s.size.barWidth + 'px';           
              marker.style.position = 'absolute';
              marker.style.textAlign = 'center';
              marker.style.fontFamily = s.design.markerFontFamily;
              marker.style.color = s.design.markerFontColor;
              marker.style.fontSize = s.design.markerFontSize+'px';
              marker.style.paddingTop = s.design.markerPaddingTop;
              barContainer.appendChild(marker);
            }

            if (s.design.showAxisValues == 'true') {
              var axis = document.createElement('div');
              axis.style.top = s.size.barHeight + 'px';
              axis.textContent = s.data.axisValue;   
              axis.style.width = s.size.barWidth + 'px';           
              axis.style.position = 'absolute';
              axis.style.textAlign = 'center';
              axis.style.fontFamily = s.design.axisFontFamily;
              axis.style.color = s.design.axisFontColor;
              axis.style.fontSize = s.design.axisFontSize+'px';
              axis.style.paddingTop = s.design.axisPaddingTop;
              axis.style.transform = 'rotate('+s.design.axisRotation+')';
              barContainer.appendChild(axis);
            }

            $(this).html(barContainer.outerHTML);

        });

    }


$.fn.cp_vertical_bar_chart = function (o) {
    var s = $.extend (true,{
        design: {
            fillColor: '#009CCC',
            remainingColor: '#E4E4E4',
            paddingRight: '5px',
            showValues:'false',
            markerFontFamily: 'Segoe UI',
            markerFontSize: '14px',
            markerFontColor: '#FFFFFF',
            markerPaddingTop: '5px',
            markerUnit: '',
            markerValuesLocation: 'above',
            showAxisValues:'false',
            axisFontFamily: 'Segoe UI',
            axisFontSize: '14px',
            axisFontColor: '#666666',
            axisPaddingTop: '3px',
            axisRotation: '0deg',
            graphTitleTopPadding:'20px'
        }, 
        size: {
            barWidth:'12',
            barHeight:'50'
        },
        data: {
            values:[],
            graphTitle:''
        }            
    },o);


    return this.each (function() {
        var d = document.createElement('div');
        d.style.width = '100%';
        var t = document.createElement('table');
        t.style.width = '100%';
        var r = document.createElement('tr');
        d.appendChild(t);
        t.appendChild(r);            
        for (key in s.data.values) {
                var c = document.createElement('td');
                c.style.paddingRight = s.design.paddingRight;
                var e = $('<div>').cp_vertical_bar({design:{fillColor:s.design.fillColor,remainingColor:s.design.remainingColor,paddingRight:s.design.paddingRight,
                                                            showValues:s.design.showValues,markerFontFamily:s.design.markerFontFamily,markerFontSize:s.design.markerFontSize,
                                                            markerFontColor: s.design.markerFontColor,markerPaddingTop:s.design.markerPaddingTop,markerUnit:s.design.markerUnit,
                                                            markerValuesLocation:s.design.markerValuesLocation,showAxisValues:s.design.showAxisValues,axisFontFamily:s.design.axisFontFamily,
                                                            axisFontSize:s.design.axisFontSize,axisFontColor:s.design.axisFontColor,axisPaddingTop:s.design.axisPaddingTop,
                                                            axisRotation:s.design.axisRotation,extraCss:s.data.values[key].extraCss},
                                                    data:{value:s.data.values[key].value,maxValue:s.data.values[key].maxValue,axisValue:s.data.values[key].axisValue},
                                                    size:{barWidth:s.size.barWidth,barHeight:s.size.barHeight}});
                c.appendChild(e[0]);                 
                r.appendChild(c);
        }
        if (s.data.graphTitle != '') {
          var title = document.createElement('div');
          title.style.textAlign = 'center';
          title.style.fontFamily = s.design.axisFontFamily;  
          title.style.fontFamily = s.design.axisFontFamily;
          title.style.color = s.design.axisFontColor;
          title.style.fontSize = s.design.axisFontSize;
          title.style.paddingTop = s.design.graphTitleTopPadding;
          title.textContent = s.data.graphTitle;
          d.appendChild(title);
        }
    $(this).html(d.outerHTML);
        
    });
}