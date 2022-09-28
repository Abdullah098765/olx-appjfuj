import React from 'react'



export default function Card (params) {
  // console.log(params.ad)
  return (
    <div class='item col-xs-4 col-lg-4'>
      <img src='' />

      <div class='thumbnail card'>
        <div class='img-event'>
          <img
            class='group list-group-image img-fluid'
            src={params.ad.images[0]}
            alt=''
          />
        </div>
        <div class='caption card-body'>
          <h4 class='group card-title inner list-group-item-heading'>
            {params.ad.adTitle}
          </h4>
          <p class='group inner list-group-item-text'>
            {params.ad.adDiscription}
          </p>
          <p class='lead'>Location : {params.ad.city}</p>
          <div class='row'>
            <div class='col-xs-12 col-md-6'>
              <p class='lead'>${params.ad.price}</p>
              <p class='text-sm-start'>Viwes: {params.ad.viwesCount.length-1}</p>
              <p class='text-sm-start text-danger'> {params.ad.expired?<b>Expired</b>:''}</p>
            

            </div>
            <div class='col-xs-12 col-md-6'>

              <a
                class='btn btn-success'
                href={'https://olx-app-9a451.firebaseapp.com/product?_id=' + params.ad._id}
                target='_'
              >
                See details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
