# LawRato AI Receptionist - Client Demo

A professional AI receptionist powered by Retell AI for LawRato legal services. This demo showcases Aria, an intelligent voice assistant that helps clients navigate legal services 24/7.

## 🌟 Features

- **Multilingual Support**: Seamlessly switch between English and Hindi
- **24/7 Availability**: Always ready to assist clients
- **Expert Guidance**: Navigate through all LawRato services
- **Premium UI**: Modern, responsive design with glassmorphism effects
- **Real-time Voice**: Natural conversation with Retell AI

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Retell AI account with API key
- Modern web browser

## 🚀 Quick Start

### 1. Clone or Download the Project

```bash
cd law
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured with your credentials
# Start the server
npm start
```

The backend server will start on `http://localhost:8000`

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Open index.html in your browser
# On Windows:
start index.html

# Or simply double-click index.html in File Explorer
```

## 🎯 Testing the Demo

1. **Start Backend**: Make sure the backend server is running on port 8000
2. **Open Frontend**: Open `frontend/index.html` in your browser
3. **Click "Talk to Aria Now"**: This will initiate a call with the AI receptionist
4. **Speak Naturally**: Ask about legal services, lawyer connections, or any LawRato offerings
5. **Switch Languages**: Say "Speak Hindi" or "Hindi mein baat karo" to switch to Hindi

## 📁 Project Structure

```
law/
├── frontend/
│   ├── index.html          # Main landing page
│   ├── styles.css          # Premium styling
│   └── app.js              # Retell SDK integration
├── backend/
│   ├── server.js           # Express API server
│   ├── package.json        # Dependencies
│   ├── .env                # Environment variables (configured)
│   └── .env.example        # Template for new deployments
├── law.json                # Agent configuration reference
└── README.md               # This file
```

## 🌐 Deployment

### Deploy Backend (Railway)

1. Create account at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables:
   - `RETELL_API_KEY`: key_526e9c8edc8944e01c82d5b61681
   - `AGENT_ID`: agent_c3ad4356d237f0dcd0d6d4a1f4
   - `PORT`: 8000
6. Deploy and copy the public URL

### Deploy Frontend (Netlify)

1. Create account at [Netlify.com](https://netlify.com)
2. Drag and drop the `frontend` folder
3. Update `app.js` line 2:
   ```javascript
   const BACKEND_URL = 'https://your-railway-url.railway.app';
   ```
4. Re-upload the frontend folder

## 🔧 Configuration

### Retell AI Settings

The agent is configured with:
- **Voice**: Custom female voice (warm, professional)
- **Languages**: English & Hindi
- **Speed**: 0.86 (natural pace)
- **Interruption Sensitivity**: 0.9 (high responsiveness)

### Customization

To customize the agent behavior, edit `law.json` and update via Retell dashboard.

## 🎨 UI Customization

### Colors

Edit `frontend/styles.css` CSS variables:

```css
:root {
    --primary-blue: #2563eb;
    --primary-purple: #7c3aed;
    --dark-bg: #0f172a;
}
```

### Content

Edit `frontend/index.html` to update:
- Hero section text
- Features list
- Services offered
- Contact information

## 🐛 Troubleshooting

### Call Not Connecting

1. Check backend server is running: `http://localhost:8000`
2. Verify browser console for errors (F12)
3. Ensure microphone permissions are granted
4. Check Retell API key and Agent ID in `.env`

### CORS Errors

- Make sure backend server is running
- Check `BACKEND_URL` in `frontend/app.js` matches your backend URL

### No Audio

- Grant microphone permissions in browser
- Check system audio settings
- Try a different browser (Chrome recommended)

## 📞 Support

For issues or questions:
- Email: support@lawrato.com
- Phone: +91 9599 000 555

## 📄 License

This demo is provided for client demonstration purposes.

---

**Built with ❤️ for LawRato**
