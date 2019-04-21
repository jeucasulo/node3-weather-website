//nodemon src/app.js -e js,hbs
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);// /home/ec2-user/environment/node-courses/web-server/src
// console.log(__filename);// /home/ec2-user/environment/node-courses/web-server/src/app.js
// console.log(path.join(__dirname,'../public'));// /home/ec2-user/environment/node-courses/web-server/public

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public/');
const viewsPath=path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Sets the public path so we can access route with a equal file name in public dir
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index',{
        title:'WeatherApp',
        name:'Jeú Junior',
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name: 'Jeú Junior'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Jeú Junior'
    });
});


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
           error: 'You must provide an address' 
        });
    }
    
    
    geocode(req.query.address, (error,{latitude,longitude,location}={})=> {
        if(error){
            return res.send({error});
        }
        
        forecast(latitude,longitude,(error, forecastData)=>{
           if(error) {
               return res.send({error})
           }
           
           res.send({
               forecast:forecastData,
               location,
               address:req.query.address
           })
           
        })
    })
    
    
    
    
    
    // res.send({
    //     forecast:'It is snowing',
    //     location: 'Filadelfia',
    //     address: req.query.address
    // });
});

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({ //the returns stops the code above
           error: "You must provide a search term" 
        });
    }
    console.log(req.query);
    console.log(req.query.search);
    res.send({
        products:[]
    })
});

app.get('/help/*',(req, res)=>{
        // res.send('Help article not found');
        res.render('404',{
            title:'404 help',
            name: 'Jeu Junior',
            errorMessage: 'Help article not found...'
        });
});

app.get('*',(req, res)=>{ // must to be the last one, the wildcard (*) means for but the 'above gets'
    // res.send('Page not found...');
    res.render('404',{
        title: '404',
        name: 'Jeu Junior',
        errorMessage: 'Page not found...'
    });
});



app.listen(8080,()=>{
    console.log('Server is up on port 8080');
});



// that has no utility since we declare the app.use settled to the public directory path
// app.get('',(req,res)=>{ // returns html data
//     res.send('<p style="color:red">Hello Express!</p>');
// });


// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     });
// });

// app.get('/help',(req,res)=>{ // returns json data
//     res.send([ // removes the [ since you dont have a array obj
//             {
//                 name: 'Andrew',age: 27
//             },
//             {
//                 name: 'Junior',age: 30
//             }
//         ]);
// });
// app.get('/about',(req,res)=>{
//     res.send('About page');
// });