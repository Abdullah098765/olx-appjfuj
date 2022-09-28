"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ChatRoom;

var _auth = require("firebase/auth");

var _react = _interopRequireWildcard(require("react"));

var _context = require("../../Context/context");

require("./chat.css");

var _socket = require("socket.io-client");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ChatRoom(params) {
  var auth = (0, _auth.getAuth)();

  var _useContext = (0, _react.useContext)(_context.AppContext),
      user = _useContext.user;

  setTimeout(function () {
    var socket = (0, _socket.io)('http://localhost:3001', {
      query: 'name=' + localStorage.getItem('uid')
    });
    socket.on('new-message-' + focusOnContact.contactId, function (data) {
      // let a = messages
      // a.push()
      setMessages(function (e) {
        return [].concat(_toConsumableArray(e), [data.fullDocument]);
      });
      console.log(messages);
    });
  }, 2000);

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      contacts = _useState2[0],
      setContacts = _useState2[1];

  var _useState3 = (0, _react.useState)(localStorage.getItem('uid')),
      _useState4 = _slicedToArray(_useState3, 2),
      userUid = _useState4[0],
      setUserUid = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      messages = _useState6[0],
      setMessages = _useState6[1];

  var _useState7 = (0, _react.useState)({
    contactId: '',
    receiverId: ''
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      focusOnContact = _useState8[0],
      setFocusOnContact = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = _slicedToArray(_useState9, 2),
      message = _useState10[0],
      setMessage = _useState10[1];

  (0, _react.useEffect)(function () {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      inboxId: userUid
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch('https://olx-server-deploy.herokuapp.com/my_contacts', requestOptions).then(function (response) {
      return response.text();
    }).then(function (result) {
      setContacts(JSON.parse(result));
      console.log(JSON.parse(result));
    })["catch"](function (error) {
      return console.error('error', error);
    });
  });

  function onFocusOnAContact(e) {
    var a = focusOnContact;
    a.contactId = e.contactId;
    a.receiverId = e.receiverId;
    setFocusOnContact(a);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      contactId: focusOnContact.contactId,
      currentUserId: auth.currentUser.uid
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch('https://olx-server-deploy.herokuapp.com/on-focus-on-contact', requestOptions).then(function (response) {
      return response.text();
    }).then(function (result) {
      setMessages(JSON.parse(result));
    })["catch"](function (error) {
      return 'error', error;
    });
  }

  function send(params) {
    if (message !== '') {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        message: message,
        senderName: auth.currentUser.displayName,
        senderId: auth.currentUser.uid,
        senderPic: auth.currentUser.photoURL,
        receiverId: focusOnContact.receiverId,
        contactId: focusOnContact.contactId
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch('https://olx-server-deploy.herokuapp.com/messages', requestOptions).then(function (response) {
        return response.text();
      }).then(function (result) {})["catch"](function (error) {
        return 'error', error;
      });
      setMessage('');
    } else console.log('Empty input');
  } // return (
  //   <div>
  //     <div class='container bootstrap snippets bootdey'>
  //       <div class='row'>
  //         <div class='col-md-4 bg-white '>
  //           <div
  //             class=' row border-bottom padding-sm'
  //             style={{ height: '40px' }}
  //           >
  //             Contacts
  //           </div>
  //           {/* <!-- member list --> */}
  //           <ul class='friend-list'>
  //             {contacts.map(contact => (
  //               <li
  //                 key={contact._id}
  //                 className='member'
  //                 onFocus={() =>
  //                   onFocusOnAContact({
  //                     contactId: contact._id,
  //                     receiverId: contact.sellerUid
  //                   })
  //                 }
  //               >
  //                 <a href='#' class='clearfix'>
  //                   <img src={contact.ad.img} alt='' class='img-circle' />
  //                   <div class='friend-name'>
  //                     <strong>{contact.ad.adTitle}</strong>
  //                   </div>
  //                   <div class='last-message text-muted'>
  //                     {contact.seller.displayName} : {contact.clientId}
  //                   </div>
  //                   {contact.seller.isOnline && contact.client.isOnline ? (
  //                     <small class='time text-muted'>
  //                       <b class='text-success'>Online</b>
  //                     </small>
  //                   ) : (
  //                     <small class='time text-muted'>Offline</small>
  //                   )}
  //                   <small class='chat-alert text-muted'>
  //                     <i class='fa fa-check'></i>
  //                   </small>
  //                 </a>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //         <div class='col-md-8 bg-white '>
  //           <div class='chat-message'>
  //             <ul class='chat'>
  //               {messages.map(msg => (
  //                 <div>
  //                   {msg.senderId === auth.currentUser.uid ? (
  //                     <li key={msg.creatAt} class='left clearfix'>
  //                       <span class='chat-img pull-left'>
  //                         <img src={msg.senderPic} alt='User Avatar' />
  //                       </span>
  //                       <div class='chat-body clearfix'>
  //                         <div class='header'>
  //                           <strong class='primary-font'>
  //                             {msg.senderName}
  //                           </strong>
  //                           <small class='pull-right text-muted'>
  //                             <i class='fa fa-clock-o'></i> 12 mins ago
  //                           </small>
  //                         </div>
  //                         <p>{msg.message}</p>
  //                       </div>
  //                     </li>
  //                   ) : (
  //                     <li key={msg.creatAt} class='right clearfix'>
  //                       <span class='chat-img pull-right'>
  //                         <img src={msg.senderPic} alt='User Avatar' />
  //                       </span>
  //                       <div class='chat-body clearfix'>
  //                         <div class='header'>
  //                           <strong class='primary-font'>
  //                             {msg.senderName}
  //                           </strong>
  //                           <small class='pull-right text-muted'>
  //                             <i class='fa fa-clock-o'></i> 13 mins ago
  //                           </small>
  //                         </div>
  //                         <p>{msg.message}</p>
  //                       </div>
  //                     </li>
  //                   )}
  //                 </div>
  //               ))}
  //             </ul>
  //           </div>
  //           <div class='chat-box bg-white'>
  //             {focusOnContact.contactId !== ''?<div class='input-group'>
  //               <input className='input'
  //                 onKeyPress={e => {
  //                   if (e.code === 'Enter') {
  //                     send()
  //                   }
  //                 }}
  //                 value={message}
  //                 class='form-control border no-shadow no-rounded'
  //                 placeholder='Type your message here'
  //                 onChange={e => setMessage(e.target.value)}
  //               />
  //               <span class='input-group-btn'>
  //                 <button
  //                   class='btn btn-success no-rounded'
  //                   type='button'
  //                   onClick={e => send(e)}
  //                 >
  //                   Send
  //                 </button>
  //               </span>
  //             </div>:''}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

}