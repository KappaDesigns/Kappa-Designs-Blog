import React from "react";
import Form from "./Form";
import Tabs from "../Tabs"
import Platform from "../Platform";
import Logo from "../Logo";
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Login extends React.Component {
  render() {
    const platforms = ['Google','Facebook','Twitter'];
    const icons=['fa-google-plus','fa-facebook', 'fa-twitter']
    return (
      <div className="login">
        <Tabs></Tabs>
        <Link to="/"><Logo></Logo></Link>
        <Form></Form>
        <Platform platform={platforms[0]} icon={icons[0]}></Platform>
        <Platform platform={platforms[1]} icon={icons[1]}></Platform>
        <Platform platform={platforms[2]} icon={icons[2]}></Platform>
      </div>
    )
  }
}
