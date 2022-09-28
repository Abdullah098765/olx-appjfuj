import { getAuth } from 'firebase/auth'
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../Context/context'
import './chat.css'
import { io } from 'socket.io-client'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import CallIcon from '@mui/icons-material/Call'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

export default function ChatRoom (params) {
  const auth = getAuth()
  let { user } = useContext(AppContext)
  const messaging = getMessaging()

  useEffect(() => {
    var socket = io('https://olx-server-deploy.herokuapp.com', {
      query: 'name=' + localStorage.getItem('uid')
    })

    socket.on('new-message-' + focusOnContact.contactId, data => {
      let a = messages
      // a.push()
      // console.log(data)

      function push (array, item) {
        if (!array.find(({ _id }) => _id === item._id)) {
          array.push(item)
        }
      }
      push(a, data.fullDocument)
      setMessages(a)

      console.log(messages)
    })

    console.log(focusOnContact.contactId)
  }, [])
  const [contacts, setContacts] = useState([])
  const [userUid, setUserUid] = useState(localStorage.getItem('uid'))
  const [messages, setMessages] = useState([])
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState({ url: '', type: '' })
  const [focusOnContact, setFocusOnContact] = useState({
    contactId: '',
    receiverId: ''
  })

  function requestPermission () {
    console.log('Requesting permission...')
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.')

        getToken(messaging, {
          vapidKey:
            'BEuKKP177oI4VLpxb5EWWU-7RG0FkzwMuuAIeuOl3dqnX5Cn-mg903ksZ4xPLNSE33hTAR-K2rab8vnHtMUzDOg'
        })
          .then(currentToken => {
            if (currentToken) {
              console.log(
                'Send the token to your server and update the UI if necessary'
              )
            } else {
              // Show permission request UI
              console.log(
                'No registration token available. Request permission to generate one.'
              )
            }
          })
          .catch(err => {
            console.log('An error occurred while retrieving token. ', err)
            // ...
          })
      }
    })
  }
  const [message, setMessage] = useState('')

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      inboxId: userUid
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('https://olx-server-deploy.herokuapp.com/my_contacts', requestOptions)
      .then(response => response.text())
      .then(result => {
        setContacts(JSON.parse(result))
      })
      .catch(error => console.error('error', error))
  })

  function onFocusOnAContact (e) {
    let a = focusOnContact

    a.contactId = e.contactId
    a.receiverId = e.receiverId
    setFocusOnContact(a)

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      contactId: focusOnContact.contactId,
      currentUserId: auth.currentUser.uid
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch(
      'https://olx-server-deploy.herokuapp.com/on-focus-on-contact',
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        setMessages(JSON.parse(result))
      })
      .catch(error => ('error', error))
  }

  function send (params) {
    requestPermission()
    if (message !== '') {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        message,
        senderName: auth.currentUser.displayName,
        senderId: auth.currentUser.uid,
        senderPic: auth.currentUser.photoURL,
        receiverId: focusOnContact.receiverId,
        contactId: focusOnContact.contactId,
        file: { fileURL: file.url, fileType: file.type }
      })
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('https://olx-server-deploy.herokuapp.com/messages', requestOptions)
        .then(response => response.text())
        .then(result => {})
        .catch(error => ('error', error))
      setMessage('')
      setFile({ url: '', type: '' })
      // messages.push(JSON.parse(raw))
    } else console.log('Empty input')
  }

  function selectImages (e) {
    setMessage(e.target.files[0].name)

    console.log(e.target.files)

    const storage = getStorage()
    const storageRef = ref(storage, 'files/' + e.target.files[0].name)

    // 'file' comes from the Blob or File API
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])
    let a = file
    a.type = uploadTask._blob.type_
    setFile(a)
    uploadTask.on(
      'state_changed',
      () => {},
      e => {
        console.info(e)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          let a = file
          a.url = url
          setFile(a)
          console.log(file)
        })
      }
    )
  }
  return (
    <div>
      <div class='container bootstrap snippets bootdey'>
        <div class='row'>
          <div class='col-md-4 bg-white '>
            <div
              class=' row border-bottom padding-sm'
              style={{ height: '40px' }}
            >
              Contacts
            </div>

            {/* <!-- member list --> */}
            <ul class='friend-list'>
              {contacts.map(contact => (
                <li
                  key={contact._id}
                  className='member'
                  onFocus={() =>
                    onFocusOnAContact({
                      contactId: contact._id,
                      receiverId: contact.sellerUid
                    })
                  }
                >
                  <a href='#' class='clearfix'>
                    <img src={contact.ad.img} alt='' class='img-circle' />
                    <div class='friend-name'>
                      <strong>{contact.ad.adTitle}</strong>
                    </div>
                    <div class='last-message text-muted'>
                      {contact.seller.displayName} : {contact.clientId}
                    </div>
                    {contact.seller.isOnline && contact.client.isOnline ? (
                      <small class='time text-muted'>
                        <b class='text-success'>Online</b>
                      </small>
                    ) : (
                      <small class='time text-muted'>Offline</small>
                    )}
                    <small class='chat-alert text-muted'>
                      <i class='fa fa-check'></i>
                    </small>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {focusOnContact.contactId !== '' ? (
            <div class='col-md-8 bg-white '>
              <div class='chat'>
                <div class='chat-header clearfix'>
                  <div class='row'>
                    <div class='col-lg-6'>
                      <a data-toggle='modal' data-target='#view_info'>
                        <img
                          src='https://bootdey.com/img/Content/avatar/avatar2.png'
                          alt='avatar'
                        />
                      </a>
                      <div class='chat-about'>
                        <h6 class='m-b-0'>Aiden Chavez</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div class='col-lg-6 hidden-sm text-right'>
                      <label htmlFor='images' class='btn btn-outline-secondary'>
                        <i class='fa fa-camera'>
                          <AttachFileIcon />
                          <input
                            type='file'
                            onChange={e => selectImages(e)}
                            id='images'
                            className='file'
                          />
                        </i>
                      </label>
                      <label htmlFor='file' class='btn btn-outline-secondary'>
                        <i class='fa fa-camera'>
                          <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                          <input type='file' id='file' className='file' />
                        </i>
                      </label>
                      <label htmlFor='voice' class='btn btn-outline-secondary'>
                        <i class='fa fa-camera'>
                          <KeyboardVoiceIcon />
                          <input type='voice' id='file' className='file' />
                        </i>
                      </label>
                      <label htmlFor='call' class='btn btn-outline-secondary'>
                        <i class='fa fa-camera'>
                          <CallIcon />
                          <input type='file' id='call' className='file' />
                        </i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class='chat-message'>
                <ul class='chat'>
                  {messages.map(msg => (
                    <div>
                      {msg.senderId === auth.currentUser.uid ? (
                        <div>
                          <li key={msg.creatAt} class='left clearfix'>
                            <span class='chat-img pull-left'>
                              <img src={msg.senderPic} alt='User Avatar' />
                            </span>
                            <div class='chat-body clearfix'>
                              <div class='header'>
                                <strong class='primary-font'>
                                  {msg.senderName}
                                </strong>
                                <small class='pull-right text-muted'>
                                  <i class='fa fa-clock-o'></i> 12 mins ago
                                </small>
                              </div>
                              <p>{msg.message}</p>
                            </div>
                          </li>
                          {msg.file.fileURL !== '' ? (
                            <div>
                              {msg.file.type == 'text/html' ? (
                                <img
                                  className='sentImage'
                                  onClick={() => {
                                    window.open(msg.file.fileURL)
                                  }}
                                  src={
                                    'https://assets.dryicons.com/uploads/icon/svg/5923/473dc604-c750-41f5-b394-1b9d1799ff06.svg'
                                  }
                                />
                              ) : (
                                <img
                                  className='sentImage'
                                  onClick={() => {
                                    window.open(msg.file.fileURL)
                                  }}
                                  src={msg.file.fileURL}
                                />
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ) : (
                        <div>
                          <li key={msg.creatAt} class='right clearfix'>
                            <span class='chat-img pull-right'>
                              <img src={msg.senderPic} alt='User Avatar' />
                            </span>
                            <div class='chat-body clearfix'>
                              <div class='header'>
                                <strong class='primary-font'>
                                  {msg.senderName}
                                </strong>
                                <small class='pull-right text-muted'>
                                  <i class='fa fa-clock-o'></i> 13 mins ago
                                </small>
                              </div>
                              <p>{msg.message}</p>
                            </div>
                          </li>

                          {msg.file.fileURL !== '' ? (
                            <img
                              className='recievedImage'
                              onClick={() => window.open(msg.file.fileURL)}
                              src={msg.file.fileURL}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
              <div class='chat-box bg-white'>
                <div class='input-group'>
                  <input
                    className='input'
                    onKeyPress={e => {
                      if (e.code === 'Enter') {
                        send()
                      }
                    }}
                    value={message}
                    class='form-control border no-shadow no-rounded'
                    placeholder='Type your message here'
                    onChange={e => setMessage(e.target.value)}
                  />
                  <span class='input-group-btn'>
                    <button
                      class='btn btn-success no-rounded'
                      type='button'
                      onClick={e => send(e)}
                    >
                      Send
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
