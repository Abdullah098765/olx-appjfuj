import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { height } from '@mui/system'
import Card from './Card'
import './card.css'

export default function Cards (params) {
  // let short = params.ad.adDiscription.substring(0, 50);

  return (
        <Card  ad = {params.ad}/>
      
  )
}
