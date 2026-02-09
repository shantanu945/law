// Retell Web SDK Integration
const BACKEND_URL = 'http://localhost:8000';

let retellWebClient;
let isCallActive = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded, initializing...');
    checkRetellSDK();
    initializeRetellClient();
    setupEventListeners();
});

function checkRetellSDK() {
    if (typeof window.RetellWebClient === 'undefined') {
        console.error('❌ Retell Web SDK not loaded! Check your internet connection.');
        alert('Error: Retell Web SDK failed to load. Please check your internet connection and refresh the page.');
        return false;
    }
    console.log('✅ Retell Web SDK loaded successfully');
    return true;
}

function initializeRetellClient() {
    try {
        if (!checkRetellSDK()) {
            return;
        }

        const RetellWebClient = window.RetellWebClient;
        retellWebClient = new RetellWebClient();

        // Set up Retell event listeners
        retellWebClient.on('call_started', handleCallStarted);
        retellWebClient.on('call_ended', handleCallEnded);
        retellWebClient.on('agent_start_talking', handleAgentStartTalking);
        retellWebClient.on('agent_stop_talking', handleAgentStopTalking);
        retellWebClient.on('error', handleError);
        retellWebClient.on('update', (update) => {
            console.log('📊 Call update:', update);
        });

        console.log('✅ Retell client initialized successfully');
        console.log('Client object:', retellWebClient);
    } catch (error) {
        console.error('❌ Failed to initialize Retell client:', error);
        alert('Error initializing AI client: ' + error.message);
    }
}

function setupEventListeners() {
    const startCallBtn = document.getElementById('startCallBtn');
    const endCallBtn = document.getElementById('endCallBtn');

    if (startCallBtn) {
        startCallBtn.addEventListener('click', startCall);
    }

    if (endCallBtn) {
        endCallBtn.addEventListener('click', endCall);
    }
}

async function startCall() {
    if (isCallActive) {
        console.log('⚠️ Call already in progress');
        return;
    }

    // Check if client is initialized
    if (!retellWebClient) {
        console.error('❌ Retell client not initialized');
        alert('AI client not ready. Please refresh the page and try again.');
        return;
    }

    try {
        console.log('📞 Starting call process...');
        console.log('Client ready:', !!retellWebClient);
        updateStatus('Connecting to Aria...', true);

        // Check microphone permissions first
        console.log('🎤 Requesting microphone permissions...');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the test stream
            console.log('✅ Microphone permission granted');
        } catch (permError) {
            console.error('❌ Microphone permission denied:', permError);
            throw new Error('Microphone access is required. Please allow microphone permissions and try again.');
        }

        // Request access token from backend
        console.log('🔑 Requesting access token from backend...');
        console.log('Backend URL:', BACKEND_URL);

        const response = await fetch(`${BACKEND_URL}/create-web-call`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('📡 Backend response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Backend error:', errorText);
            throw new Error(`Failed to create call: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Received response from backend');

        if (!data.access_token) {
            console.error('❌ No access token in response:', data);
            throw new Error('No access token received from server');
        }

        console.log('🎯 Access token received, starting Retell call...');
        console.log('Call ID:', data.call_id);

        // Start the call with Retell
        await retellWebClient.startCall({
            accessToken: data.access_token,
            sampleRate: 24000,
            captureDeviceId: 'default',
            playbackDeviceId: 'default',
        });

        isCallActive = true;
        console.log('✅ Call started successfully!');
        updateStatus('Connected! Aria is ready to help', true);

    } catch (error) {
        console.error('❌ Error starting call:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        let userMessage = 'Failed to connect: ';
        if (error.message.includes('Microphone')) {
            userMessage += 'Please allow microphone access and try again.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            userMessage += 'Cannot reach server. Make sure the backend is running on port 8000.';
        } else {
            userMessage += error.message;
        }

        updateStatus(userMessage, false);
        alert(userMessage);

        setTimeout(() => {
            hideCallStatus();
        }, 5000);
    }
}

async function endCall() {
    if (!isCallActive) {
        return;
    }

    try {
        updateStatus('Ending call...', true);
        await retellWebClient.stopCall();
        isCallActive = false;

        setTimeout(() => {
            hideCallStatus();
        }, 1500);

    } catch (error) {
        console.error('Error ending call:', error);
        hideCallStatus();
    }
}

// Retell Event Handlers
function handleCallStarted() {
    console.log('Call started');
    isCallActive = true;
    updateStatus('Call in progress...', true);
}

function handleCallEnded() {
    console.log('Call ended');
    isCallActive = false;
    updateStatus('Call ended. Thank you!', false);

    setTimeout(() => {
        hideCallStatus();
    }, 2000);
}

function handleAgentStartTalking() {
    console.log('Agent started talking');
    updateStatus('Aria is speaking...', true);
}

function handleAgentStopTalking() {
    console.log('Agent stopped talking');
    if (isCallActive) {
        updateStatus('Listening...', true);
    }
}

function handleError(error) {
    console.error('❌ Retell error:', error);
    console.error('Error type:', typeof error);
    console.error('Error details:', JSON.stringify(error, null, 2));

    let errorMessage = 'An error occurred';

    if (error && error.message) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    updateStatus(`Error: ${errorMessage}`, false);
    isCallActive = false;

    setTimeout(() => {
        hideCallStatus();
    }, 5000);
}

// UI Helper Functions
function updateStatus(message, isActive) {
    const statusText = document.getElementById('statusText');
    const callStatus = document.getElementById('callStatus');
    const startCallBtn = document.getElementById('startCallBtn');

    if (statusText) {
        statusText.textContent = message;
    }

    if (callStatus) {
        callStatus.classList.remove('hidden');
    }

    if (startCallBtn) {
        startCallBtn.style.display = isActive ? 'none' : 'inline-flex';
    }
}

function hideCallStatus() {
    const callStatus = document.getElementById('callStatus');
    const startCallBtn = document.getElementById('startCallBtn');

    if (callStatus) {
        callStatus.classList.add('hidden');
    }

    if (startCallBtn) {
        startCallBtn.style.display = 'inline-flex';
    }
}
