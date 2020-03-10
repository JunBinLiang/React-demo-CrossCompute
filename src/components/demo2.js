import React, { Component,useState } from "react";
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import MyCard from './card'
import CardDeck from 'react-bootstrap/CardDeck'
//const Transloadit = require('@uppy/transloadit');
const XHRUpload = require('@uppy/xhr-upload')




function ClickbleCard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
	  <MyCard name={props.file.data.name} click={handleShow}/>;
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.file.data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>File Data</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



class Demo2 extends Component {
  constructor (props) {
    super(props);
	this.state = {
      files: [],
    };  
	this.addfile = this.addfile.bind(this);
    this.uppy = Uppy();
    this.uppy.use(XHRUpload, { endpoint: 'http://localhost:5000/upload',method:'post' });  
	
	/*this.uppy.on('upload', (data) => {
  		// Do something   cleaning?
		console.log("upload");
		const promises = [];
    		this.state.files.forEach(file => {
      		promises.push(this.sendRequest(file));
    	});
		Promise.all(promises);
	});*/
	  
	  
	//this.uppy.on('file-added',this.addfile);

	this.uppy.on('upload-success', (file, response) => {
		console.log("upload success")
		console.log(file);
		this.addfile(file);
	});
	  
  }
	

  /*sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.upload.addEventListener("load", event => {
        resolve(req.response);
      });
	  console.log(file.data);
      const formData = new FormData();
      formData.append("file", file.data, file.data.name);
      req.open("POST", "http://localhost:5000/upload");
      req.send(formData);
    });
  }	*/
	
	
  addfile(file){
	let allfiles=[file,...this.state.files];
	this.setState({ files: allfiles});
  }
	
  componentWillUnmount () {
    this.uppy.close()
  }
	
	
  //The <Dashboard /> component supports all @uppy/dashboard options as props.	
   render() {
		const dataset = this.state.files.map((file) =>{
			console.log(file)
			return <ClickbleCard file={file}/>
		});
	   
		return(
			<div>
				 <h1>Demo2</h1>
				 <Dashboard uppy={this.uppy} {...this.props}/>
				 <CardDeck>{dataset}</CardDeck>
				 
			</div>

		);
  }
}

Demo2.defaultProps = {
    width: 450,
	height: 400
};
export default Demo2;
