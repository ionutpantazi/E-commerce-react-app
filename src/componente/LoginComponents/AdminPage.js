import React, { useState, useEffect } from 'react';
import firebase from '@firebase/app'
import '@firebase/storage';
import {
  FirebaseDatabaseMutation,
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import { config } from "../../config";
import { Form, Button, Input, Comment, Row, Modal, Col } from 'antd';
import moment from 'moment';

firebase.initializeApp(config)
var storageRef = firebase.storage().ref('images/')

class AdminPage extends React.Component {
  constructor() {
    super()
    this.state = {
      file: '',
      mesaj: '',
      visible: false
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }
  handleFileSelect(e) {
    this.setState({ file: e.target.files[0] })
  }
  handleFileUpload() {
    storageRef.child(this.state.file.name).put(this.state.file)
    storageRef.child(this.state.file.name).getDownloadURL().then((url) => {
      this.setState({ mesaj: url })
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
      mesaj: '',
      file: ''
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const Formular = () => {
      const [form] = Form.useForm();
      const [, forceUpdate] = useState(); // To disable submit button at the beginning.

      useEffect(() => {
        forceUpdate({});
      }, []);
      return (
        <FirebaseDatabaseMutation type="push" path="e-commerce/">
          {({ runMutation }) => {
            return (
              <Form form={form} style={{padding:20}}>
                <Form.Item
                  name="nume"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} placeholder="Product name" />
                </Form.Item>
                <Form.Item
                  name="pret"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} placeholder="Product price (number)" />
                </Form.Item>
                <Form.Item
                  name="descriere"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} placeholder="Product description (max 200 letters)" />
                </Form.Item>
                <Form.Item
                  name="rating"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} placeholder="Product rating (number from 1 to 5)" />
                </Form.Item>
                <Row justify="space-around" align="middle">
                  <Col>
                    <Form.Item shouldUpdate>
                      {() => (
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={async () => {
                            const values = await form.validateFields();
                            runMutation({
                              nume: values.nume,
                              pret: values.pret,
                              imagine: this.state.mesaj,
                              descriere: values.descriere,
                              rating: values.rating,
                              data: moment(new Date()).format("LLLL")
                            })
                            form.resetFields();
                            this.handleOk()
                          }}
                          disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                          }
                        >
                          Create collection
                        </Button>
                      )}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button
                        onClick={this.handleCancel}
                      >
                        Cancel
                  </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )
          }}
        </FirebaseDatabaseMutation>
      )
    }
    const { TextArea } = Input;
    return (
      <div style={{ margin: 50 }}>
        <b>E-commerce admin page</b>
        <Button type='primary' style={{ float: "right" }} onClick={() => { firebase.auth().signOut() }}>Sign out</Button>
        <br /><br /><span>Database product list:</span><br />
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <Row style={{ borderStyle: "solid", borderWidth: 1, padding: 10 }}>
            <FirebaseDatabaseNode path="e-commerce/">
              {data => {
                const { value } = data;
                if (value === null || typeof value === "undefined") return null;
                const values = Object.values(value);
                return values.map((val) => (
                  <Comment
                    avatar={<img src={val.imagine} />}
                    author={<b>{val.nume}</b>}
                  />
                ));
              }}
            </FirebaseDatabaseNode>
          </Row>
          <br />
          <b>To insert a new collection follow the next steps:</b><br />
          <span>1. Choose image to upload</span><br />
          <input type='file' onChange={this.handleFileSelect} /><br />
          <span>2 .Click to upload image to database</span><br />
          <Button
            type="primary"
            onClick={this.handleFileUpload}
            disabled={!this.state.file}
          >
            Upload image to database
          </Button><br />
          <span>3. Add product description and click add to collection</span><br />
          <Button
            type="primary"
            onClick={this.showModal}
            disabled={!this.state.mesaj}
          >
            Add product description
          </Button>
          <Modal
            closable={false}
            footer={null}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Formular />
          </Modal>
        </FirebaseDatabaseProvider>

      </div>
    );
  };
};

export default AdminPage