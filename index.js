var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mysql = require('mysql')
var port = 2002;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'wakdoyok',
    password: '12345',
    database: 'popokpedia',
    port: 3306
})

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({
        nama: 'baron',
        pekerjaan: 'guru'
    })
});

app.get('/popok/:idnya', (req, res) => {
    // sebenernya gak berpengaaruh pada kodingan hanya untuk melihat di console
    // console.log(req.params.idnya);
    res.send('<h1>Dooor!!!</h1>')
})

app.get('/popok', (req, res) => {
    // var nama = req.query.nama;
    var harga = req.query.harga;
    if (harga == undefined) {
        harga = '';
    }
    var sql = `select * from product where harga like '%${harga}%';`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})

app.post('/popok', (req, res) => {
    // var nama = req.query.nama;
    var newPopok = {
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        image: req.body.image,
        brandid: req.body.brandid,
    }

    var nama = req.body.filterNama;

    var sql = `insert into product set ? ;`
    db.query(sql, newPopok, (err, result) => {
        // var nama = req.query.nama;
        if (err) throw err;
        var sql = `select * from product where nama like '%${nama}%';`;
        db.query(sql, (err, result1) => {
          if (err) throw err;
          console.log(result1);
          res.send(result1)
    })

    })
})

app.put('/popok/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.send('Update Success')
})

app.delete('/popok/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Delete Success. Boom!!!')
})

app.listen(port, () => console.log('API jalan  di port ' + port));

