import React, { Component } from "react";
import Dropzone from './Dropzone';
import ShowFile from './Showfile';
import "./Upload.css";
import CardList from "./cardlist"

class Upload extends Component {
	
	
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    //this.renderActions = this.renderActions.bind(this);
	this.clear = this.clear.bind(this);
  }	
	
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }
	
	
  uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      Promise.all(promises).then(()=>{
		  this.setState({ files:[] });
	  });
    } catch (e) {
    }
  }
	

	
  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.upload.addEventListener("load", event => {
        resolve(req.response);
      });
	  console.log(file);
      const formData = new FormData();
      formData.append("file", file, file.name);
      req.open("POST", "http://localhost:5000/upload");
      req.send(formData);
    });
  }	
	
	
  clear() {
    this.setState(prevState => ({
      files: []
    }));
  }
	
  render() {
    return(
		<div>
			<Dropzone disabled={false} onFilesAdded={this.onFilesAdded}/>
			<button  disabled={this.state.files.length<=0} onClick={this.uploadFiles} >
				Upload
			</button>
		
			<button  style={{margin:'20px'}} onClick={this.clear} >
				Clear
			</button>
		
			<ShowFile files={this.state.files}/>
			<CardList/>
		</div>

	);
  }
}
export default Upload;