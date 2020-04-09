import React from 'react';
import firebase from "firebase/app";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import { config } from "../../config";
import { Collapse } from 'antd';
import "antd/dist/antd.css";
import "./ModalContent.css"

class ModalContent extends React.Component {
  render() {
    const { Panel } = Collapse;
    var name = this.props.user.substring(0, this.props.user.lastIndexOf("@"));
    var domain = this.props.user.substring(this.props.user.lastIndexOf("@") + 1);
    var domainName = (name + domain).substring(0, (name + domain).lastIndexOf("."));
    const link = 'purchase/' + domainName
    return (
      <div>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <FirebaseDatabaseNode path={link}>
            {data => {
              const { value } = data;
              if (value === null || typeof value === "undefined") return null;
              const values = Object.values(value);
              return values.map((val) => (
                <div>
                  <Collapse>
                    <Panel header={val.date} key={val.date} >
                      <div>
                        <table style={{ width: "100%" }}>
                          <tbody>
                          <tr style={{ fontSize: '12px' }}>
                            <td><i>ionutpantazi-ecommerce.firebaseapp.com</i></td>
                            <td style={{ textAlign: 'right' }}><i>{this.props.user}</i></td>
                          </tr>
                          <tr style={{ fontSize: '12px' }}>
                            <td><i>github @ionutpantazi</i></td>
                          </tr>
                          <tr></tr>
                          <table className="ModalTable">
                            <tbody>
                            <tr>
                              <th style={{ width: "20%" }}>Quantity</th>
                              <th style={{ width: "60%" }}>Product Name</th>
                              <th style={{ width: "40%" }}>Total price</th>
                            </tr>
                            {val.purchase.map((x) => (
                              <tr>
                                <td>{x.totalProduse} </td>
                                <td>{x.nume}</td>
                                <td>{(Math.round(x.pret * x.totalProduse * 100) / 100).toFixed(2)} $</td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                          <tr></tr>
                          <tr>
                            <td></td>
                            <td style={{ textAlign: 'right' }}><b>Total paid: {val.purchase.reduce((a, c) => (a + c.pret * c.totalProduse), 0)} $</b></td>
                          </tr> 
                          </tbody>  
                        </table>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              ))
            }}
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
      </div>
    )
  }
}

export default ModalContent

