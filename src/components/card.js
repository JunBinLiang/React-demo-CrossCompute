
import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
class MyCard extends Component {
    render() {
    return (
      <div onClick={this.props.click}>
          <Card bg="dark" text="white" style={{ width: '15rem',cursor:'pointer' }}>
    		<Card.Header>{this.props.name}</Card.Header>
    		<Card.Body>
				<Card.Title>File Content</Card.Title>
					<Card.Text>
						Information should be placed here
				</Card.Text>
			</Card.Body>
  		  </Card>
		  <br/>
      </div>
    );
  }
}

export default MyCard