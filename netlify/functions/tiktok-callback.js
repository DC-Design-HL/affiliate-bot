const https = require('https');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const code = params.code;
  const error = params.error;

  if (error) {
    return {
      statusCode: 400,
      body: `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1>❌ Authorization Failed</h1>
        <p>${error}: ${params.error_description || ''}</p>
      </body></html>`,
      headers: { 'Content-Type': 'text/html' }
    };
  }

  if (!code) {
    return {
      statusCode: 400,
      body: 'No authorization code received'
    };
  }

  // Exchange code for tokens
  const postData = new URLSearchParams({
    client_key: 'sbaw9b0993qmk0zyv3',
    client_secret: 'hNKiMG6duBWwWUYUTcE9kBMT259gI7Gv',
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: 'https://meshtalem.design-dc.com/api/tiktok/callback'
  }).toString();

  const tokens = await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'open.tiktokapis.com',
      path: '/v2/oauth/token/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Parse error: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });

  if (tokens.error) {
    return {
      statusCode: 400,
      body: `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1>❌ Token Exchange Failed</h1>
        <p>${tokens.error}: ${tokens.error_description || ''}</p>
      </body></html>`,
      headers: { 'Content-Type': 'text/html' }
    };
  }

  // Send tokens to Slack webhook for Grege to pick up
  try {
    const slackPayload = JSON.stringify({
      text: `🎉 TikTok OAuth tokens received!\n\`\`\`${JSON.stringify(tokens, null, 2)}\`\`\``
    });
    await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'hooks.slack.com',
        path: '/services/T094WRD2ABB/B0AHUGLL5DJ/COwo2CcZtoakNELyC8ZsNKEn',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, (res) => { let d=''; res.on('data', c=>d+=c); res.on('end', ()=>resolve(d)); });
      req.on('error', reject);
      req.write(slackPayload);
      req.end();
    });
  } catch(e) { /* non-critical */ }

  return {
    statusCode: 200,
    body: `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
      <h1>✅ TikTok Connected!</h1>
      <p>Copy this token data and send it to Grege:</p>
      <textarea style="width:80%;height:200px;font-size:14px" readonly>${JSON.stringify(tokens, null, 2)}</textarea>
      <p style="color:gray;margin-top:20px">You can close this page after copying.</p>
    </body></html>`,
    headers: { 'Content-Type': 'text/html' }
  };
};
