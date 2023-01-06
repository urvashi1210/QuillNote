
//Geocoding
//address->lat/long(back)->weather(front)

const request=require('request')

const geocode=(address,callback)=>{

  const options = {
    method: 'GET',
    url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
    qs: {
      city: address,
      'accept-language': 'en',
      polygon_threshold: '0.0'
    },
    headers: {
      'X-RapidAPI-Key': 'd7c81e58femshf85fe158752e233p173b78jsnec77f2656ec6',
      'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
      useQueryString: true
    }
  };

  request(options,(error,response,body)=> {
    if (error){
      callback('Unable to connect to location sevices, try another search!',)
    }
   else{
    // bodyJSON=JSON.parse(response.body);
      
      callback(undefined,{ 
      lon:JSON.parse(body)[0].lon,
      lat:JSON.parse(body)[0].lat,
      place:JSON.parse(body)[0].display_name,
    })
  }});

}

module.exports=geocode
