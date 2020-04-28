import React, { Component } from "react";
import {XYPlot, LineSeries,VerticalBarSeries,MarkSeries,XAxis,YAxis,VerticalGridLines,
	   HorizontalGridLines,AreaSeries
	   } from 'react-vis';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];

const data1=[
				  {
					x: 0,
					y: 0
				  },
				  {
					x: 1,
					y: -0.435834935598965
				  },
				  {
					x: 2,
					y: -0.782056848389705
				  },
				  {
					x: 3,
					y: -0.4994870445622165
				  },
				  {
					x: 4,
					y: -0.2888094067111856
				  },
				  {
					x: 5,
					y: -0.35619135078546704
				  },
				  {
					x: 6,
					y: -0.5129496785273511
				  },
				  {
					x: 7,
					y: -0.305263759899693
				  },
				  {
					x: 8,
					y: -0.26944888638844383
				  },
				  {
					x: 9,
					y: 0.08263050117004067
				  },
				  {
					x: 10,
					y: 0.4673780589805309
				  },
				  {
					x: 11,
					y: 0.8516918797538675
				  },
				  {
					x: 12,
					y: 0.43078963454553343
				  },
				  {
					x: 13,
					y: 0.7115046057879894
				  },
				  {
					x: 14,
					y: 1.0104609626866905
				  },
				  {
					x: 15,
					y: 0.7603549699194319
				  },
				  {
					x: 16,
					y: 0.895658900276565
				  },
				  {
					x: 17,
					y: 1.413836938565134
				  },
				  {
					x: 18,
					y: 1.916552685785359
				  },
				  {
					x: 19,
					y: 1.8567158396611565
				  },
				  {
					x: 20,
					y: 1.7941868911528478
				  }
				];


class ScatterPlotOnNearestXY extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;
    const data1 = data.map((d, i) => ({...d, color: i === index ? 1 : 0}));
	const data2 = data.map((d, i) => ({...d, color: 1}));
    return (
		<div>
			<XYPlot
			  height={200} width={200}
			  colorDomain={[0, 1]}
			  onMouseLeave={() => this.setState({index: null})}
			>
			  <VerticalGridLines />
			  <HorizontalGridLines />
			  <XAxis />
			  <YAxis />
				
			  <MarkSeries
				data={data2}
				stroke="white"
				onNearestXY={(datapoint, {index}) => this.setState({index})}
			  />
			</XYPlot>

			<XYPlot height={200} width={200}>
				<VerticalBarSeries data={data1} onNearestXY={(datapoint, {index}) => this.setState({index})}
				  />
			</XYPlot>
		</div>
	);
  }
}



class Chart3 extends Component {
  render() {
    return(
	  <div>
         	<XYPlot height={200} width={200}>
			  <VerticalBarSeries data={data} />
			</XYPlot>
		
			<XYPlot height={300} width= {300}>
			  <VerticalGridLines />
			  <HorizontalGridLines />
			  <XAxis />
			  <YAxis />
			  <VerticalBarSeries data={data} />
			</XYPlot>
		
			<XYPlot
			  height={200} width={200}
			  yDomain={[
				-3,
				3
			  ]}
			>
			  <AreaSeries
				data={data1}
				opacity={0.5}
				style={{}}
			  />
			  <VerticalGridLines />
			  <HorizontalGridLines />
			  <XAxis />
			  <YAxis />
		</XYPlot>
		<br/><br/>
		<ScatterPlotOnNearestXY/>

      </div>
	);
  }
}
export default Chart3;