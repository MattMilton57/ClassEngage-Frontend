import React from 'react';

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
    if (this.props.listType === "home") {
      return(
        <div className="menu-footer class-home__menu-footer">
          {/* <div className="menu-footer__avatar">
            avatar
          </div> */}
        </div>
      )
    }else{
      return(
        <div className="menu-footer select-class__menu-footer">
          {/* <div className="menu-footer__name">
            Mr Milton
          </div>
          <div className="menu-footer__avatar">
            avatar
          </div> */}
        </div>
      )
    }
  }
} export default MenuHeader