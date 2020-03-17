import React, { Component,useState,useEffect,useRef   } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ScatterChart,Scatter,BarChart, Bar, Cell,
} from 'recharts';

import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'



import Form from 'react-bootstrap/Form'

function ClickbleCard(props) {
	let input1 = useRef();
	let input2 = useRef();
  	const [show, setShow] = useState(props.appear);
	const [x, setX] = useState(props.nodedata.x);
	const [y, setY] = useState(props.nodedata.y);
  const handleClose = () => {
	  setShow(false);
	  props.setToFalse();
  }
  	const handleShow = () => setShow(true);
   
	const handleSubmit = () => {
		  setShow(false);
		  console.log(input1.current.value);
		  console.log(input2.current.value);
		  let newx=input1.current.value;
		  let newy=input2.current.value;
		  props.changeData(parseInt(newx),parseInt(newy));
	}	
	
	useEffect(() => {
		setShow(props.appear);
		setX(props.nodedata.x);
		setY(props.nodedata.y);
	},[props.appear]);	
	
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data</Modal.Title>
        </Modal.Header>
	  	
		<Form>
		  <Form.Group controlId="formBasicEmail">
			<Form.Label>X position : </Form.Label>
			<Form.Control type="Text" placeholder={x} ref={input1}/>
		  </Form.Group>
	  	  <Form.Group controlId="formBasicEmail">
			<Form.Label>Y position : </Form.Label>
			<Form.Control type="Text" placeholder={y} ref={input2}/>
		  </Form.Group>
		</Form>
	  
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}




class MyScatter extends Component {
		
   constructor(props) {
    	super(props);
	    this.changeData = this.changeData.bind(this);
	    this.handleClick = this.handleClick.bind(this);
	    this.setToFalse = this.setToFalse.bind(this);
    	this.state = {
			index:0,
			show:false,
			nodedata:{ x: 100, y: 200, z: 200 },
      		data1:
				[
				  { x: 100, y: 200, z: 200 },
				  { x: 120, y: 100, z: 260 },
				  { x: 170, y: 300, z: 400 },
				  { x: 140, y: 250, z: 280 },
				  { x: 150, y: 400, z: 500 },
				  { x: 110, y: 280, z: 200 },
				]

   		};
   }
	
	changeData(x,y){
		let newnode={x:x,y:y,z:0};
		this.setState({
			show:false,
			data1:[...this.state.data1.slice(0,this.state.index),newnode,...this.state.data1.slice(this.state.index+1)]
		});
	}
	
	setToFalse(){
		this.setState({show:false});
	}
	
	handleClick(e1,index){
		console.log(this.state.show);
		//console.log(typeof(index));
		let nodedata=this.state.data1[index];
		console.log(this.state.nodedata);
		this.setState({show:true,nodedata:{...nodedata},index:index});
	}
	
  render() {
    return (
	  <>
		  <ClickbleCard appear={this.state.show} setToFalse={this.setToFalse} nodedata={this.state.nodedata}
			changeData={this.changeData}
		  />
		  <ScatterChart
			width={400}
			height={400}
			margin={{
			  top: 20, right: 20, bottom: 20, left: 20,
			}}
		  >
			<XAxis type="number" dataKey="x" name="stature" unit="cm" />
			<YAxis type="number" dataKey="y" name="weight" unit="kg" />
			<Tooltip cursor={{ strokeDasharray: '3 3' }} />
			<Scatter name="A school" data={this.state.data1} fill="#8884d8" onClick={this.handleClick}/>
		  </ScatterChart>
	  </>
    );
  }
}






class MyLineChart extends Component {
	
   constructor(props) {
    	super(props);
	    this.handleClick = this.handleClick.bind(this);
    	this.state = {
      		data:
				 [
				  {
					name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
				  },
				  {
					name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
				  },
				  {
					name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
				  },
				  {
					name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
				  },
				  {
					name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
				  },
				  {
					name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
				  },
				  {
					name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
				  },
				]
   		};
   }	
	
	handleClick(e1,e2){

	}
	
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.state.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0,15000]}/>
        <Tooltip />
        <Legend/>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 },{onClick:this.handleClick}} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 },{onClick:this.handleClick}}/>
      </LineChart>
    );
  }
}






const data2 = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

class MyBarChart extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data2}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}





class Chart1 extends Component {
  render() {
    return(
		<div>
			<br/>
			<br/>
			<MyLineChart/>
			<br/>
			<br/>
			<MyScatter/>
			<br/>
			<br/>
			<MyBarChart/>
		</div>
	);
  }
}
export default Chart1;

//Recharts
//link: http://recharts.org/en-US/guide


