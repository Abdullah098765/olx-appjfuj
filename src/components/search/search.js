import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/navbar'
import { AppContext } from '../../Context/context'
import './search.css'

export default function Search () {
  let { searchValue } = useContext(AppContext)
  let [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      searchValue
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:5001/search_ads', requestOptions)
      .then(response => response.text())
      .then(result => {
        setSearchResult(JSON.parse(result))
        console.log(searchResult)
      })
      .catch(error => ('error', error))
  })
  return (
    <div>
      <Navbar />
      <br></br>
      <p>Result for {searchValue}</p>
      <hr />
      <div className='container'>
        {searchResult.map(ad => (
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
                  //   onClick={() => {
                  //     if (
                  //       window.confirm(
                  //         "Once you will delete ad, you can't see it again."
                  //       ) === true
                  //     ) {
                  //       var myHeaders = new Headers()
                  //       myHeaders.append('Content-Type', 'application/json')

                  //       var raw = JSON.stringify({
                  //         idForDelete: ad._id
                  //       })

                  //       var requestOptions = {
                  //         method: 'POST',
                  //         headers: myHeaders,
                  //         body: raw,
                  //         redirect: 'follow'
                  //       }

                  //       fetch(
                  //         'https://olx-server-deploy.herokuapp.com/delete',
                  //         requestOptions
                  //       )
                  //         .then(response => response.text())
                  //         .then(result => {
                  //           console.log(result)
                  //         })
                  //         .catch(error => console.log('error', error))
                  //     }
                  //   }}
                >
                  See detail
                </button>
                <button
                  class='btn btn-outline-primary btn-sm mt-2'
                  type='button'
                  //   onClick={() => {
                  //     setEdit_ad(ad)
                  //     console.log(edit_ad);
                  //   }}
                  to='edit_ad'
                >
                  Contact seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
