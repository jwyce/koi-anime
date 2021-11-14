import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

const ses = new aws.SES({
	region: 'us-east-2',
});

// TODO: take ses account out of sandbox mode before deploying to prod
export function sendEmail(to: string, subject: string, html: string) {
	let transporter = nodemailer.createTransport({
		SES: { ses, aws },
		sendingRate: 1, // max 1 msg/s,
	});

	transporter.once('idle', () => {
		if (transporter.isIdle()) {
			transporter.sendMail(
				{
					from: 'noreply@koianimelist.com', // sender address
					to,
					subject,
					html,
				},
				(err, info) => {
					if (info) {
						console.log(info.envelope);
						console.log(info.messageId);
					}
					if (err) console.error(err);
				}
			);
		}
	});
}
