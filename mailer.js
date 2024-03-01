const nodemailer = require('nodemailer');
const uuid = require('uuid');
class EmailSender {
    constructor() {
        this.emailConfig = {
            service: 'gmail',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        };

        this.transporter = nodemailer.createTransport(this.emailConfig);
    }

    async sendEmail(mailOptions) {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info.response);
                }
            });
        });
    }
}


export const sendEmail = async ({ reciever, subject, text }) => {
    const emailSender = new EmailSender();
    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: reciever,
        subject: subject,
        html: text,
    };
    try {
        const response = await emailSender.sendEmail(mailOptions);
    } catch (error) {
    }
}
export const generateOTP=()=> {
  const otpLength = 6;
  const otp = Array.from({ length: otpLength }, () => Math.floor(Math.random() * 10)).join('');
  return otp;
}

export const deleteClientMailTemplate = ({ client, clientReference, sender }) => {
    const text = `<h4>Dear ${client},</h4>
            <p>The Delete request is successfully sent to Admin.</p>
            <table>
              <tr>
                <td>Client Reference Number:</td>
                <td>${clientReference}</td>
              </tr>
              </table>
            <p>Thanks & regards,</p>
            <p>${sender}</p>`;
    return text.toString()
}
export const deleteAdminMailTemplate = ({ admin,clientEmail, clientReference, adminReference,sender }) => {
    const text =  `<h4>Dear ${admin},</h4>
    <p>The client has sent a request for your approval to delete the product.</p>
    <table>
      <tr>
        <td>Client Reference Number:</td>
        <td>${clientReference}</td>
      </tr>
      <tr>
        <td>Admin Reference Number:</td>
        <td>${adminReference}</td>
      </tr>
      <tr>
        <td>User Email Id:</td>
        <td>${clientEmail}</td>
      </tr>
    </table>
    <p>Please review the request and provide your approval.</p>
    <p>Thanks & regards,</p>
    <p>${sender}</p>`;
    return text.toString()
}
export const updateClientMailTemplate = ({ client, clientReference, sender }) => {
    const text = `<h4>Dear ${client},</h4>
            <p>The update request is successfully sent to Admin.</p>
            <table>
              <tr>
                <td>Client Reference Number:</td>
                <td>${clientReference}</td>
              </tr>
              </table>
            <h4>Thanks & regards,</h4>
            <p>${sender}</p>`;
    return text.toString()
}

export const sendOtpTemplated = ({ client,newOTP }) => {
    const text = `<h4>Dear ${client},</h4>
            <p>${newOTP} is the OTP to complete your order verification</p>
            <p>DO NOT SHARE Your OTP </p>
            <h2> OTP Valid for 5 mins only</h2>
            <h4>Thanks & regards,</h4>
            <p>Team Chai-ra-mama</p>`;
    return text.toString()
}
export const updateAdminMailTemplate = ({ admin,clientEmail, clientReference, adminReference,sender }) => {
    const text =  `<h4>Dear ${admin},</h4>
    <p>The client has sent a request for your approval to update the product.</p>
    <table>
      <tr>
        <td>Client Reference Number:</td>
        <td>${clientReference}</td>
      </tr>
      <tr>
        <td>Admin Reference Number:</td>
        <td>${adminReference}</td>
      </tr>
      <tr>
        <td>User Email Id:</td>
        <td>${clientEmail}</td>
      </tr>
    </table>
    <p>Please review the request and provide your approval.</p>
    <p>Thanks & regards,</p>
    <p>${sender}</p>`;
    return text.toString()
}

class ReferenceGenerator {
    constructor(prefix) {
        this.prefix = prefix;
    }

    generateReference() {
        const uniqueId = uuid.v4().split('-').pop();
        const timestamp = Date.now().toString(36);
        return `${this.prefix}-${timestamp}-${Math.floor(Math.random() * 1010000)}-${uniqueId}`;
    }
}

// Example usage:
export const clientReferenceGenerator = new ReferenceGenerator('CLIENT');
export const adminReferenceGenerator = new ReferenceGenerator('ADMIN');

// const clientReference = clientReferenceGenerator.generateReference();
// const adminReference = adminReferenceGenerator.generateReference();
