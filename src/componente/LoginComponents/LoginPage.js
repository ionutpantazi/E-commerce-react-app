import React from 'react';
import Register from "./Register";
import Login from "./Login";

import { Row, Col, Tabs, Layout, Popover } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

class LoginPage extends React.Component {

  render() {
    function callback(key) {
    }
    const { TabPane } = Tabs;
    const { Header, Footer, Content } = Layout;
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_t92s5qj61g.js',
    });
    const content = (
      <div style={{ maxWidth: '300px' }}>
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
    );
    return (
      <div>
        <Layout>
          <Header className="header">
            <Popover content={content} placement="bottomLeft" trigger="click">
              <IconFont type="icon-tab_login" style={{ fontSize: '28px' }} />
            </Popover>
          </Header>
          <Content className="content">
            <span style={{fontSize:30}}>
            This project uses firebase components. In order to have acces to the e-commerce react app you need to
            authenticate first. This step is mandatory because of firebase database security rules which only
            allows access to authenticated users. Click on the green login avatar and proceed to the login phase.
            </span>
          </Content>
          <Footer className="footer">
            <a className="github-button" href="https://github.com/ionutpantazi" data-color-scheme="no-preference: light; light: light; dark: light;" data-size="large" data-show-count="true" aria-label="Follow @ionutpantazi on GitHub">Follow @ionutpantazi</a>
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default LoginPage