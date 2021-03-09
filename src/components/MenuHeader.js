import React from 'react';
import logo_svg from "../img/logo-hand.svg";

class MenuHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      user:{
          username:'',
          password:''
      }
    }
  }

  render(){
    return(
      <div className="menu-header select-class__menu-header">
        <div className="menu-header__logo--box">
          <embed src={logo_svg} alt="Logo" class="menu-header__logo"/>
        </div>
      </div>
    )
  }
} export default MenuHeader