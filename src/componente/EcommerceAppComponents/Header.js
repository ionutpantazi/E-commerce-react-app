import React from "react";
import firebase from "firebase/app";
import Numar from "./NumarCos";
import Register from "../LoginComponents/Register";
import Login from "../LoginComponents/Login";
import { Layout, Popover, Button, message, Tabs, Col, Row, Modal , Divider } from 'antd';
import ModalContent from "./ModalContent";
import { createFromIconfontCN } from '@ant-design/icons';

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false
    }
  }

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
    var loggedIn = this.props.user
    const { TabPane } = Tabs;
    const { Header } = Layout;
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_t92s5qj61g.js',
    });
    var content = (
      <div>
        {loggedIn === "true" &&
          <div style={{ maxWidth: '200px' }}>
            <Row justify="space-around" align="middle">
              <Col xs={{ span: 16 }} lg={{ span: 6 }}>
                <Tabs defaultActiveKey="1">
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
          <div style={{ maxWidth: '200px' , height: '300px'}}>
            <br />
            <div style={{textAlign:'center'}}><b>Hello {this.props.user}</b></div><Divider />
            <span>&nbsp;&nbsp;You can now make payments from this website. </span><br />
            <span>&nbsp;&nbsp;Your purchase history is available here:</span>
            <div style={{textAlign:'center' , marginTop: 10}}>
              <Button  type="secondary" size="small" onClick={this.showModal1}>
                Open Purchase history
              </Button>
            </div>
            <Divider />
            <Button style={{ float: 'right' }} type='primary' onClick={() => { firebase.auth().signOut(); message.success("You have been successfully logged out!") }}>Sign out</Button>
          </div>
        }
      </div>
    )
    return (
      <div>
        <Header className="header">
          <div className="icons-container">
            <a onClick={() => this.props.showDrawer()}>
              <Numar cosProduse={this.props.cosProduse} />
            </a>
            <span style={{ marginLeft: 20 }}>
              <Popover content={content} placement="bottomLeft" trigger="click">
                <IconFont type="icon-tab_login" className="icons" />
              </Popover>
            </span>
          </div>
        </Header>
        <Modal
          title="Purchase history"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ModalContent user={this.props.user} />
        </Modal>
      </div>
    )
  }
}

export default Header