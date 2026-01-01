# MongoDB Atlas Setup Guide

## Getting Your MongoDB Connection String

### Step 1: Create a MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click **Sign Up with Email**
3. Create account with email and password
4. Verify email address
5. Complete the onboarding questionnaire

### Step 2: Create a Cluster

1. Click **Create a Deployment**
2. Choose **M0 Free** tier (no credit card required)
3. Select provider: AWS, Azure, or GCP (doesn't matter)
4. Select region closest to you
5. Click **Create Deployment**
6. Wait 5-10 minutes for cluster creation

### Step 3: Create Database User

1. Go to **Database Access** from left menu
2. Click **Add New Database User**
3. Choose **Autogenerate Password** (or set your own)
4. Username: `dbuser`
5. Password: Save this securely
6. Built-in Roles: `Atlas Admin`
7. Click **Add User**

### Step 4: Whitelist IP Address

1. Go to **Network Access** from left menu
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0) for development
   - ⚠️ For production, whitelist specific IPs only
4. Click **Confirm**

### Step 5: Get Connection String

1. Go to **Databases** section
2. Click **Connect** on your cluster
3. Choose **Drivers** as connection method
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `smart-library`

### Example Connection String

```
mongodb+srv://dbuser:password123@cluster0.xxxxx.mongodb.net/smart-library?retryWrites=true&w=majority
```

### Step 6: Add to .env File

In `server/.env`, add:

```env
MONGODB_URI=mongodb+srv://dbuser:your-password@cluster0.xxxxx.mongodb.net/smart-library?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
```

---

## Troubleshooting

### Connection Refused
- Check IP whitelist in Network Access
- Verify username and password
- Ensure .env file is in server folder

### Database Not Found
- Use database name: `smart-library`
- MongoDB will create database automatically on first write

### Too Many Connections
- M0 free tier allows 100 connections
- Restart your application

---

**Once connected, your backend will automatically create the books collection!** 🎉
