import React from 'react';
import ButtonContainer from './ButtonContainer'
import './NavButtons.css';


class NavButtons extends React.Component {

genButtons = () => {
  return <ButtonContainer buttons={this.props.buttons} />
} 

  render(){
    return(
      <div>
          {this.genButtons()}
      </div>
    )
  }

} export default NavButtons