import React, { Component,useState } from "react";
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


 function sendRequest(file) {
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



function Demo4() {
  const [files, setFiles] = useState([])
  return (
    <div>
	  <h1>Demo4 </h1>
      <FilePond
        files={files}
        allowMultiple={true}
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
	  
	  <button  disabled={files.length<=0} onClick={()=>{
		const promises = [];
	    console.log(files);
		files.forEach(file => {
		  promises.push(sendRequest(file.file));
		});
		try {
		  Promise.all(promises).then(()=>{
			 setFiles([]);
		  });
		} catch (e) {
		}
  	   }}>
			Upload
	  </button>
		
	  <button  style={{margin:'20px'}} onClick={()=>{setFiles([])}} >
			Clear
	  </button>
    </div>
  )
}

export default Demo4;