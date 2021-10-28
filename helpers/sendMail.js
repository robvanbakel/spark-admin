require("dotenv").config()
const sgMail = require("@sendgrid/mail")

const activationMailTemplate = require("./activationMailTemplate")

sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendMail = ({ activationToken, email, firstName }) => {
  const activationLink = `https://demo.sparkscheduler.com/auth?activationToken=${activationToken}`

  sgMail.send({
    to: email,
    from: {
      email: "info@sparkscheduler.com",
      name: "Spark",
    },
    subject: `Activate your account`,
    html: activationMailTemplate({ activationLink, firstName }),
  })
}

module.exports = sendMail