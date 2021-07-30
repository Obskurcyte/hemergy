import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    const {value} = props
        const data = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
            datasets: [
                {
                    label: "Return on contribution",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "rgba(60, 76, 207, 0.2)",
                    borderColor: "#3c4ccf",
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
                    data: [value, value*1.07, value*(1.07)**2, value*(1.07)**3, value*(1.07)**4, value*(1.07)**5, value*(1.07)**6, value*(1.07)**7, value*(1.07)**8, value*(1.07)**9, value*(1.07)**10, value*(1.07)**11, value*(1.07)**12, value*(1.07)**13, value*(1.07)**14, value*(1.07)**15, value*(1.07)**16, value*(1.07)**17, value*(1.07)**18, value*(1.07)**19]
                }
            ],
        };
        const option = {
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
                <Line width={props.width} height={props.height} data={data} options={option} />
            </React.Fragment>
        );
}

export default LineChart;