import React, { Component } from "react";
import { ResponsiveCalendar,Calendar } from '@nivo/calendar';
import { ResponsiveScatterPlot, ScatterPlot} from '@nivo/scatterplot'
import data1,{sdata} from './data';



//https://nivo.rocks/calendar/

//other features :minValue,maxValue : automatically filter data
class MyCalender extends Component{
	constructor(props) {
    	super(props);
	    this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.increaseM = this.increaseM.bind(this);
		this.decreaseM = this.decreaseM.bind(this);
		this.state={
			yearSpacing:40,
			monthBorderWidth:7
		}
   	 }
	
	increaseM(){
		 let olddata=this.state.monthBorderWidth;
		 this.setState({
			 monthBorderWidth:olddata+2
		 });
	 }
	 decreaseM(){
		 let olddata=this.state.monthBorderWidth;
		 this.setState({
			 monthBorderWidth:olddata-2
		 });
	 }
	 increase(){
		 let olddata=this.state.yearSpacing;
		 this.setState({
			 yearSpacing:olddata+5
		 });
	 }
	 decrease(){
		 let olddata=this.state.yearSpacing;
		 this.setState({
			 yearSpacing:olddata-5
		 });
	 }
	  render() {
		return(
			<div>
					<h1>chart4</h1>
					<Calendar
							height={800}
							width={800}
							data={data1}
							from="2015-03-01"
							to="2016-07-12"
							emptyColor="#eeeeee"
							colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
							margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
							yearSpacing={this.state.yearSpacing}
							monthBorderColor="#ffffff"
							monthBorderWidth={this.state.monthBorderWidth}
							dayBorderWidth={2}
							dayBorderColor="#ffffff"
							legends={[
								{
									anchor: 'bottom-right',
									direction: 'row',
									translateY: 36,
									itemCount: 4,
									itemWidth: 42,
									itemHeight: 36,
									itemsSpacing: 14,
									itemDirection: 'right-to-left'
								}
							]}
					/>
					<button onClick={this.increase}>+</button>
					<br/>
					<br/>
					<button onClick={this.decrease}>-</button>
			
					<br/>
					<br/>
					<button onClick={this.increaseM}>M+</button>
					<br/>
					<br/>
					<button onClick={this.decreaseM}>M-</button>
			</div>
		);
	
	  }
}
let mycolors=["nivo","set2","set3","red_grey","dark2","paired"];
let map={
	"group A":0,
	"group B":1,
	"group C":2,
	"group D":3
};
class MyScatter extends Component{
	constructor(props) {
    	super(props);
	    this.changeColor = this.changeColor.bind(this);
		this.increaseN = this.increaseN.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.state={
			colorIndex:0,
			nodeSize:10,
			data:sdata
		}
   	 }
	
	changeColor(){
		let oldIndex=this.state.colorIndex;
		this.setState({
			colorIndex:(oldIndex+1)%mycolors.length
		});
	}
	increaseN(){
		let oldSize=this.state.nodeSize;
		this.setState({
			nodeSize:oldSize+2
		});
	}
	clickHandler(node){
		let newdata=[];
		let index=map[node.data.serieId];
		let newarr=this.state.data[index].data.filter((Node)=>{
			return Node.x!=node.data.x&&Node.y!=node.data.y
		});
		for(let i=0;i<this.state.data.length;i++){
			console.log(i);
			if(i==index)newdata.push({"id":node.data.serieId,"data":newarr});
			else newdata.push(this.state.data[i]);
		}
		this.setState({
			data:newdata
		});
	}
	
	render(){
		return(
			<div>
				<ScatterPlot
					onClick={this.clickHandler}
					colors={{"scheme":mycolors[this.state.colorIndex]}}
					height={800}
					width={800}
					data={this.state.data}
					margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
					xScale={{ type: 'linear', min: 0, max: 'auto' }}
					xFormat={function(e){return e+" kg"}}
					yScale={{ type: 'linear', min: 0, max: 'auto' }}
					yFormat={function(e){return e+" cm"}}
					blendMode="multiply"
					nodeSize={this.state.nodeSize}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						orient: 'bottom',
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'weight',
						legendPosition: 'middle',
						legendOffset: 46
					}}
					axisLeft={{
						orient: 'left',
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'size',
						legendPosition: 'middle',
						legendOffset: -60
					}}
					legends={[
						{
							anchor: 'bottom-right',
							direction: 'column',
							justify: false,
							translateX: 130,
							translateY: 0,
							itemWidth: 100,
							itemHeight: 12,
							itemsSpacing: 5,
							itemDirection: 'left-to-right',
							symbolSize: 12,
							symbolShape: 'circle',
							effects: [
								{
									on: 'hover',
									style: {
										itemOpacity: 1
									}
								}
							]
						}
					]}
				/>
				<button onClick={this.changeColor}>Change</button>
				<br/><br/>
				<button onClick={this.increaseN}>+</button>	
			</div>
		)
	}
}

class Chart4 extends Component {
	  render() {
		return(
			<div>
				<MyCalender/>
				<br/>
				<br/>
				<br/>
				<MyScatter/>
			</div>
		);
  	}
}

export default Chart4;