import React from "react"
import firebase from "firebase/app";
import Produse from "./ListaDeProduse"
import Cos from "./Cos"
import Numar from "./NumarCos";
import Filtru from "./Filtru";
import { Drawer, message, Layout, Button , Popover } from 'antd';
import "antd/dist/antd.css";
import { createFromIconfontCN } from '@ant-design/icons';
import './EcommerceApp.css';

class EcommerceApp extends React.Component {
  constructor() {
    super()
    this.state = {
      cosProduse: [],
      produse: [],
      visible: false,
      sortat: "nume",
      produseRezultate: []
    }
  }

  componentWillMount() {
    this.setState({ produse: this.props.bazaDate });
    this.produseRezultate()

  }

  mesajEroare1 = () => {
    message.error('Acest produs a fost deja adaugat');
  }

  handleSterge = (produs) => {
    const a = this.state.cosProduse.filter(a => a.id !== produs.id)
    this.setState({ cosProduse: a });
  }

  handleAdauga = (produs) => {
    this.showDrawer()
    const a = this.state.cosProduse
    let dejaAdaugat = false
    a.forEach(b => {
      if (b.id === produs.id) {
        dejaAdaugat = true;
        this.mesajEroare1()
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
      if (cp.id === produs.id) {
        cp.totalProduse += 1
      }
    })
    this.setState({ cosProduse: a });
  }

  handleMinus = (produs) => {
    const a = this.state.cosProduse
    a.forEach(x => {
      if (x.id === produs.id) {
        x.totalProduse -= 1
        if (x.totalProduse <= 0) {
          x.totalProduse = 1
        }
      }
    })
    this.setState({ cosProduse: a });
  }

  handlePlateste = () => {
    this.setState({ cosProduse: [] });
    alert("cumparat")
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
    const content = (
    <div style={{padding:10}}>
      <b>Welcome {this.props.user}</b><br /><br /><br /><br />
      <Button type='primary' onClick={() => { firebase.auth().signOut() }}>Sign out</Button>
    </div>
    )
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_t92s5qj61g.js',
    });
    const { Header, Footer, Content } = Layout;
    const data = this.state.cosProduse
    return (
      <Layout>
        <Header className="header">
          <span onClick={this.showDrawer}>
            <Numar cosProduse={this.state.cosProduse} />
          </span>
          <span style={{marginLeft:20}}>
            <Popover content={content} placement="bottomLeft" trigger="click">
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
          <a className="github-button" href="https://github.com/ionutpantazi" data-color-scheme="no-preference: light; light: light; dark: light;" data-size="large" data-show-count="true" aria-label="Follow @ionutpantazi on GitHub">Follow @ionutpantazi</a>
        </Footer>
        <Drawer
          title="Cosul de cumparaturi"
          width={260}
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          footer={
            <div>
              <div style={{ float: 'left' }}>
                Total de plata: {(Math.round(data.reduce((a, c) => (a + c.pret * c.totalProduse), 0) * 100) / 100).toFixed(2)} lei
              </div>
              <div style={{ float: 'right' }}>
                <Button disabled={this.state.cosProduse == 0}
                  onClick={this.handlePlateste} type="primary">
                  Plateste
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
    )
  }
}

export default EcommerceApp