//in src folder thus use NODE SRC/APP.JS in TERMINAL

//USE NODEMON, WILL TRACK CHANGES ON ITS OWN

const express=require('express')//express here is NOT AN OBJECT but a FUNCTION

const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const request=require('request')
const app=express()//application generated

const hbs=require('hbs')

const path=require('path')
const publicDirectoryPath=path.join(__dirname,'../public')
//dirname=till src folder
//filename=till app.js file
//.. is used to go one folder up(out of one folder)
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')//setting handlebars
app.set('views',viewPath)//telling express to access hbs files
app.use(express.static(publicDirectoryPath))//setting up static directory to serve

hbs.registerPartials(partialsPath)//registers partials at that path


//app.get() takes two arguments 1.route 2. function with 2 arguments(info coming with the request and the response that could be an html file or a json file)

/*
app.get('/help',(req,res)=>{
    res.send([{
        name:'Urvashi',
        age:19,
    },{
        name:'Aarya', 
        }])//takes this object as a json object and parses it(stringifies) it(to store in database or browser, it must be a string)
})
*/

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Urvashi Shukla'
    })//renders hbs:first argument view name and 2nd response (json)
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Urvashi Shukla'
    })//renders hbs:first argument view name and 2nd response (json)
})

    
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:`Here's some help!`,
        title:'Help',
        name:'Urvashi Shukla'
    })
})

app.get('/footer',(req,res)=>{
    res.render('footer',{
        name:`Urvashi Shukla`,
    })
})

app.get('/products',(req,res)=>{

    //you cant respond to a single request twice hence inside if, use return .
    console.log(req.query);

    if(!req.query.search){
return res.send({
    error:'You must provide a search item'
})
}
console.log(req.query.search);
res.send({
    products:[],
})
})

app.get('/weather',(req,res)=>{
    const address=req.query.address;
    if(!address){
return res.send({
    error:'You must provide a search item'
})
}

else{
    geocode(address,(error,{lon,lat,place}={})=>{
        if(error){
          return res.send({error})
        }
        forecast({lat,lon},(error,data)=>{
          if(error){
            return res.send({error})
          }
        res.send({
            forecast:data,
            location:place,
            address:req.query.address,
        })
        })
      }) 
}
})


//wild card character

app.get('/help/*',(req,res)=>{
    res.render('404',{
        para:'Help article not found',
        name:`Urvashi Shukla`,
    })
})

app.get('*',(req,res)=>{
res.render('404',{
    para:'Page not found',
    name:`Urvashi Shukla`,
})
})//always in the END after its done matching all get 

//app.com
//app.com/help
//app.com/about

//used ONCE to START SERVER
app.listen(3000,()=>{
    console.log('Server is up on port 3000.');
})//port=3000 here


