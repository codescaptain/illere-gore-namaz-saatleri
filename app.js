const cheerio = require("cheerio");
require('dotenv').config()
const express = require("express");
const fetch = require("node-fetch");
const slugify = require("slugify");


const app = express();

app.get("/get/:city", async (req, res) => {
    var city = req.params.city;
    var datas = [];


    await fetch(process.env.API_URI.replace('{0}', slugify(city)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            $('.detail-container').each(function (i, e) {
                datas = {
                    Sehir: city.charAt(0).toUpperCase()+city.slice(1),
                    Bugun:$(this)
                        .find('.group.row-fluid.mb10 .group.pull-left .group.category-other small')
                        .text(),
                    imsak: $(this)
                        .find('.group.row-fluid.mb10 .time-group li a b[id=imsakZamani]')
                        .text(),
                    Günes: $(this)
                        .find('.group.row-fluid.mb10 .time-group li a b[id=gunesZamani]')
                        .text(),
                    Ogle: $(this)
                        .find('.group.row-fluid.mb10 .time-group li a b[id=ogleZamani]')
                        .text(),
                    Ikindi: $(this)
                        .find('.group.row-fluid.mb10 .time-group li a b[id=ikindiZamani]')
                        .text(),
                    Aksam: $(this)
                        .find('.group.row-fluid.mb10 .time-group li a b[id=aksamZamani]')
                        .text(),
                    Yatsi: $(this)
                        .find('.group.row-fluid.mb10 .time-group li a b[id=yatsiZamani]')
                        .text(),



                }

            })

        })
    res.send(datas);

})
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Sunucu Ayakta")
})
