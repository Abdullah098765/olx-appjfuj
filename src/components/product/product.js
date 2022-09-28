import React from 'react'
import './product.css'
import Navbar from '../Navbar/navbar'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/context'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'
import MyMapComponent from './map'
import { MapContainer, TileLayer, useMap, Popup } from 'react-leaflet'
import Slider from './slider'

export default function Product (params) {
  const url = window.location.href
  const strs = url.split('_id=')
  const id = strs.at(-1)

  const [ad, setAd] = useState({})

  const auth = getAuth()
  let { adsList, setAdsList, getAdsList, user } = useContext(AppContext)

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ id, viewerId: localStorage.getItem('uid') })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:5001/views', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result))
      })
      .catch(error => ('error', error))

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ id })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('https://olx-server-deploy.herokuapp.com/posts', requestOptions)
      .then(response => response.text())
      .then(result => {
        setAd(JSON.parse(result))
        console.log(JSON.parse(result))
      })
      .catch(error => ('error', error))

    // console.log(ad.latitude, ad.longitude);
  })

  function contactWithSeller (params) {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      sellerName: ad.ownerName,
      sellerUid: ad.ownerId,
      seller: ad.seller._id,
      ad: ad._id,
      online: true,
      clientName: auth.currentUser.displayName,
      clientId: auth.currentUser.uid,
      client: user._id
    })
    console.log(raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('https://olx-server-deploy.herokuapp.com/contacts', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result))
      })
      .catch(error => ('error', error))
  }
  return (
    <div>
      <Navbar />

      <main>
        <div class='container dark-grey-text mt-5'>
          <div class='row wow fadeIn'>
            <div class='col-md-6 mb-4'>
              <Slider images={ad.images} />
            </div>

            <div class='col-md-6 mb-4'>
              <div class='p-4'>
                <div class='mb-3'>
                  <a href=''>
                    <span class='badge purple mr-1'>
                      Ad created by {ad.ownerName}
                    </span>
                  </a>
                  <a href=''>
                    <span class='badge blue mr-1'>{ad.condition}</span>
                  </a>
                  <a href=''>
                    <span class='badge red mr-1'>City : {ad.city}</span>
                  </a>
                </div>

                <p class='lead'>
                  <span class='mr-1'>{/* <del>$200</del> */}</span>
                  <span>
                    <b>Price: </b> ${ad.price}
                  </span>
                </p>

                <p class='lead font-weight-bold'>Description</p>

                <p>{ad.adDiscription}</p>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div class='d-flex justify-content-left'>
                  <button
                    class='btn btn-primary btn-md my-0 p'
                    onClick={() => contactWithSeller()}
                    type='submit'
                  >
                    <Link to='/chat_room' className='text-white'>
                      Contact With Seller
                    </Link>
                    <i class='fas fa-shopping-cart ml-1'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {ad.latitude && (
            <MapContainer
              center={[ad.latitude, ad.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              className='map'
            >
              <TileLayer
                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </MapContainer>
          )}
          <hr></hr>

          <div class='row d-flex justify-content-center wow fadeIn'>
            <div class='col-md-6 text-center'>
              <h4 class='my-4 h4'>Additional information</h4>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                suscipit modi sapiente illo soluta odit voluptates, quibusdam
                officia. Neque quibusdam quas a quis porro? Molestias illo neque
                eum in laborum.
              </p>
            </div>
          </div>

          <div class='row wow fadeIn'>
            <div class='col-lg-4 col-md-12 mb-4'>
              <img
                src='https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg'
                class='img-fluid'
                alt=''
              />
            </div>

            <div class='col-lg-4 col-md-6 mb-4'>
              <img
                src='https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg'
                class='img-fluid'
                alt=''
              />
            </div>

            <div class='col-lg-4 col-md-6 mb-4'>
              <img
                src='https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg'
                class='img-fluid'
                alt=''
              />
            </div>
          </div>
        </div>
      </main>

      <footer class='page-footer text-center font-small mt-4 wow fadeIn'>
        <div class='pt-4'>
          <a
            class='btn btn-outline-white'
            href='https://mdbootstrap.com/docs/jquery/getting-started/download/'
            target='_blank'
            role='button'
          >
            Download MDB
            <i class='fas fa-download ml-2'></i>
          </a>
          <a
            class='btn btn-outline-white'
            href='https://mdbootstrap.com/education/bootstrap/'
            target='_blank'
            role='button'
          >
            Start free tutorial
            <i class='fas fa-graduation-cap ml-2'></i>
          </a>
        </div>

        <hr class='my-4'></hr>

        <div class='pb-4'>
          <a href='https://www.facebook.com/mdbootstrap' target='_blank'>
            <i class='fab fa-facebook-f mr-3'></i>
          </a>

          <a href='https://twitter.com/MDBootstrap' target='_blank'>
            <i class='fab fa-twitter mr-3'></i>
          </a>

          <a href='https://www.youtube.com/watch?v=7MUISDJ5ZZ4' target='_blank'>
            <i class='fab fa-youtube mr-3'></i>
          </a>

          <a
            href='https://plus.google.com/u/0/b/107863090883699620484'
            target='_blank'
          >
            <i class='fab fa-google-plus-g mr-3'></i>
          </a>

          <a href='https://dribbble.com/mdbootstrap' target='_blank'>
            <i class='fab fa-dribbble mr-3'></i>
          </a>

          <a href='https://pinterest.com/mdbootstrap' target='_blank'>
            <i class='fab fa-pinterest mr-3'></i>
          </a>

          <a
            href='https://github.com/mdbootstrap/bootstrap-material-design'
            target='_blank'
          >
            <i class='fab fa-github mr-3'></i>
          </a>

          <a href='http://codepen.io/mdbootstrap/' target='_blank'>
            <i class='fab fa-codepen mr-3'></i>
          </a>
        </div>

        <div class='footer-copyright py-3'>
          © 2018 Copyright:
          <a
            href='https://mdbootstrap.com/education/bootstrap/'
            target='_blank'
          >
            {' '}
            MDBootstrap.com{' '}
          </a>
        </div>
      </footer>
    </div>

    //         <div>
    // <main class="container">

    //  <div class="left-column">
    //    <img data-image="black" src="images/black.png" alt=""/>
    //    <img data-image="blue" src="images/blue.png" alt=""/>
    //    <img data-image="red" class="active" src="images/red.png" alt=""/>
    //  </div>

    //  <div class="right-column">

    //    <div class="product-description">
    //      <span>Headphones</span>
    //      <h1>Beats EP</h1>
    //      <p>The preferred choice of a vast range of acclaimed DJs. Punchy, bass-focused sound and high isolation. Sturdy headband and on-ear cushions suitable for live performance</p>
    //    </div>

    //    <div class="product-configuration">

    //      <div class="product-color">
    //        <span>Color</span>

    //        <div class="color-choose">
    //          <div>
    //            <input data-image="red" type="radio" id="red" name="color" value="red" checked />
    //            <label for="red"><span></span></label>
    //          </div>
    //          <div>
    //            <input data-image="blue" type="radio" id="blue" name="color" value="blue"/>
    //            <label for="blue"><span></span></label>
    //          </div>
    //          <div>
    //            <input data-image="black" type="radio" id="black" name="color" value="black"/>
    //            <label for="black"><span></span></label>
    //          </div>
    //        </div>

    //      </div>

    //      <div class="cable-config">
    //        <span>Cable configuration</span>

    //        <div class="cable-choose">
    //          <button>Straight</button>
    //          <button>Coiled</button>
    //          <button>Long-coiled</button>
    //        </div>

    //        <a href="#">How to configurate your headphones</a>
    //      </div>
    //    </div>

    //    <div class="product-price">
    //      <span>148$</span>
    //      <a href="#" class="cart-btn">Add to cart</a>
    //    </div>
    //  </div>
    // </main>
    //  </div>
  )
}
