import React, { Component } from "react";
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
//const Transloadit = require('@uppy/transloadit');
const XHRUpload = require('@uppy/xhr-upload')



class Demo2 extends Component {
  constructor (props) {
    super(props);
	this.state = {
      files: [],
    };  
	this.addfile = this.addfile.bind(this);
	this.sendRequest = this.sendRequest.bind(this);
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
	this.uppy.on('file-added',this.addfile);
  }
	

  sendRequest(file) {
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
  }	
	
	
  addfile(file){
	let allfiles=[file,...this.state.files];
	this.setState({ files: allfiles});
  }
	
  componentWillUnmount () {
    this.uppy.close()
  }
	
  //The <Dashboard /> component supports all @uppy/dashboard options as props.	
  render() {
    return(
		<div>
			<h1>Demo2</h1>
			<Dashboard uppy={this.uppy} {...this.props}/>   
		</div>
		
	);
  }
}

Demo2.defaultProps = {
    width: 450,
	height: 500
};
export default Demo2;
