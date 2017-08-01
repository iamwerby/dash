$(function () {
    var chart;
    var chart2;
    var chart3;

    $(document).ready(function() {

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'containerHighcharts',
                type: 'line',
                marginRight: 0,
                marginBottom: 25,
                marginTop: 40,
                width: 670,
                height:210
            },
            title: {
                /*text: 'Monthly Average Temperature',
                x: -20, //center*/
                style: { "display": "none"}
            },
            xAxis: {
                categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
            },
            yAxis: {
                title: {
                    text: '',
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+ this.y ;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0,
                enabled: false
            },
            series: [{
                name: 'Total visitors:',
                data: [832, 421, 300, 520, 1233, 2119, 1444, 955]
            }]
        });

        chart2 = new Highcharts.Chart({
            chart: {
                renderTo: 'containerHighcharts2',
                type: 'line',
                marginRight: 0,
                marginBottom: 25,
                marginTop: 40,
                width: 670,
                height:210
            },
            title: {
                /*text: 'Monthly Average Temperature',
                x: -20, //center*/
                style: { "display": "none"}
            },
            xAxis: {
                categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
            },
            yAxis: {
                title: {
                    text: '',
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+ this.y ;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -20,
                y: 0,
                borderWidth: 1,
                enabled: true
            },
            series: [{
                name: 'Some order',
                data: [33, 521, 300, 520, 6433, 2119, 1444, 955]
            },
            {
                name: 'Some order2',
                data: [-2266, 421, 4, 520, 22, 2119, 1833, 955]
            },
            {
                name: 'Some order3',
                data: [13, 421, 300, 520, 1233, 355, 1444, 955]
            }]
        });

        chart3 = new Highcharts.Chart({
            chart: {
                renderTo: 'containerHighcharts3',
                type: 'line',
                marginRight: 0,
                marginBottom: 25,
                marginTop: 40,
                width: 670,
                height:210
            },
            title: {
                /*text: 'Monthly Average Temperature',
                x: -20, //center*/
                style: { "display": "none"}
            },
            xAxis: {
                categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
            },
            yAxis: {
                title: {
                    text: '',
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+ this.y + " people";
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -20,
                y: 0,
                borderWidth: 1,
                enabled: true
            },
            series: [{
                name: 'Ukraine',
                data: [33, 521, 300, 20, 633, 219, 44, 33]
            },
            {
                name: 'Russia',
                data: [266, 41, 4, 520, 22, 119, 33, 55]
            },
            {
                name: 'USA',
                data: [13, 4, 30, 50, 123, 35, 144, 95]
            }]
        });
    

    }); 
});