import React, { Component } from "react";

class Showfile extends Component {
  render() {
    return(
		<div className="Files">
            {this.props.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                </div>
              );
            })}
         </div>
	);
  }
}
export default Showfile;