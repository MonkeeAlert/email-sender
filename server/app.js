const express = require('express');
const nodemailer = require('nodemailer');
// const bp = require('body-parser');
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.get('/mailerAPI', function (req, res) {
  res.send('API works');
})

app.post('/send', (req, res) => {
  console.log(req.body);

  nodemailer.createTestAccount((err, account) => {   
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'wendell87@ethereal.email',
        pass: 'J6BGsURX6ZU4NkbceW'
      }
    });
  
    let mailOptions = {
      from: req.body.senderEmail,
      to: req.body.recipicientEmail,
      subject: req.body.subject,
      text: req.body.message,
      attachments: req.body.files.map(i => {
        return {
          filename: i.name,
          content: i.name,
          contentType: i.type,
        }
      })
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) return console.log(err);
  
      console.log('Message sent: %s', info.messageId);
    })
  })
})

app.listen( PORT, _ => console.log(`Server started at port ${PORT}`) );