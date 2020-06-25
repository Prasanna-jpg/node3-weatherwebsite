const request=require('request')

// const geocode=(address,callback)=>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicG1hZGgxIiwiYSI6ImNrYmpjODZiazBuczMycm56ZTF3Z3lvMHYifQ.SZRtFhjEW1paUp_sWhdRfQ&limit=1'
//     request({url:url,json:true},(error,response)=>{
//         if(error){
                   
//                     callback('Not able to connect',undefined)
//                 }else if(!response.body.features[0] && response.body.features.length===0){
//                     callback('Its an empty array try another search',undefined)
//                 }else{
                
//                 callback(undefined,response.body.features[0].center[0]+','+response.body.features[0].center[1]+','+response.body.features[0].place_name)
              
//                 }
    
//     })
//     }




const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicG1hZGgxIiwiYSI6ImNrYmpjODZiazBuczMycm56ZTF3Z3lvMHYifQ.SZRtFhjEW1paUp_sWhdRfQ&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,  {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

    