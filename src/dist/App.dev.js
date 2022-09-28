"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _context = require("./Context/context");

var _reactRouterDom = require("react-router-dom");

var _home = _interopRequireDefault(require("./components/Home/home"));

var _form = _interopRequireDefault(require("./components/Form/form"));

var _editForm = _interopRequireDefault(require("./components/Edit-Form/edit-form"));

var _product = _interopRequireDefault(require("./components/product/product.js"));

var _category_Select = _interopRequireDefault(require("./components/Form/category_Select"));

var _auth = require("firebase/auth");

var _app = require("firebase/app");

var _chat = _interopRequireDefault(require("./components/chat/chat.js"));

var _myAds = _interopRequireDefault(require("./components/myads/myAds.js"));

var _socket = require("socket.io-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function App() {
  var firebaseConfig = {
    apiKey: 'AIzaSyB_Z0zstqHLmZCHCN0qafYG8eYOWTpwK0Y',
    authDomain: 'olx-app-9a451.firebaseapp.com',
    projectId: 'olx-app-9a451',
    storageBucket: 'olx-app-9a451.appspot.com',
    messagingSenderId: '430158411543',
    appId: '1:430158411543:web:7ae0bcb735ea9eed73e952',
    measurementId: 'G-4QLPCYRY9C'
  };
  var app = (0, _app.initializeApp)(firebaseConfig);
  var auth = (0, _auth.getAuth)();

  var _useContext = (0, _react.useContext)(_context.AppContext),
      setUser = _useContext.setUser,
      user = _useContext.user;

  (0, _react.useEffect)(function () {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      uid: localStorage.getItem('uid')
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch('https://olx-server-deploy.herokuapp.com/get-user', requestOptions).then(function (response) {
      return response.text();
    }).then(function (result) {
      setUser(JSON.parse(result));
    })["catch"](function (error) {
      return 'error', error;
    }); // console.log(user)
  });
  return {};
}

var _default = App;
exports["default"] = _default;