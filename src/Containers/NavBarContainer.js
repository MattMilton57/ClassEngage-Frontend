import React from 'react';
import logo_svg from "../img/logo-hand.svg";
import sprite from "../img/sprite.svg";
import ContactFooter from "../components/ContactFooter"
import {Link} from "react-router-dom";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
        selected:1,
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

  handleClick = (e,headerText) => {
      this.props.setHeader(headerText)
      this.setState({selected:e})
  }

  highlight = (id) => {
    if (this.state.selected === id){
        return "navBar__link-list--link navBar__link-list--link-selected"
    }else{
        return "navBar__link-list--link"
    }
}

highlightIfNew = (id) => {
    if ((this.props.roster.length < 1) && (this.state.selected != id)){
        return "navBar__link-list--link navBar__link-list--link-highlighted"}
    // if ((this.props.roster.length > 0) && (this.state.selected != id) && (this.props.classAssessments.length < 1)){
    //     return "navBar__link-list--link navBar__link-list--link-highlighted"}
    else if (this.state.selected === id){
        return "navBar__link-list--link navBar__link-list--link-selected"
    }else{
        return "navBar__link-list--link"
    }
}
 
  render(){

      return(

            <div className="navBar"> 
                
                <div className=" navBar__header menu-header select-class__menu-header">

                    <div className="navBar__header-logo--box">
                        <embed src={logo_svg} alt="Logo" className="navBar__header-logo"/>
                    </div>

                </div>

                <div  className="navBar__link-list" onClick={e => this.reFetch(e)}>

                        <Link to={`${this.props.match.url}`} id={1} className={this.highlight(1)} onClick={e=>this.handleClick(1,"Class Home Page")}>
                            <div className="navBar__link-list--link-text">Class Stats</div>
                            <svg className="navBar__link-list--link-icon">
                                <use href={sprite + "#icon-gauge"} ></use>
                            </svg>
                        </Link>

                        <Link to={`${this.props.match.url}/assess`} id={2} className={this.highlight(2)} onClick={e=>this.handleClick(2,"Assess Class Engagement")}>
                            <div className="navBar__link-list--link-text">Assess Class</div>
                            <svg className="navBar__link-list--link-icon">
                                <use href={sprite + "#icon-clipboard"} ></use>
                            </svg>
                        </Link>

                        <Link to={`${this.props.match.url}/edit`} id={3} className={this.highlightIfNew(3)} onClick={e=>this.handleClick(3,"Edit Class")}>
                            <div className="navBar__link-list--link-text">Edit Class</div>
                            <svg className="navBar__link-list--link-icon">
                                <use href={sprite + "#icon-pencil"} ></use>
                            </svg>
                        </Link>
                </div>

                <div className="navBar__back">
                    <a href="/selectClass" className="navBar__link-list--link navBar__link-list--link-back">
                                <div className="navBar__link-list--link-text">All Classes</div>
                                <svg className="navBar__link-list--link-icon">
                                    <use href={sprite + "#icon-graduation-cap"} ></use>
                                </svg>
                    </a>
                </div>

                
                <div className="navBar__profile">

                    <ContactFooter />

                </div>

            </div>

        )

    }
  

} export default NavBar