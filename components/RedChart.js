import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const RedChart = (props) => {
    const {value} = props

    const economy = value * 1000 * 0.76
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
                    data: [economy, economy * 2, economy * 3, economy * 4, economy * 5, economy * 6, economy * 7, economy * 8, economy * 9, economy * 10, economy * 11, economy * 12, economy * 13, economy * 14, economy * 15, economy * 16, economy * 17, economy * 18, economy * 19, economy * 20]
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

export default RedChart;