import React from "react";
import firebase from "firebase/app";
import Authenticated from "./componente/LoginComponents/Authenticated";
import AdminPage from "./componente/LoginComponents/AdminPage";
import "firebase/auth";
import "firebase/database";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "./config";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            if (isSignedIn === false) {
              return (
                <div>
                  <Authenticated user={"true"} />
                </div>
              )
            }
          }}
        </FirebaseAuthConsumer>
        <IfFirebaseAuthedAnd
          filter={({ user }) => {
            return (
              user.email !== "admin@admin.com"
            );
          }}
        >
          {({ user }) => {
            return (
              <Authenticated user={user.email} />
            );
          }}
        </IfFirebaseAuthedAnd>
        <IfFirebaseAuthedAnd
          filter={({ user }) => {
            return (
              user.email == "admin@admin.com"
            );
          }}
        >
          {({ user }) => {
            return (
              <div>
                <AdminPage />
              </div>
            );
          }}
        </IfFirebaseAuthedAnd>
      </FirebaseAuthProvider>
    );
  };
};

export default App