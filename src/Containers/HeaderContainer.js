import React from 'react';
import sprite from "../img/sprite.svg";
import {Link} from "react-router-dom";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
        showMenu: false,
    }
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount(props){
    // console.log("navbar mounted")
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({
      showMenu: true,
    });
  }

  handleClick = (e) => {
    this.props.history.push('/')
    this.props.logOut()
  }

//   reFetch = (e) => {
//     e.preventDefault(e)
//     console.log('refetching')
//     this.props.reFetch()
//   }
 
  render(){

      return(

            <div className="header"> 
                        <input type="checkbox" class="header__controll-toggle" id="header-dropdown-toggle"/>
                <div className="header__text">
                    {this.props.headerText}
                </div>
                <div className="header__user">
                    <div className="header__user-name">
                        Hello {this.props.user.username}
                    </div>
                    <div className="header__user-menu">
                    {/* <label for="header-dropdown-toggle" className="header__dropdown-toggle">X</label> */}
                    <div className="header__user-menu-log-out" onClick={e=>this.handleClick(e)}>
                        {/* <Link className="" key={Math.random()} to={`/`}> */}
                            Sign Out
                        {/* </Link> */}
                    </div>
                    </div>
                </div>
                <div >
                <div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Dropdown</button>
  <div id="myDropdown" class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
                    {/* <div className="header__dropdown-log-out">
                        Log Out
                    </div> */}

                    {/* <div className="header__dropdown-edit-profile">
                        Edit Profile
                    </div> */}
                </div>
                {/* <button onClick={this.showMenu}>
          Show menu
        </button>
                {
          this.state.showMenu
            ? (
              <div className="menu">
                <button> Menu item 1 </button>
                <button> Menu item 2 </button>
                <button> Menu item 3 </button>
              </div>
            )
            : (
              null
            )
        } */}

            </div>

        )

    }
  

} export default Header