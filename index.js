const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const Area = require('./models/area');
const nodeoutlook = require('nodejs-nodemailer-outlook');
const Query = require('./models/query');
const mongoose = require('mongoose');
const moment = require('moment');
const path = require('path');
const Token = require('./models/token');
const port = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client/build'));

const MONGODB_URI = 'mongodb://GiteshMedi:shastri1@ds263590.mlab.com:63590/medicento';

mongoose.connect(MONGODB_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));

const pro = [
	{
		medicine_name: 'Helow'
	},
	{
		medicine_name: 'Helow'
	},
	{
		medicine_name: 'Helow'
	},
	{
		medicine_name: 'Helow'
	}
];

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.post('/search', (req, res, next) => {
	key = {
		medicine_name: req.body.key,
		medicine_company: 'HHG',
		price: 120,
		composition: 'ehbwfjweb few bhuwefbew bfuhjebw fuewbfu ewbfuew bf ewf',
		diseases: 'fieuw iufh ie fhehf ehufi heif eiuf',
		quantity: 30,
		uses: 'fkjbwefiweb fiew f eiufiue few iufb'
	};
	res.render('search', { pro: pro, key: key });
});

app.get('/pharmacy-registration', (req, res, next) => {
	res.render('addRetailer');
});

app.post('/mail', (req, res, next) => {
	console.log(req.body);
	console.log(req.body.Phone.length);
	console.log(req.body.message.length);
	if (req.body.Phone.length > 9) {
		Token.findById('5c4c1b029ec740040b8e5961')
			.exec()
			.then((doc) => {
				doc.code = doc.code + 1;
				doc.save();
				var query = new Query({
					customer_name: req.body.Name,
					customer_email: req.body.Email,
					customer_phone: req.body.Phone,
					customer_message: req.body.message,
					customer_query: req.body.category,
					source: req.body.source,
					token: doc.code
				});
				query.save();
				console.log(query);
				var content = 'We have received a query on token Id ' + doc.code;
				var message1 =
					'Hello Team, <br/> we have received a query. Please find the details below of the concerned.<br/>Kindly do the needful at the earliest.';
				message1 +=
					'<table style="border-collapse: collapse;"><tr style="background-color: lightgray;"><td style="border: 1px solid #ddd;padding: 8px;"><strong>From</strong></td><td style="border: 1px solid #ddd;padding: 8px;">' +
					req.body.Name +
					'</td></tr>';
				message1 +=
					'<tr><td style="border: 1px solid #ddd;padding: 8px;"><strong>EmailId</strong></td><td style="border: 1px solid #ddd;padding: 8px;">' +
					req.body.Email +
					'</td></tr>';
				message1 +=
					'<tr style="background-color: lightgray;"><td style="border: 1px solid #ddd;padding: 8px;"><strong>Phone</strong></td><td style="border: 1px solid #ddd;padding: 8px;">' +
					req.body.Phone +
					'</td></tr>';
				message1 +=
					'<tr><td style="border: 1px solid #ddd;padding: 8px;"><strong>Category</strong></td><td style="border: 1px solid #ddd;padding: 8px;">' +
					req.body.category +
					'</td></tr>';
				message1 +=
					'<tr style="background-color: lightgray;"><td style="border: 1px solid #ddd;padding: 8px;"><strong>Message</strong></td><td style="border: 1px solid #ddd;padding: 8px;">' +
					req.body.message +
					'</td></tr>';
				nodeoutlook.sendEmail({
					auth: {
						user: 'Team.medicento@outlook.com',
						pass: 'med4lyf@51'
					},
					from: 'Team.medicento@outlook.com',
					to: 'contact.medicento@gmail.com,giteshshastri96@gmail.com',
					subject: content,
					html: message1
				});
				res.redirect('/');
			})
			.catch((err) => {
				console.log(err);
				res.redirect('/');
			});
	} else {
		console.log('invalid');
		res.redirect('/');
	}
});

app.get('/medicento-privacy-policy', (req, res, next) => {
	res.render('privacy_policy');
});

app.get('/about-us', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'about.html'));
});

app.get('/aboutusdetail', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'aboutusdetail.html'));
});

app.get('/essentials', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'essentials.html'));
});

app.get('/covid', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'covid.html'));
});

app.get('/login', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'login.html'));
});

app.get('/register', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'register.html'));
});

app.get('/distributor-registration', (req, res, next) => {
	res.render('addDistrbutor');
});

app.get('/career', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'career.html'));
});

app.get('/full_time', (req, res, next) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'full_time.html'));
});

app.get('/careers', (req, res, next) => {
	res.render('career');
});

app.get('/admin', (req, res, next) => {
	const compression = require('compression');
	app.disable('x-powered-by');
	app.use(express.static(__dirname + '/client/build'));
        app.use(compression())
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('*', (req, res, next) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(port, function() {
	console.log('Listening on PORT : ' + port);
});
