// supabase/functions/send-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get environment variables
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const OWNER_EMAIL = Deno.env.get('OWNER_EMAIL') || 'owner@coffeecraft.com'
    
    // For GET requests, return a simple status message
    if (req.method === 'GET') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email service is running',
          resendKeyConfigured: !!RESEND_API_KEY,
          ownerEmail: OWNER_EMAIL
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // For POST requests, process email sending
    if (req.method === 'POST') {
      // Parse the request body
      const requestData = await req.json()
      const { orderData, type } = requestData
      
      if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured in Supabase secrets')
      }

      if (!orderData || !orderData.orderNumber) {
        throw new Error('Invalid order data provided')
      }

      console.log(`Processing ${type} email for order: ${orderData.orderNumber}`)

      // Prepare email content based on type
      let emailTo
      let emailSubject
      let emailHtml

      if (type === 'customer') {
        if (!orderData.customerInfo?.email) {
          throw new Error('Customer email is missing')
        }
        
        emailTo = orderData.customerInfo.email
        emailSubject = `Order Confirmation #${orderData.orderNumber}`
        emailHtml = `<p>Thank you for your order #${orderData.orderNumber}!</p>`
      } else if (type === 'owner') {
        emailTo = OWNER_EMAIL
        emailSubject = `New Order #${orderData.orderNumber} - CoffeeCraft Admin Notification`
        emailHtml = `<p>New order received: #${orderData.orderNumber}</p>`
      } else {
        throw new Error('Invalid email type. Must be "customer" or "owner"')
      }

      // Send email via Resend API
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: emailTo,
          subject: emailSubject,
          html: emailHtml,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Resend API error:', errorText)
        throw new Error(`Failed to send email via Resend: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log(`Email sent successfully to ${emailTo}, Message ID: ${result.id}`)

      return new Response(
        JSON.stringify({ 
          success: true, 
          messageId: result.id,
          sentTo: emailTo,
          type: type
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // If not GET or POST, return method not allowed
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      },
    )

  } catch (error) {
    console.error('Error in send-email function:', error.message)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})