import React from 'react';
import Filtru from "./Filtru";
import Produse from "./ListaDeProduse";
import { Carousel } from 'antd';

class Content extends React.Component {
  render() {
    return (
        <div className="content">
          <Carousel autoplay>
            <div className="CarouselBackground1">
              <div className="CarouselBackground1Content">
                <div className="CarouselBackground1Title">
                  <span>Apple iPhone 11 128GB</span>
                </div>
                <div className="CarouselBackground1Description">
                  <span>Featuring a Stunning Pro Display, A13 Bionic, Cutting-Edge Pro Camera System and Longest Battery Life Ever in iPhone with iPhone 11 Pro Max</span>
                </div>
              </div>
            </div>
            <div className="CarouselBackground2">
              <div className="CarouselBackground1Content">
                <div className="CarouselBackground1Title">
                  <span>Apple Watch Series 5</span><br />
                </div>
                <div className="CarouselBackground1Description">
                  <span>The most advanced Apple Watch yet, featuring the Always-On Retina display, the ECG app, International Emergency Calling, Fall Detection and a built‑in compass.</span>
                </div>
              </div>
            </div>
          </Carousel>
          <div style={{ overflow: 'auto', marginTop: '20px' }}>
            <div className = "menu">
              <b>Categories</b>
              <a>Computers</a>
              <a>Mobile phones</a>
              <a>TVs</a>
              <a>Accessories</a>
            </div>
            <div className = "main">
              <div className = "filtru">
                <Filtru handleSortare={this.props.handleSortare} /><br />
                <Produse
                  produse={this.props.produse}
                  handleAdauga={this.props.handleAdauga}
                />
              </div>
            </div>
            <div className = "right">
              <div className = "badge">Sale</div>
              <div className = "product-tumb">
                <img src="images/tv.png"></img>
              </div>
              <div className = "product-details">
                <span className = "product-catagory">TVs</span>
                <h4><a>48-Inch 1080p 60Hz Smart LED TV</a></h4>
                <div className = "product-bottom-details">
                  <div className = "product-price"><small>280.00 $</small>230.99 $</div>
                  <div className = "product-links">
                    <a><i>Quick buy</i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src="/images/banner.jpg" style={{width: '100%' , marginTop: '20px'}} />
          </div>
        </div>
    )
  }
}

export default Content