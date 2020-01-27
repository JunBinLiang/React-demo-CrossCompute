import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class Demo3 extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.state = {
      files: []
    };
	  
	this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
	this.clear = this.clear.bind(this); 
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
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
				<button  disabled={this.state.files.length<=0} onClick={this.uploadFiles} >
					Upload
				</button>

				<button  style={{margin:'20px'}} onClick={this.clear} >
					Clear
				</button>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default Demo3;