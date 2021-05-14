const router = require('express').Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');
const crypto = require('crypto');
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	// the connect port
	port: 465,

	// authenticate
	auth: {
		user: 'dilkashshaikhshahagirmahajan@gmail.com',
		pass: '', //Gmail Account Password,
	},
});
router.get('/', (req, res) => {
	res.json('Hi, From API');
});
router.post('/user', async (req, res) => {
	console.log(req.body);
	const data = {
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		emailToken: crypto.randomBytes(32).toString('hex'),
		isVerified: false,
		password: await bcrypt.hash(req.body.password, 10),
	};
	const user = new User(data);
	const resp = await user.save();
	console.log(resp);
	if (!resp) {
		res.json({ error: "Something Wen't wrong" });
	}

	const msg = {
		to: resp.email,
		from: 'dilkashmahajan8@gmail.com',
		subject: 'Dilkash Shaikh Mahajan - Please Verified Your Email',
		html: `
        <p>Hello, Thank For registering our website</p>
        Please Click on the <a href="http://${req.headers.host}/api/verify-email?token=${resp.emailToken}">Link</a> for verifying your gmail account
        `,
	};
	transporter.sendMail(msg, (err) => {
		try {
			if (err) {
				return console.log(err);
			}

			res.json({
				message: 'Thank you for registering, Please Check Your Email',
			});
		} catch (err) {
			if (err)
				return res.status(500).json({ msg: 'There is server error' });
		}
	});
	// try {
	// 	transporter.sendMail(msg, (err) => {
	// 		if (err) {
	// 			console.log(err);

	// 			res.json({ message: 'some thing is went wrong' });
	// 		}
	// 	});
	// 	res.json({
	// 		message: 'Thank you for registering, Please Check Your Email',
	// 	});
	// } catch (error) {
	// 	res.status(500).json({ message: err });
	// 	console.log(error);
	// }
});
router.get('/verify-email', async (req, res) => {
	try {
		console.log(req.query.token);
		const emailToken = req.query.token;
		const user = await User.findOne({ emailToken });
		if (!user) {
			res.json({ message: 'please signup first' });
			return res.redirect('/');
		}
		user.emailToken = null;
		user.isVerified = true;
		await user.save();
		return res.json({ message: 'Email Verified, Please Login ' });
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
