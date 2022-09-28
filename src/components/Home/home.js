import React from 'react'
import Navbar from '../Navbar/navbar'
import { AppContext } from '../../Context/context'
import { useState, useContext, useEffect } from 'react'
import Slider from './slider.js'
import Cards from './cards'
import OneCard from './Card'

export default function Home (params) {
  let { adsList, setAdsList } = useContext(AppContext)
  let { city, setCity, getCity } = useContext(AppContext)

  const [list, setList] = useState([])

  useEffect(() => {
    if (city === '' ||  city === 'All Ads') {
      fetch('https://olx-server-deploy.herokuapp.com/get_posts')
        .then(response => response.text())
        .then(result => {
          setList(JSON.parse(result))
          setAdsList(JSON.parse(result))
          // console.log(adsList)
        }).catch((err)=>{
          console.error(err);
        })
    } else {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        city: city
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('https://olx-server-deploy.herokuapp.com/get_posts', requestOptions)
        .then(response => response.text())
        .then(result => {
          setList(JSON.parse(result))
          setAdsList(JSON.parse(result))
          // console.log(adsList)
        })
        .catch(error => console.log('error', error))
    }
  })

  return (
    <div>
      <Navbar />
      <Slider />

      <div class='container'>
        <div id='products' class='row view-group'>
          <div className='row'>
            {list.map(ad => (
              <Cards ad={ad} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
