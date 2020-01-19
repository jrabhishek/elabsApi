const { senderAddress, sgMail } = require('../config/mail.js')
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

class MailController {
	sendUserRegistrationMail(receiverAddress,course) {
		return new Promise((resolve,reject) => {
			var registrationContent = fs.readFileSync(path.join(__dirname,'../views/mail/registration.ejs'),'utf-8');
			var msg = {
				to: receiverAddress,
				from: senderAddress,
				subject: 'Registration Confirmation Mail E Labs',
				html: ejs.render(registrationContent,{
					course: course
				})
			};
			// msg.setHtml(ejs.render(registrationContent,{}));
			sgMail.send(msg)
			.then(() => {
				resolve({ success: true });
			})
			.catch(err =>reject({ success: false, message: err }));
		});
	}
}

module.exports = MailController;
