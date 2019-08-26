const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./Utils/geocode.js');
const forecast = require('./Utils/forecast.js');

const port =  process.env.PORT || 3000;

const app = express();
app.set("view engine","hbs");
app.set("views","templates/views")
hbs.registerPartials(path.join(__dirname,"../templates/partials"))
app.use(express.static(path.join(__dirname,"../public")))

app.get("",(req, res) => {
    res.render("index",{
        title: "Weather",
        name: "Ankish"
    })
});

app.get("/about",(req, res) => {
    res.render("about",{
        title: "About",
        name: "Ankish"
    })
});

app.get("/help",(req, res) => {
    res.render("help",{
        helpText: "Help text",
        title: "Help",
        name: "Ankish"
    })
});

app.get("/weather",(req, res) => {
    if (!req.query.address) {
        return res.send({
            error : "You must provide an address"
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return  res.send({
                error,
                address : req.query.address
            });
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if (error) {
                return  res.send({
                    error,
                    address : req.query.address
                });
            }
            console.log(location);
            console.log(forecastData);
            res.send({
                forecast: forecastData,
                location: location,
                address : req.query.address.toString()
            });
        })
    })

});


app.get('/help/*',(require,res) => {
    res.render('404',{
        errorMessage: 'Help Page - 404 not found',
        title: 'Help 404',
        name: "Ankish"
    })
});

app.get('*',(require,res) => {
   res.render('404',{
       errorMessage: '404 not found',
       title: '404'
   })
});
app.listen(port, () => {
    console.log("server is up:" + port);
})