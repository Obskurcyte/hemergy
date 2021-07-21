import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class RedChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const data = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
                {
                    label: "Reduced Carbon",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "#FCE9EC",
                    borderColor: "#D54D5F",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#3c4ccf",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#3c4ccf",
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
                }
            ],
        };
        var option = {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 20,
                        stepSize: 10,
                    },
                    scaleLabel: {
                        display: true,
                        label: 'Earnings'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        label: 'Years'
                    }}]
            }
        }
        return (
            <React.Fragment>
                <Line width={600} height={245} data={data} options={option} />
            </React.Fragment>
        );
    }
}

export default RedChart;