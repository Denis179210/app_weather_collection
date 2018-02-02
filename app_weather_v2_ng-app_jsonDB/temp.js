        //     if(err) {
        //         throw err;
        //         console.log(err);
        //     }
        //     console.log('replace', req.body);
            
        //     let db = JSON.parse(data);
    
        //     try{
        //         for( let i = 0; i < db.cities.length; i++) {
        //             if(db.cities[i].id === req.params.id) {
        //                 db.cities[i].city = req.body.city;
        //                 db.cities[i].countryCode = req.body.countryCode;
        //             } 
        //         }
        //     }catch(e){
        //         console.log("err happend in the for-loop", e);
        //     }
    
        //     console.log("new", db.cities);
   
    

        // fs.writeFile('./data/cities.json', JSON.stringify(db), (err) => {
        //     if(err) {
        //         throw err
        //     }
        //     console.log('data-base has been changed!')
        //     res.end('data has been changed successful!');
        // })
//////////////////////////////////////////////////////////////////
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
    
                        let[cities, countries] = values;
                        let countryCode = null;
                        
                        for(let i = 0; i < countries.length; i++) {
                            if(req.body.countryCode === countries[i].id) {
                                countryCode = countries[i].countryCode;
                                    break;
                            }
                        }
                        for(let i = 0; i < cities.length; i++ ) {
                            if(cities[i].city === req.body.city) {
                                cities[i].countryCode = countryCode;
                                    console.log(cities[i])
                                    break;
                                    
                            }
                        }
                        console.log("new db", cities);
                        fs.writeFile('./data/cities.json', JSON.stringify(cities), (err) => {
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