import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import {
  FirebaseDatabaseMutation,
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import { config } from "../../config";
import { Form, Button, Input, Comment, Row, Col, Modal } from 'antd';
import moment from 'moment';


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
    console.log(e);
    this.setState({
      visible: false,
      mesaj: '',
      file: ''
    });
  };

  handleCancel = e => {
    console.log(e);
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
              <Form form={form}>
                <Form.Item
                  label="Product name"
                  name="nume"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} />
                </Form.Item>
                <Form.Item
                  label="Product price"
                  name="pret"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} />
                </Form.Item>
                <Form.Item
                  label="Product description"
                  name="descriere"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} />
                </Form.Item>
                <Form.Item
                  label="Product rating"
                  name="rating"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} />
                </Form.Item>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      style={{ float: 'right' }}
                      type="primary"
                      htmlType="submit"
                      onClick={async () => {
                        const values = await form.validateFields();
                        console.log(values)
                        runMutation({
                          nume: values.nume,
                          pret: values.pret,
                          imagine: this.state.mesaj,
                          descriere: values.descriere,
                          rating: values.rating,
                          data: moment(new Date()).format("LLLL")
                        })
                        form.resetFields();
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
              </Form>
            )
          }}
        </FirebaseDatabaseMutation>
      )
    }
    console.log(this.state)
    const { TextArea } = Input;
    return (
      <div style={{ margin: 50 }}>
        <b>E-commerce admin page</b>
        <Button type='primary' style={{ float: "right" }} onClick={() => { firebase.auth().signOut() }}>Sign out</Button>
        <br /><br /><span>Database product list:</span><br />
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <Row style={{borderStyle:"solid",borderWidth:1}}>
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
            title="Basic Modal"
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