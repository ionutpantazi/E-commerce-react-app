import React from "react"
import firebase from "firebase/app";
import Cos from "./Cos"
import Header from "./Header";
import Content from "./Content";
import { Drawer, message, Layout, Button } from 'antd';
import "antd/dist/antd.css";
import './EcommerceApp.css';
import moment from 'moment';

class EcommerceApp extends React.Component {
  constructor() {
    super()
    this.state = {
      cosProduse: [],
      produse: [],
      visible: false,
      sortat: "nume",
      produseRezultate: [],
    }
  }

  componentWillMount() {
    this.setState({ produse: this.props.bazaDate });
    this.produseRezultate()
  }

  handleSterge = (produs) => {
    const a = this.state.cosProduse.filter(a => a.nume !== produs.nume)
    this.setState({ cosProduse: a });
  }

  handleAdauga = (produs) => {
    this.showDrawer()
    const a = this.state.cosProduse
    let dejaAdaugat = false
    a.forEach(b => {
      if (b.nume === produs.nume) {
        dejaAdaugat = true;
        message.warning('Item already added to cart');
      }
    })
    if (!dejaAdaugat) {
      a.push({ ...produs, totalProduse: 1 })
      this.setState({ cosProduse: a });
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handlePlus = (produs) => {
    const a = this.state.cosProduse
    a.forEach(cp => {
      if (cp.nume === produs.nume) {
        cp.totalProduse += 1
      }
    })
    this.setState({ cosProduse: a });
  }

  handleMinus = (produs) => {
    const a = this.state.cosProduse
    a.forEach(x => {
      if (x.nume === produs.nume) {
        x.totalProduse -= 1
        if (x.totalProduse <= 0) {
          x.totalProduse = 1
        }
      }
    })
    this.setState({ cosProduse: a });
  }

  handlePlateste = () => {
    if (this.props.user !== "true") {
      var name = this.props.user.substring(0, this.props.user.lastIndexOf("@"));
      var domain = this.props.user.substring(this.props.user.lastIndexOf("@") + 1);
      var domainName = (name + domain).substring(0, (name + domain).lastIndexOf("."));
      firebase.database().ref('/purchase/' + domainName).push().set({
        purchase: this.state.cosProduse,
        date: moment(new Date()).format("LLLL")
      });
      this.setState({ cosProduse: [] });
      message.success('Purchase complete');
      this.onClose()
    } else {
      message.error('Only authenticated users can purchase items. Log in or create account');
    }
  }

  produseRezultate = () => {
    this.setState(state => {
      if (state.sortat === "pret") {
        state.produse.sort((a, b) => (a.pret > b.pret) ? 1 : -1)
      }
      else if (state.sortat === "nume") {
        state.produse.sort((a, b) => (a.nume > b.nume) ? 1 : -1)
      }
      else if (state.sortat === "data") {
        state.produse.sort((a, b) => (a.data > b.data) ? 1 : -1)
      }
      return { produseRezultate: state.produse }
    })
  }

  handleSortare = (event) => {
    this.setState({ sortat: event });
    this.produseRezultate();
  };

  render() {
 
    const { Footer } = Layout;
    const data = this.state.cosProduse
    return (
      <div>
        <Layout>
          <Header
            loggedIn={this.props.loggedIn}
            cosProduse={this.state.cosProduse}
            user={this.props.user}
            showDrawer={this.showDrawer}
          />
          <Content
            handleSortare={this.handleSortare}
            produse={this.state.produseRezultate}
            handleAdauga={this.handleAdauga}
          />
          <Footer className="footer">
            <iframe src="https://ghbtns.com/github-btn.html?user=ionutpantazi&type=follow&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
          </Footer>
          <Drawer
            title="Shopping cart"
            width={260}
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            footer={
              <div>
                <div style={{ float: 'left' }}>
                  Total: {(Math.round(data.reduce((a, c) => (a + c.pret * c.totalProduse), 0) * 100) / 100).toFixed(2)} <b>$</b>
                </div>
                <div style={{ float: 'right' }}>
                  <Button disabled={this.state.cosProduse == 0}
                    onClick={this.handlePlateste} type="primary">
                    Purchase
                </Button>
                </div>
              </div>
            }
          >
            <Cos
              cosProduse={this.state.cosProduse}
              handleSterge={this.handleSterge}
              handlePlus={this.handlePlus}
              handleMinus={this.handleMinus}
              handlePlateste={this.handlePlateste}
            />
          </Drawer>
          
        </Layout>
      </div>
    )
  }
}

export default EcommerceApp