# Vercel Deployment Fix Guide

## Issue
The app is showing "Server error" on Vercel because environment variables are not configured.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click on your `lecture-genius` project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

Add each of the following as a **new environment variable**:

#### NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://lecture-genius.vercel.app`
- **Environment**: Production, Preview, Development (check all)

#### NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `[Get from your .env.local file - DO NOT commit this]`
- **Environment**: Production, Preview, Development (check all)

#### GOOGLE_CLIENT_ID
- **Key**: `GOOGLE_CLIENT_ID`
- **Value**: `[Get from Google Cloud Console - DO NOT commit this]`
- **Environment**: Production, Preview, Development (check all)

#### GOOGLE_CLIENT_SECRET
- **Key**: `GOOGLE_CLIENT_SECRET`
- **Value**: `[Get from Google Cloud Console - DO NOT commit this]`
- **Environment**: Production, Preview, Development (check all)

#### GEMINI_API_KEY
- **Key**: `GEMINI_API_KEY`
- **Value**: `[Get from Google AI Studio - DO NOT commit this]`
- **Environment**: Production, Preview, Development (check all)

### Step 3: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID
3. Add these **Authorized redirect URIs**:
   - `https://lecture-genius.vercel.app/api/auth/callback/google`
   - `https://lecture-genius.vercel.app/api/auth/signin/google`

### Step 4: Redeploy

After adding all environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the **three dots** on the latest deployment
3. Click **Redeploy**

OR just push a new commit (Vercel will auto-deploy)

---

## Quick Test
Once redeployed, visit:
- https://lecture-genius.vercel.app

You should see the dashboard load successfully!

## Troubleshooting

If you still see errors:
1. Check Vercel **Function Logs** in the dashboard
2. Verify all environment variables are saved
3. Make sure Google OAuth redirect URIs include the Vercel domain
