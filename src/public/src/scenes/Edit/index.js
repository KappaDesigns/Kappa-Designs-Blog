import React from "react";
import Form from "./Form";
import Head from "./Head";
import 'whatwg-fetch'; 

export default class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      fetched: false
    }
  }

  componentDidMount() {
    fetch(`/api/article/${this.props.params.id}?token=${sessionStorage.token}`, {method:'get'})
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        article: json,
        fetched: true
      })
    })
  }

  render() {
    if (this.state.fetched) {
      return (
        <div className="create">
          <Head></Head>
          <Form article={this.state.article}></Form>
        </div>
      )
    } else {
      return (
        <div className="create">
          <Head></Head>
        </div>
      )
    }
  }
}
