import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../Context/context.js'
import './myAds.css'
import Navbar from '../Navbar/navbar'
import { Link } from 'react-router-dom'

export default function MyAds (params) {
  let { user, edit_ad, setEdit_ad } = useContext(AppContext)

  const [myAdsList, setMyAdsList] = useState([])
  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      myId: user.uid
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('https://olx-server-deploy.herokuapp.com/get_my_ads', requestOptions)
      .then(response => response.text())
      .then(result => {
        setMyAdsList(JSON.parse(result))
      })
      .catch(error => console.log('error', error))
  })
  return (
    <div>
      <Navbar />

      <div class='container mt-5 mb-5'>
        <div class='d-flex justify-content-center row'>
          <div class='col-md-10'>
            {myAdsList.map(ad => (
              <div class='row p-2 bg-white border rounded'>
                <div class='col-md-3 mt-1'>
                  <img
                    class='img-fluid img-responsive rounded product-image'
                    src={ad.img}
                  />
                </div>
                <div class='col-md-6 mt-1'>
                  <h5>{ad.adTitle}</h5>

                  <p class='text-justify text-truncate para mb-0'>
                    {ad.adDiscription}
                  </p>
                </div>
                <div class='align-items-center align-content-center col-md-3 border-left mt-1'>
                  <div class='d-flex flex-row align-items-center'>
                    <h4 class='mr-1'>${ad.price}</h4>
                  </div>
                  <h6 class='text-success'>Location : {ad.city}</h6>
                  <div class='d-flex flex-column mt-4'>
                    <button
                      class='btn btn-primary btn-sm'
                      type='button'
                      onClick={() => {
                        if (
                          window.confirm(
                            "Once you will delete ad, you can't see it again."
                          ) === true
                        ) {
                          var myHeaders = new Headers()
                          myHeaders.append('Content-Type', 'application/json')

                          var raw = JSON.stringify({
                            idForDelete: ad._id
                          })

                          var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                          }

                          fetch(
                            'https://olx-server-deploy.herokuapp.com/delete',
                            requestOptions
                          )
                            .then(response => response.text())
                            .then(result => {
                              console.log(result)
                            })
                            .catch(error => console.log('error', error))
                        }
                      }}
                    >
                      Delete Ad
                    </button>
                    <Link
                      class='btn btn-outline-primary btn-sm mt-2'
                      type='button'
                      onClick={() => {
                        setEdit_ad(ad)
                        console.log(edit_ad);
                      }}
                      to='edit_ad'

                    >
                      Edit Ad
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
