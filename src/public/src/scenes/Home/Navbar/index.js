import React from "react";
import Navtag from "./Navtag";
import { Link } from "react-router";

export default class Navbar extends React.Component {

  constructor() {
    super();
    this.state = {
      pastNav: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > 276) {
      this.setState({
        pastNav: true
      })
    } else if (scrollTop < 122){
      this.setState({
        pastNav: false
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let createNavTag = (tag, i) => {
      return (<Navtag handleClick={this.props.handleFilter} key={i} tag={tag}>{tag}</Navtag>)
    }

    let style = {
      navbar : {
        boxShadow:'none',
        marginTop:'0px',
        marginBottom:'0px'
      },
      container : {
        width: '100%',
        backgroundColor: '#e2e0dc',
        top:0,
        position: 'fixed',
        zIndex:50
      }
    }

    if (this.state.pastNav) {
      return (
        <div style={style.container} className="navbar-container">
          <div style={style.navbar} className="navbar">{this.props.tags.map(createNavTag, 0)}</div>
        </div>
      )
    } else {
      return (
        <div className="navbar-container">
          <div className="navbar">{this.props.tags.map(createNavTag, 0)}</div>
        </div>
      )
    }
  }
}
