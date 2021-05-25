import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import UserPreferencesForm from '../forms/UserPreferencesForm';
import sprite from "../img/sprite.svg";

class Header extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(props){

  }

  handleClick = (e) => {
    this.logOutRedirect()
  }

  logOutRedirect = () => {
    // console.log("?")
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
        <div className="header__text">
          {this.props.headerText}
        </div>
        <div className="header__user">
          <div className="header__user-name">
            {this.props.user.username}
          </div>
          <Dropdown >
            <Dropdown.Toggle className="header__user-dropdown-toggle" variant="success" id="dropdown-basic">
              <svg className="header-dropdown-button-icon">
                <use href={sprite + "#icon-menu"} ></use>
              </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu className="header__user-dropdown-menu" align="right" >
              <Dropdown.ItemText onClick={e=> console.log("1")}>                      
                <div className="header__user-menu-log-out header__user-dropdown-item" onClick={e=>this.handleClick(e)}>
                  Log Out
                </div>
              </Dropdown.ItemText>

              <Dropdown.ItemText>
                <label for="user-preferences-form__checkbox" className="header__user-menu-preferences header__user-dropdown-item">
                  Account Preferences
                </label>
               </Dropdown.ItemText>

            </Dropdown.Menu>
          </Dropdown> 
        </div>
        <UserPreferencesForm logOutRedirect={ (e) => this.logOutRedirect(e)} getUser={this.props.getUser} user={this.props.user} history={this.props.history} logout={this.props.logOut}/>
      </div>
    )
  }

} export default Header