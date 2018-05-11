angular.module('rcBeam').service('chartService', function () {
    this.series = ['Design Stress', 'Characteristic stress'];
    this.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    this.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ],
            xAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: "t [Days]",
                    fontSize: 15
                },
                display: true,
                ticks: {
                    maxRotation: 0,
                    autoSkipPadding: 20,
                }
            }],
        },
        tooltips: {
            enabled: true,
        },
        legend: {
            display: true,
            position: 'top'
        },
        elements:
        {
            point: {
                radius: 0,
                hitRadius: 0,
                hoverRadius: 10,
            },
            line: {
                tension: 0,
            },
        },
        animation:
        {
            duration: 1000,
        }
    }
});