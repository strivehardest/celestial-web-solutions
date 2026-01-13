// API route to verify Paystack payment
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ success: false, message: 'Payment reference is required' });
  }

  try {
    // Verify payment with Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      // Payment verified successfully
      return res.status(200).json({
        success: true,
        message: 'Payment verified',
        amount: data.data.amount / 100, // Paystack returns amount in kobo
        currency: data.data.currency,
        customerEmail: data.data.customer.email,
        customerName: data.data.customer.name || 'Customer',
        reference: data.data.reference,
        paidAt: data.data.paid_at,
        paymentMethod: data.data.authorization?.payment_type || 'Card',
        authorizationCode: data.data.authorization?.authorization_code,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment. Please contact support.',
    });
  }
}
