const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const senderAddress = 'saptarshi.sinha.ind@gmail.com';

module.exports = {
	senderAddress, sgMail
};