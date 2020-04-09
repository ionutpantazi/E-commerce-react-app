import React from "react"
import firebase from "firebase/app";
import Produse from "./ListaDeProduse"
import Cos from "./Cos"
import Numar from "./NumarCos";
import Filtru from "./Filtru";
import Register from "../LoginComponents/Register";
import Login from "../LoginComponents/Login";
import ModalContent from "./ModalContent";
import { Drawer, message, Layout, Button, Popover, Row, Col, Tabs, Modal } from 'antd';
import "antd/dist/antd.css";
import { createFromIconfontCN } from '@ant-design/icons';
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
      modalVisible: false
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

  showModal1 = () => {
    this.setState({ modalVisible: true });
  };

  handleOk = e => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    function callback(key) {
    }
    const { TabPane } = Tabs;
    var loggedIn = this.props.user
    var content = (
      <div>
        {loggedIn === "true" &&
          <div style={{ maxWidth: '200px' }}>
            <Row justify="space-around" align="middle">
              <Col xs={{ span: 16 }} lg={{ span: 6 }}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="Login" key="1">
                    <Login />
                  </TabPane>
                  <TabPane tab="Register" key="2">
                    <Register />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        }
        {loggedIn !== "true" &&
          <div style={{ maxWidth: '200px' }}>
            <span>You are logged in as {this.props.user}</span><br />
            <Button type="primary" onClick={this.showModal1}>
              Open Purchase history
            </Button>
            <br /><br /><br />
            <Button type='primary' onClick={() => { firebase.auth().signOut() }}>Sign out</Button>
          </div>
        }
      </div>
    )
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_t92s5qj61g.js',
    });
    const { Header, Footer, Content } = Layout;
    const data = this.state.cosProduse
    return (
      <div>
        <Layout>
          <Header className="header">
            <span onClick={this.showDrawer}>
              <Numar cosProduse={this.state.cosProduse} />
            </span>
            <span style={{ marginLeft: 20 }}>
              <Popover content={content} placement="bottomLeft" trigger="hover">
                <IconFont type="icon-tab_login" style={{ fontSize: '28px' }} />
              </Popover>
            </span>
          </Header>
          <Content className="content">
            <div className="filtru">
              <Filtru handleSortare={this.handleSortare} />
            </div>
            <br />
            <Produse
              produse={this.state.produseRezultate}
              handleAdauga={this.handleAdauga}
            />
          </Content>
          <Footer className="footer">
            <iframe src="https://ghbtns.com/github-btn.html?user=ionutpantazi&type=follow&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
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
          <Modal
            title="Purchase history"
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <ModalContent user={this.props.user} />
          </Modal>
        </Layout>
      </div>
    )
  }
}

export default EcommerceApp