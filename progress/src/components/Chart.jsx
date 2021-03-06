import React, { Component } from "react";
import Chart from "chart.js";

export default class ProgressChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.dataSet,
      title: this.props.title,
      displayDates: this.props.displayDates,
      chartId:
        this.props.chartId !== undefined ? this.props.chartId : "myChart",
      loading: true,
    };
  }
  componentWillUnmount() {}
  componentDidMount() {
    const chart = document.getElementById(this.state.chartId);
    let maxOffset = 0;
    let minOffset = 999999999;
    for (let i = 0; i < this.state.data.datasets.length; i++) {
      const max = Math.max(...this.state.data.datasets[i].data);
      const min = Math.min(...this.state.data.datasets[i].data);
      if (max > maxOffset) maxOffset = max;
      if (min < minOffset) minOffset = min;
    }
    maxOffset *= 1.05;
    minOffset *= 0.8;
    new Chart(chart, {
      type: "line",
      data: this.state.data,
      options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: this.state.title,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: minOffset,
                suggestedMax: maxOffset,
                beginAtZero: false,
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: this.props.displayDates,
                max: 5,
                autoSkip: false,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <canvas id={this.state.chartId} width="600" height="300"></canvas>
      </React.Fragment>
    );
  }
}
