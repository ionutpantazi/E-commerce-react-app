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
                        <div style={{fontSize:12}}>
                          <span><i>ionutpantazi-ecommerce.firebaseapp.com</i></span><br></br>
                          <span style={{ float: 'right' }}><i>{this.props.user}</i></span>
                          <span><i>github @ionutpantazi</i></span>
                        </div>
                        <table className="ModalTable">
                          <tbody>
                            <tr>
                              <th>Quantity</th>
                              <th>Product Name</th>
                              <th>Total price</th>
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
                        <span style={{ float: 'right' }}><b>Total paid: {val.purchase.reduce((a, c) => (a + c.pret * c.totalProduse), 0)} $</b></span>
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

