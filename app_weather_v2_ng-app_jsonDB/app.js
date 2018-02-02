const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const url = require('url');
const bodyParser = require("body-parser");
const rp = require('request-promise');
const port = process.argv[2] || 3002;
const _weatherAPIKey = 'ecf5b4f4bec0ddd540b60cd345d2b50f';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/get-browser-refresh-url', (req, res) => {
    console.log('Well');
    res.send(process.env.BROWSER_REFRESH_URL);
})


app.get('/api/weather', (req, res) => {

    console.log(req.query)
    
    let city = req.query.city;
    let countryCode = req.query.country;

    rp({
        method: 'GET',
        uri: `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${_weatherAPIKey}`,
        json: true
    })
        .then((data) => {
            console.log('the data is ready to be sent to the client');
            console.log(data);
            res.json(data);
        })
        .catch(console.error);
})


app.post('/api/weather', (req, res) => {
    console.log(req.body);

    let places = req.body.places;
    let preEntities = places.map((index) => {

        let city = index.city;
        let countryCode = index.country;
 
        return rp({
            method: 'GET',
            uri : `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${_weatherAPIKey}`,
            json: true
        })    
    });

    Promise.all(preEntities)
        .then((apiData) => {
            console.log(apiData);
            let data = { weatherAt: apiData };
            res.json(data);
        })
        .catch((e) => {
            console.log(e.message);
            res.send(e);
        });
});



app.get('/api/city', (req, res) => {

    fs.readFile('./data/cities.json', 'utf8', (err, data) => {
        if(err) {
            throw err;
        }
        console.log(data);
        res.json(data);
    });
})


app.get('/api/city/:id', (req, res) => {
    fs.readFile('./data/cities.json', 'utf8', (err, data) => {
        if(err) {
            throw err;
        }
        JSON.parse(data).cities.map((item) => {
            if(item.id === req.params.id) {
                console.log(item)
                res.json(JSON.stringify(item))
            } else {
                return
            }
        })
    });
})
/////////////////////////////////////////////////////////////////////////////
app.put('/api/city/:id', (req, res) => {

    Promise.all([new Promise((resolve, reject) => {

                    fs.readFile('./data/cities.json', 'utf8', (err, data) => {
                        if(err) {
                            throw err;
                            console.log(err);
                        }

                        return resolve(JSON.parse(data));
                });
            }).catch(console.error), new Promise((resolve, reject) => {

                    fs.readFile('./data/countries.json', 'utf8', (err, data) => {
                        if(err) {
                            throw err;
                            console.log(err);
                        }

                        return resolve(JSON.parse(data));
                });
            }).catch(console.error)])
                .then((values) => {
                    console.log('replace', req.body);

                    let[citiesDB, countriesDB] = values;
                    let countryCode = null;
                    console.log(citiesDB.cities, countriesDB.countries);
                    for(let i = 0; i < countriesDB.countries.length; i++) {
                        if(req.body.countryCode === countriesDB.countries[i].id) {
                            countryCode = countriesDB.countries[i].countryCode;
                                // break;
                        }
                    }
                    for(let i = 0; i < citiesDB.cities.length; i++ ) {
                        console.log(citiesDB.cities[i]);
                        if(citiesDB.cities[i].city === req.body.city) {
                            citiesDB.cities[i].countryCode = countryCode;
                                console.log(citiesDB.cities[i])
                                // break;
                        }
                    }

                    console.log("new db", citiesDB);
                    fs.writeFile('./data/cities.json', JSON.stringify(citiesDB, null,' '), (err) => {
                        if(err) {
                            throw err
                        }
                        console.log('data-base has been changed!')
                        res.end('data has been changed successful!');
                    })
                })
                .catch((e) => {
                    console.error('Broken reading :-(', e);
                })
            
            
        
})
////////////////////////////////////////////////////////////////////////////

app.get('/api/country', (req, res) => {

    fs.readFile('./data/countries.json', 'utf8', (err, data) => {
        if(err) {
            throw err;
        }
        console.log(data);
        res.json(data);
    });
})

app.get('/api/country/:id', (req, res) => {
    fs.readFile('./data/countries.json', 'utf8', (err, data) => {
        if(err) {
            throw err;
        }
        JSON.parse(data).countries.map((item) => {
            if(item.id === req.params.id) {
                console.log(item)
                res.json(JSON.stringify(item))
            } else {
                return
            }
        })
    });
})

app.put('/api/country/:id', (req, res) => {
    
    fs.readFile('./data/countries.json', 'utf8', (err, data) => {

        if(err) {
            throw err;
            console.log(err);
        }
        console.log('replace', req.body);
        
        let db = JSON.parse(data);

        try{
            for( let i = 0; i < db.countries.length; i++) {
                if(db.countries[i].id === req.params.id) {
                    db.countries[i].countryCode = req.body.countryCode;
                } 
            }
        }catch(e){
            console.log("err happend in the for-loop", e);
        }

        

        console.log("new", db.countries);

        fs.writeFile('./data/countries.json', JSON.stringify(db, null, ' '), (err) => {
            if(err) {
                throw err
            }
            console.log('data-base has been changed!')
            res.end('data has been changed successful!');
        })
    });
})










app.get('/*', (req, res) => {
  
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

/**
 * #api / city
 * get /city
 * get /city/:cityId
 * post /city
 * put /city/:cityId
 * delete /city/:cityId
 * 
 * city = [
 *  {
 *      id: 1
 *      name: 'dnipro',
 *      code: 'ua'
 *  }
 * ]
 * 
 * 
 * a href="/city/{{city.id}}"
 */




app.listen(port, (err) => {
    if(err) {
        console.error(err);
    }
    console.log(`Listen on port ${port}`);
    if (process.send) {
        process.send({ event:'online', url:`http://localhost:${port}/` });
    }
    
});