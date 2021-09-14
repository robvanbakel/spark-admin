const admin = require("firebase-admin")

const serviceAccount = {
  type: process.env.GOOGLE_type,
  project_id: process.env.GOOGLE_project_id,
  private_key_id: process.env.GOOGLE_private_key_id,
  private_key: process.env.GOOGLE_private_key.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_client_email,
  client_id: process.env.GOOGLE_client_id,
  auth_uri: process.env.GOOGLE_auth_uri,
  token_uri: process.env.GOOGLE_token_uri,
  auth_provider_x509_cert_url: process.env.GOOGLE_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.GOOGLE_client_x509_cert_url,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scheduler-cb321-default-rtdb.firebaseio.com",
})

const db = admin.firestore()

module.exports = { db }