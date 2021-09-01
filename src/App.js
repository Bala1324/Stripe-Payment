import React ,{useState} from 'react';
import logo from './logo.svg'
// import {response} from 'express';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'





function App() {

  const [product, setProduct] = useState({
    name:'Shopping',
    price: 10,
    productBy : 'bala'
  });

  const makePayment = token => {
    const body = {
       token, 
       product
    }
    const headers = {
      "Content-Type": "application.json"
    }

    return fetch(`http://localhost:8282/payment`, {
      method : "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONCE", response);
      const {status} = response;
      console.log("STATUS", status);;
    })
    .catch(error => console.log(error))

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        stripeKey = 'pk_test_51JU7zhSJFCCnwNP2haY9oa7ZE9dMTsHXZ5fdqeLK9syDJRF0rzVzxok2UX4kG21MFe5ajAUK5sRq746zF1dDSP7N00ZUINhZjO'
        token = {makePayment}
        name = 'buy react'
        amount = {product.price * 100}>
          <button className = "btn-large pink">By react is {product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
