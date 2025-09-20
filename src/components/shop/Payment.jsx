import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Initialize Stripe with your test mode publishable key
const stripePromise = loadStripe('sk_test_51QG1tVBMpvCO65tHnymjHCyzKjzprGnA4GbyCjHprfhYWwqFw8JqRaNAD2WKKJ7jQEUVnzRa6qzWqo0pYB8ae3gW00VtFfR7WX'); // Replace with your Stripe test publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // Fetch client secret from your backend (PaymentIntent)
  useEffect(() => {
    // Replace with your backend endpoint
    fetch('https://server-anis-portfolio.vercel.app/api/v1/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: Math.round(totalAmount * 100) }), // Amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => setError('Failed to initialize payment'));
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Test Customer', // You can pull this from your checkout form data
        },
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment Details</h2>
      {succeeded ? (
        <div className="text-center py-8">
          <div className="text-green-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-6">Your order has been processed successfully.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Information (Use 4242 4242 4242 4242 for testing)
            </label>
            <div className="border border-gray-300 rounded-lg p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              !stripe || processing || !clientSecret
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
          </button>
        </form>
      )}
    </div>
  );
};

const Payment = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;