import React, { Component } from "react";
import { VictoryPie,VictoryChart,VictoryAxis,VictoryBar,VictoryTheme,VictoryScatter } from "victory";
class Char2 extends Component {
  render() {
    return(
		<div>
			<Chart/>
			<Animate/>
			<Scatter/>
		</div>
	);
  }
}




var cnt=1;
class Animate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
	let size=5;
	let res=[]; 
	for(var i=1;i<=size;i++){
		res.push({x:i,y:cnt});
		cnt++;
		cnt%=12;
	}
    return res;
  }

  render() {
    return (
      <VictoryChart
        domainPadding={{ x: 20 }}
        animate={{duration: 500}}
      >
        <VictoryBar
          data={this.state.data}
          style={{
            data: { fill: "tomato", width: 12 }
          }}
          animate={{
            onExit: {
              duration: 500,
              before: () => ({
                _y: 0,
                fill: "orange",
                label: "BYE"
              })
            }
          }}
        />
      </VictoryChart>
    );
  }
}




const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

//pass a callback function to property, the callback can accept the data object
class Chart extends React.Component {
  render() {
    return (
      <VictoryChart
		height={300}
		width={300}
		theme={VictoryTheme.material}
        domainPadding={[10, 10]}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis dependentAxis
          tickFormat={(x) => { 
			return(`$${x / 1000}k`);}}
        	/>
        <VictoryBar
	style={{
			  data: {
				fill: "#c43a31",
				width: 5
			  }
			}}
		 
		 cornerRadius={{ topLeft: ({ datum }) =>{
			  console.log((datum.earnings/10000)+1);
			  return (datum.earnings/10000)+3;}  }}

          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    )
  }
}





class Scatter extends React.Component {
  render() {
    return (
		<VictoryChart
		  theme={VictoryTheme.material}
		  domain={{ x: [0, 5], y: [0, 7] }}
		>
		  <VictoryScatter
			style={{ data: { fill: "#c43a31" } }}
			
			size={(dataObject)=>{
				let index=dataObject.index;
				console.log(dataObject);
				return (dataObject.data[index].x+dataObject.data[index].y)%10;
				//return 5;
			}}
			labels={({ datum }) => datum.x}
			data={[
			  { x: 1, y: 2 },
			  { x: 2, y: 3 },
			  { x: 3, y: 5 },
			  { x: 4, y: 4 },
			  { x: 5, y: 7 }
			]}
		  />
		</VictoryChart>
    )
  }
}



export default Char2;