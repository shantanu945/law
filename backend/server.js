const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const RETELL_API_KEY = process.env.RETELL_API_KEY;
const AGENT_ID = process.env.AGENT_ID;

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'LawRato AI Receptionist Backend Server',
        version: '1.0.0'
    });
});

// Create web call endpoint
app.post('/create-web-call', async (req, res) => {
    try {
        console.log('Creating web call for agent:', AGENT_ID);

        if (!RETELL_API_KEY || !AGENT_ID) {
            throw new Error('Missing required environment variables: RETELL_API_KEY or AGENT_ID');
        }

        // Call Retell API to create a web call
        const response = await axios.post(
            'https://api.retellai.com/v2/create-web-call',
            {
                agent_id: AGENT_ID,
            },
            {
                headers: {
                    'Authorization': `Bearer ${RETELL_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Web call created successfully');

        // Return the access token to the frontend
        res.json({
            access_token: response.data.access_token,
            call_id: response.data.call_id,
        });

    } catch (error) {
        console.error('Error creating web call:', error.response?.data || error.message);

        res.status(500).json({
            error: 'Failed to create web call',
            message: error.response?.data?.message || error.message,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📞 Agent ID: ${AGENT_ID}`);
    console.log(`🔑 API Key configured: ${RETELL_API_KEY ? 'Yes' : 'No'}`);
});
