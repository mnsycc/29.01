const request = require('request');
const cheerio = require('cheerio');
const prom = new Promise((resolve, reject) => {
    request('https://dou.ua/', function (err,resp,body){
        if(err){
           console.log(err);
        }else {
           let arr = [];
           const $ = cheerio.load(body);
           const get = $('.items.table > .row').each(function() {
           arr.push($('.img',this).attr('src'));
           });
           console.log("data received")
           resolve(arr);
        }
    });
});
prom.then(data => {
    console.log('data downloaded, all files', data);
    return new Promise ((resolve, reject) => {
        let obj = {
            photo1: data[0],
            photo2: data[1],
            photo3: data[2],
            files: 3,
        }
        console.log('data`s modification, data', obj);
        resolve(obj);
    });
}).then(data2 => {
    return new Promise ((resolve, reject) => {
        let obj = {
            photo1: data2.photo1,
            photo2: data2.photo2,
            files: 2,
        }
        console.log('data`s modification, data2', obj )
        resolve(data2);
    });
}).then(data3 => {
    return new Promise ((resolve, reject) => {
        let obj = {
            photo1: data3.photo1,
            files: 1,
        }
        console.log('finished', obj);
        reject("404");
    });
}).catch(err => console.error('error:',err));