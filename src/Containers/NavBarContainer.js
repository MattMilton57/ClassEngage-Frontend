import React from 'react';
import logo_svg from "../img/logo-hand.svg";
import sprite from "../img/sprite.svg";
import {Link} from "react-router-dom";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
    }
  }

  componentDidMount(props){
    // console.log("navbar mounted")
  }

  reFetch = (e) => {
    e.preventDefault(e)
    console.log('refetching')
    this.props.reFetch()
  }
 
  render(){

      return(

            <div className="navBar"> 
                
                <div className=" navBar__header menu-header select-class__menu-header">

                    <div className="menu-header__logo--box">
                        <embed src={logo_svg} alt="Logo" className="menu-header__logo"/>
                    </div>

                </div>

                <div  className="navBar__link-list" onClick={e => this.reFetch(e)}>

                        <Link to={`${this.props.match.url}`} className="navBar__link-list--link">
                            <div className="navBar__link-list--link-text">Class Stats</div>
                            <svg className="navBar__link-list--link-icon">
                                <use href={sprite + "#icon-gauge"} ></use>
                            </svg>
                        </Link>

                        <Link to={`${this.props.match.url}/assess`} className="navBar__link-list--link">
                            <div className="navBar__link-list--link-text">Assess Class</div>
                            <svg className="navBar__link-list--link-icon">
                                <use href={sprite + "#icon-clipboard"} ></use>
                            </svg>
                        </Link>

                        <Link to={`${this.props.match.url}/edit`} className="navBar__link-list--link">
                            <div className="navBar__link-list--link-text">Edit Class</div>
                            <svg className="navBar__link-list--link-icon">
                                <use href={sprite + "#icon-pencil"} ></use>
                            </svg>
                        </Link>



                </div>

                <div className="navBar__back">
                    <a href="/selectClass" className="navBar__link-list--link">
                                <div className="navBar__link-list--link-text">Class Selection</div>
                                <svg className="navBar__link-list--link-icon">
                                    <use href={sprite + "#icon-pencil"} ></use>
                                </svg>
                    </a>
                </div>

                
                {/* <div className="navBar__profile">

                    <MenuFooter />

                </div> */}

            </div>

        )

    }
  

} export default NavBar