
Live demo available here: [https://ionutpantazi-ecommerce-react.firebaseapp.com/](https://ionutpantazi-ecommerce-react.firebaseapp.com/)
#### Features:
 - Login/Logout functionality (email, facebook, google and anonymous)
 - Register new users
 - Admin page (user: admin@admin.com; password: 123456)
 - Add and remove products
 - Filter products
 - Responsive design
 - ANTD design implementation

#### Instructions:
 - git clone https://github.com/ionutpantazi/E-commerce-react-app.git
 - create a new config file named **config.js** in **/src** folder and paste your own firebase config keys
 -  `npm install`
 -   `npm start`
 - development server will run on port 3000
#### Config.js example:
```
const firebaseConfig =  {  
	apiKey:  "<YOUR-API-KEY>",  
	authDomain:  "<YOUR-AUTH-DOMAIN>",  
	databaseURL:  "<YOUR-DATABASE-URL>",  
};
