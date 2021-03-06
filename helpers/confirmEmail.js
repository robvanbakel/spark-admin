require('dotenv').config();

const { db } = require('../firebase');

const confirmEmail = async (activationToken, email) => {
  try {
    // Get UID from activationToken
    const doc = await db.collection('activationTokens').doc(activationToken).get();
    const { uid, iat } = doc.data();

    // Check if token is older than 7 days
    if (Date.now() > iat + 1000 * 60 * 60 * 24 * 7) {
      return {
        status: 403,
        body: { error: 'Activation token expired' },
      };
    }

    // Get email from user data
    const user = await db.collection('users').doc(uid).get();
    const { email: storedEmail, firstName } = user.data();

    if (email === storedEmail) {
      return {
        status: 202,
        body: { firstName },
        uid,
      };
    }
    return {
      status: 403,
      body: { error: 'Incorrect email address' },
    };
  } catch (err) {
    return {
      status: 404,
      body: { error: 'Invalid request' },
    };
  }
};

module.exports = confirmEmail;
