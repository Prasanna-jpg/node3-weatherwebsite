const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=4d590be2c9b26751e18d116f3b707420&query='+latitude+','+longitude+'&units=f'

    request({url:url,json:true},(error,response)=>{
        if(error)
{ 
    callback('Not able to connect',undefined)
}else if (response.body.error){
    console.log('API')
    callback(response.body.error.info,undefined)

}else{
    const temp=response.body.current.temperature
           const  precip=response.body.current.precip
           
    callback(undefined,response.body.location.timezone_id+' It is currently '+ temp+ ' degrees  out. It feels like '+precip+' out'+' and the humidity is '+response.body.current.humidity)
}
    })
}

module.exports=forecast