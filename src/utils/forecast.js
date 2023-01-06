const request=require('request')

const forecast=({lat,lon},callback)=>{

const url='http://api.weatherstack.com/current?access_key=caeffdb97362c0d68359bd3c2bc04622&query='+lat+','+lon+'&units=f';

request({url,json:true},(error,{body})=>{
    // console.log(response)
    // console.log(response.body.current);
    if(error){
   callback('Unable to connect to weather service. You may want to check your network.',undefined);
    }
    else if(body.error){
        callback('Unable to find location! There might be a problem in the URL',undefined);
    }
    else{
        callback(undefined,`It is currently ${body.current.temperature} farhenheit out though it feels like ${body.current.feelslike} farhenheit.`);
    }
})
}

module.exports=forecast