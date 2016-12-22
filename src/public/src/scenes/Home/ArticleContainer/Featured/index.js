import React from "react";
import Article from "../Article";

export default class Featured extends React.Component {
  render() {
    return (
      <div className="row featured">
        <h1 className="head"><span>Featured</span></h1>
        <div className="col-md-8 recent">
          <Article height={'450px'} tag="new" backgroundColor="rgba(161, 116, 0, 0.75)" background="http://www.planwallpaper.com/static/images/colorful-triangles-background_yB0qTG6.jpg" title="Test"></Article>
        </div>
        <div className="col-md-4 earlier">
          <Article height={'450px'} tag="new" backgroundColor="rgba(244, 241, 235, 0.75)" background="http://www.intrawallpaper.com/static/images/518164-backgrounds.jpg" title="Recent"></Article>
        </div>
      </div>
    )
  }
}
