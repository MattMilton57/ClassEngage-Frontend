import React from 'react';
import logo_svg from "../img/logo-hand.svg";
import MenuFooter from "../components/MenuFooter"
import NavLink from "../components/NavLink"
import sprite from "../img/sprite.svg"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import { api } from '../services/api'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
    }
  }

  componentDidMount(props){
    console.log("navbar mounted")
  }

  reFetch = (e) => {
          e.preventDefault(e)

    this.props.reFetch()
  }

  checkFunk =(match)=>{
    if(!this.props.match) {
        // console.log('not yet')
        return(
        <div className="adiv">
            loading
        </div>
        )
    }else{
        // console.log(match.url)
        return(
            <div className="adiv">
                {this.props.match.url}
                loaded
            </div>
        )
    }
  }
 
  render(){
      const {match} = this.props.match
      return(
      <div> 
          displaying?   
          {this.checkFunk(this.props.match)}
          {/* {match.url}   */}
        <div className="menu-header select-class__menu-header">
            <div className="menu-header__logo--box">
            <embed src={logo_svg} alt="Logo" class="menu-header__logo"/>
            </div>
        </div>
        <div  className="class-home__nav">
                <div className="class-home__-link" onClick={e => this.reFetch(e)}>
                <svg className="class-home__-icon">
                    <use href={sprite + "#icon-gauge"} ></use>
                  </svg>
                  <Link to={`${this.props.match.url}`}><div>Class Stats</div></Link>
                </div>

                <div className="class-home__-link">
                  <svg className="class-home__-icon">
                    <use href={sprite + "#icon-clipboard"} ></use>
                  </svg>
                  <Link to={`${this.props.match.url}/assess`}>Assess Students</Link>
                </div>

                <div className="class-home__-link">
                <svg className="class-home__-icon">
                    <use href={sprite + "#icon-pencil"} ></use>
                  </svg>
                  <Link to={`${this.props.match.url}/edit`}>Edit Roster</Link>
                </div>
              </div>
        
        <div className="navBar__profile">
            <MenuFooter />
        </div>
      </div>
    )
  }
  

} export default NavBar