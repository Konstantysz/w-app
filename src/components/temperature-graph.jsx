import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart

let temperature_array = []

function timeConverter(UNIX_timestamp){
	return new Date(UNIX_timestamp*1000)
}

class TemperatureGraph extends React.Component {
	render() {
		var options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title:{
				text: "Temperature forecast"
			},
			axisY: {
				title: "Temperature",
				includeZero: false,
				suffix: "°C"
			},
			axisX: {
				title: "Time",
				valueFormatString: "DD MMM YYYY H:mm"
			},
			data: [{
				type: "line",
				toolTipContent: "{x} - {y}°C",
				dataPoints: temperature_array
			}]
		}

		return (
			<div className="temperature-graph">
					<CanvasJSChart 
						options = {options}
						onRef={ref => this.chart = ref}
					/>
			</div>
		);
	}

	componentDidMount(){
		var chart = this.chart;
		for (let i = 0; i < this.props.graphdata.length; i++)  {
			temperature_array.push({x: timeConverter(this.props.graphdata[i].dt), y: this.props.graphdata[i].main.temp})
		}
		chart.render()
	}

	componentDidUpdate() {
		var chart = this.chart;
		for (let i = 0; i < this.props.graphdata.length; i++)  {
			temperature_array[i] = {x: timeConverter(this.props.graphdata[i].dt), y: this.props.graphdata[i].main.temp}
		}
		chart.render()
	}
}
export default TemperatureGraph     