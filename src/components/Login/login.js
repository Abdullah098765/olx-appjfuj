import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { Button } from '@mui/material'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { AppContext } from '../../Context/context'
import './login.css'

function Login (params) {
  let { setUser, user, showModal, setShowModal } = useContext(AppContext)

  const auth = getAuth()

  function login_With_Google (params) {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then(result => {
      const user = result.user
      window.localStorage.setItem('uid',user.uid)


      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify(user)

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('https://olx-server-deploy.herokuapp.com/user', requestOptions)
        .then(response => response.text())
        .then(result => {
          
        })
        .catch(error => ('error', error))
      setShowModal(false)
    })
  }

  return (
    <div>
      {auth.currentUser === null ? (
        <Button onClick={() => setShowModal(true)}>Login</Button>
      ) : (
        <Button
          onClick={() => {
            signOut(auth).then((e) => {
              setUser({})
              console.log(e)
            })
          }}
        >
          Logout
        </Button>
      )}

      <Modal show={showModal}>
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title>WELCOME TO OLX</Modal.Title>
        </Modal.Header>
        <p>The trusted community of buyers and sellers.</p>
        <Modal.Body>
          <Button onClick={() => login_With_Google()}>
            Continue with Google
          </Button>
          <Button>Continue with Email</Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Login
