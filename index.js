const express = require('express');
const app = express()

const port = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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

app.post('/search', (req, res, next) => {

    key = {
        medicine_name: req.body.key,
        medicine_company: 'HHG',
        price: 120,
        composition: 'ehbwfjweb few bhuwefbew bfuhjebw fuewbfu ewbfuew bf ewf',
        diseases: 'fieuw iufh ie fhehf ehufi heif eiuf',
        quantity: 30,
        uses: 'fkjbwefiweb fiew f eiufiue few iufb',

    };
    res.render('search', { pro: pro, key: key});
});

app.get('/pharmacy-registration', (req, res, next) => {
    res.render('addRetailer');
});

app.post('/mail', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.get('/about-us', (req, res, next) => {
    res.render('aboutus');
});

app.get('/distributor-registration', (req, res, next) => {
    res.render('addDistrbutor');
});

app.get('/career', (req, res, next) => {
    res.render('career');
});

app.get('/careers', (req, res, next) => {
    res.render('career');
});

app.get('/', (req, res, next) => {
    res.render('index', { pro: pro });
});

app.listen(port, function() {
    console.log('Listening on PORT : ' + port );
});
