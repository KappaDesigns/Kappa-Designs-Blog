import React from "react";
import Head from "./Head";
import Form from "./Form";
import 'whatwg-fetch'; 

export default class CreateArticle extends React.Component {
  render() {
    return (
      <div className="create">
        <Head></Head>
        <Form></Form>
      </div>
    )
  }
}
