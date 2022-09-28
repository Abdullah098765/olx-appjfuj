import { React, useEffect, useState } from 'react'
import { AppContext, AppProvider } from './Context/context'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import Home from './components/Home/home'
import Form from './components/Form/form'
import Edit_Form from './components/Edit-Form/edit-form'
import Product from './components/product/product.js'
import Category_Select from './components/Form/category_Select'
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import ChatRoom from './components/chat/chat.js'
import MyAds from './components/myads/myAds.js'
import Navbar from './components/Navbar/navbar'
import Blocked from './blocked.js'
import { io } from 'socket.io-client'
import Search from './components/search/search'
// import '../firebase-cloud-messaging-push-scope.js'
function App () {
  const firebaseConfig = {
    apiKey: 'AIzaSyB_Z0zstqHLmZCHCN0qafYG8eYOWTpwK0Y',
    authDomain: 'olx-app-9a451.firebaseapp.com',
    projectId: 'olx-app-9a451',
    storageBucket: 'olx-app-9a451.appspot.com',
    messagingSenderId: '430158411543',
    appId: '1:430158411543:web:7ae0bcb735ea9eed73e952',
    measurementId: 'G-4QLPCYRY9C'
  }
  const app = initializeApp(firebaseConfig)
  const messaging = getMessaging(app)

  const auth = getAuth()
  const [u, setU] = useState({})
  let { setUser, user } = useContext(AppContext)

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ uid: localStorage.getItem('uid') })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('https://olx-server-deploy.herokuapp.com/get-user', requestOptions)
      .then(response => response.text())
      .then(result => {
        setUser(JSON.parse(result))
        setU(JSON.parse(result))
      })
      .catch(error => ('error', error))

    if (u.blocked === true) {
      localStorage.setItem('blocked', 'true')
    } else localStorage.removeItem('blocked')
  })

  return (
    <div style={{ margin: 0 + 'px', padding: 0 + 'px' }}>
      {localStorage.getItem('blocked') === 'true' ? (
        <Blocked />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='select_category' element={<Category_Select />} />
          <Route path='post' element={<Form />} />
          <Route path='my_ads/edit_ad' element={<Edit_Form />} />
          <Route path='my_ads' element={<MyAds />} />
          <Route path='product' element={<Product />} />
          <Route path='search' element={<Search />} />
          <Route path='chat_room' element={<ChatRoom />} />
        </Routes>
      )}
    </div>
  )
}
export default App
