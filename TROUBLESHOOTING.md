# Troubleshooting Connection Issues

## Quick Diagnostics

### Step 1: Open Browser Console
1. Open the frontend in your browser (`index.html`)
2. Press **F12** to open Developer Tools
3. Click on the **Console** tab
4. Click "Talk to Aria Now"
5. Look for the emoji-prefixed messages

### Step 2: Check the Console Messages

You should see these messages in order:

✅ **Success Path:**
```
🚀 Page loaded, initializing...
✅ Retell Web SDK loaded successfully
✅ Retell client initialized successfully
📞 Starting call process...
🎤 Requesting microphone permissions...
✅ Microphone permission granted
🔑 Requesting access token from backend...
📡 Backend response status: 200
✅ Received response from backend
🎯 Access token received, starting Retell call...
✅ Call started successfully!
```

❌ **If you see errors**, check below:

---

## Common Issues & Solutions

### Issue 1: "Retell Web SDK not loaded"
**Error Message:** `❌ Retell Web SDK not loaded! Check your internet connection.`

**Solution:**
- Check your internet connection
- The Retell SDK is loaded from a CDN, so you need internet access
- Try refreshing the page
- Check if your firewall is blocking `unpkg.com`

---

### Issue 2: "Microphone permission denied"
**Error Message:** `❌ Microphone permission denied`

**Solution:**
1. Click the microphone icon in your browser's address bar
2. Select "Always allow" for microphone access
3. Refresh the page and try again

**Chrome:** Click the lock/info icon → Site settings → Microphone → Allow
**Firefox:** Click the microphone icon → Allow
**Edge:** Click the lock icon → Permissions → Microphone → Allow

---

### Issue 3: "Cannot reach server"
**Error Message:** `Failed to connect: Cannot reach server. Make sure the backend is running on port 8000.`

**Solution:**
1. Check if backend is running:
   ```bash
   # In a terminal, navigate to backend folder
   cd c:\Users\pc\Desktop\law\backend
   npm start
   ```

2. You should see:
   ```
   🚀 Server running on http://localhost:8000
   📞 Agent ID: agent_c3ad4356d237f0dcd0d6d4a1f4
   🔑 API Key configured: Yes
   ```

3. Test the backend directly:
   - Open http://localhost:8000 in your browser
   - You should see: `{"status":"ok","message":"LawRato AI Receptionist Backend Server","version":"1.0.0"}`

---

### Issue 4: "Failed to create call" (Backend Error)
**Error Message:** `❌ Backend error: ...`

**Possible Causes:**
1. **Invalid API Key or Agent ID**
   - Check `backend/.env` file
   - Verify credentials in Retell dashboard

2. **Retell API is down**
   - Check https://status.retellai.com
   - Try again in a few minutes

3. **Network issue**
   - Check your internet connection
   - Try disabling VPN if you're using one

**Fix:**
1. Open `backend/.env`
2. Verify:
   ```
   RETELL_API_KEY=key_526e9c8edc8944e01c82d5b61681
   AGENT_ID=agent_c3ad4356d237f0dcd0d6d4a1f4
   ```
3. Restart the backend server

---

### Issue 5: Call connects but no audio
**Symptoms:** Call status shows "Connected" but you can't hear anything

**Solution:**
1. **Check system volume** - Make sure it's not muted
2. **Check browser audio** - Right-click the browser tab, check if it's muted
3. **Check microphone** - Make sure you're speaking clearly
4. **Try different browser** - Chrome works best with Retell
5. **Check audio output device** - Make sure correct speakers/headphones are selected

---

### Issue 6: CORS Error
**Error Message:** `Access to fetch at 'http://localhost:8000/create-web-call' from origin 'null' has been blocked by CORS policy`

**Solution:**
This shouldn't happen as CORS is enabled in the backend, but if it does:

1. Make sure backend is running
2. Check `backend/server.js` has:
   ```javascript
   app.use(cors());
   ```
3. Try opening the frontend via a local server instead of file://
   ```bash
   # In frontend folder
   npx serve .
   ```
   Then open http://localhost:3000

---

## Testing Checklist

Run through this checklist:

- [ ] Internet connection is working
- [ ] Backend server is running on port 8000
- [ ] Can access http://localhost:8000 in browser
- [ ] Microphone permissions granted
- [ ] Browser console shows no red errors
- [ ] System audio is not muted
- [ ] Using Chrome, Edge, or Firefox (Safari may have issues)

---

## Still Not Working?

### Get Detailed Logs

1. **Backend logs:**
   - Look at the terminal where `npm start` is running
   - You should see "Creating web call for agent..." messages
   - If you see errors, copy them

2. **Frontend logs:**
   - Open browser console (F12)
   - Copy all the messages (right-click → Save as...)
   - Look for any red error messages

3. **Network logs:**
   - In browser DevTools, go to **Network** tab
   - Click "Talk to Aria Now"
   - Look for the `create-web-call` request
   - Check if it's successful (status 200) or failed

### Contact Information

If you're still having issues, gather:
1. Browser console logs
2. Backend terminal output
3. Network tab screenshot
4. What error message you're seeing

Then contact support with these details.

---

## Quick Fixes Summary

| Problem | Quick Fix |
|---------|-----------|
| SDK not loading | Check internet, refresh page |
| Microphone denied | Allow in browser settings |
| Can't reach server | Start backend with `npm start` |
| Backend error | Check `.env` credentials |
| No audio | Check system volume, try Chrome |
| CORS error | Make sure backend is running |

---

## Browser Compatibility

**Recommended:**
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+

**Not Recommended:**
- ⚠️ Safari (may have WebRTC issues)
- ❌ Internet Explorer (not supported)

---

## Advanced Debugging

### Enable Verbose Logging

The frontend now has detailed emoji-prefixed logging. Every step of the process is logged to the console.

### Test Backend Independently

```bash
# Windows PowerShell
Invoke-WebRequest -Uri http://localhost:8000/create-web-call -Method POST -ContentType "application/json"
```

You should get a response with `access_token` and `call_id`.

### Check Retell Dashboard

1. Go to https://app.retellai.com
2. Check your agent status
3. Look at recent call logs
4. Verify API key is active
