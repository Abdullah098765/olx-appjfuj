import React from "react";
import { Multiselect } from 'multiselect-react-dropdown'
import { useState } from "react";
import { Button } from "react-bootstrap";
import './form.css'
import { Link } from "react-router-dom";



export default function Category_Select(params) {
  const data = [
    { category: 'Mobiles' },
    { category: 'Vehicles' },
    { category: 'Property for Sale' },
    { category: 'Property for Rent' },
    { category: 'Electronics & Home Appliances' },
    { category: 'Bikes' },
    { category: 'Business, Industrial & Agriculture' },
    { category: 'Services' },
    { category: 'Jobs' },
    { category: 'Animals' },
    { category: 'Furniture & Home Decor' },
    { category: 'Kids' },
    { category: 'Books, Sports & Hobbies' },
    { category: 'Fashion & BeautyFashion & Beauty' },
  ]

  const [options] = useState(data)

  function select(e) {
    console.log(e);
  }

  return (
    <div style={{ width: "90%", justifyContent: "center", display: "flex" }}>
      <div>
        <h3>Choose Categories</h3>
        <hr />
        <Multiselect onSelect={(e) => select(e)} options={options} displayValue={'category'} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to="/post" ><Button className="next">Next</Button></Link>
      </div>
    </div>
  )
}