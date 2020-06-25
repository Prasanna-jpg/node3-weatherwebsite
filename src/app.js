const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('../utils/geocode')
const forecast=require('../utils/forecast')
const app=express()
console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))

//Define path for express config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handle bar engines and view location
app.set('view engine','hbs')
//if you want to overwrite the path to look the views(template) ,below one could be useful
app.set('views',viewsPath)
//now set the partials for footer or header
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prasanna'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Prasanna'
    })
})


app.get('',(req,res)=>{
res.send('<h1>Hello express</h1>')
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
error:'Please enter a valid search term'
        })
            }
                console.log(req.query)
                res.send({
                    products:[]
                })
           
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send( {error:'No address entered'})
    }
    // res.send({
    //     forecast: '50 degrees',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
//destructured callback {latitude,longitude,location}=data
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
        
            
        if (error){
            return response.send({error})
        } 
        res.send({forecast:forecastData,
        location:location,
    address:req.query.address})
          })
        
        })
})

//Help 404 page
app.get('/help/*',(req,res)=>{
res.render('error',{
    title:'Help 404 page',
    message:'Help article not found',
    name:'Prasanna'
})
    

})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'You are in help page',
        title:'Help',
        name:'Prasanna'
    })
})

//404 page
app.get('*',(req,res)=>{

    res.render('error',{
        title:'404 Page',
        message:'No pages found 404',
        name:'Prasanna'
    })

})


//app.com - eempty get
//app.com/help - '/help' get



   
   
    

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
}) //to start the server on 3000, call back function is optional