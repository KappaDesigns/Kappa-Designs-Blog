import React from "react";
import Article from "../Article";

export default class Main extends React.Component {
  render() {
    return (
      <div className="row main">
        <br></br>
        <h1 className="head"><span>Articles</span></h1>
        <div className="col-md-4">
          <Article height='400px' tag="new" backgroundColor="rgba(161, 116, 0, 0.75)" background="http://www.planwallpaper.com/static/images/colorful-triangles-background_yB0qTG6.jpg" title="Test"></Article>
          <Article height='791px' tag="new" backgroundColor="rgba(244, 241, 235, 0.75)" background="http://www.intrawallpaper.com/static/images/518164-backgrounds.jpg" title="Test"></Article>
        </div>
        <div className="col-md-4">
          <Article height='690px' tag="new" backgroundColor="rgba(244, 241, 235, 0.75)" background="https://image.freepik.com/free-vector/abstract-background-with-a-watercolor-texture_1048-2144.jpg" title="Test"></Article>
          <Article height='400px' tag="new" backgroundColor="rgba(161, 116, 0, 0.75)" background="http://www.planwallpaper.com/static/images/colorful-triangles-background_yB0qTG6.jpg" title="Test"></Article>
        </div>
        <div className="col-md-4">
          <Article height='444px' tag="new" backgroundColor="rgba(161, 116, 0, 0.75)" background="https://s-media-cache-ak0.pinimg.com/736x/78/b1/96/78b1965dbb8d754bbeb6f9a1addf0d4f.jpg" title="Test"></Article>
          <Article height='840px' tag="new" backgroundColor="rgba(244, 241, 235, 0.75)" background="http://imagecolony.com/wp-content/uploads/2016/08/Background-Image-365.jpg" title="Test"></Article>
        </div>
      </div>
    )
  }
}
