import React from "react";
import firebase from "firebase/app";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import { config } from "../../config";

import EcommerceApp from "../EcommerceAppComponents/EcommerceApp";

class Authenticated extends React.Component {

  render() {
    return (
      <div>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <FirebaseDatabaseNode path="e-commerce/">
            {data => {
              const { value } = data;
              if (value === null || typeof value === "undefined") return null;
              const values = Object.values(value);
              return(
                <EcommerceApp bazaDate={values} user={this.props.user}/>
              )
            }}
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
      </div>
    )
  }
}

export default Authenticated