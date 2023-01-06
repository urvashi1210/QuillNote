console.log('Client side server script is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//    response.json().then((data)=>{
//     console.log(data);
//    }) 
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//    response.json().then((data)=>{
//       if(data.error){
//          console.log(data.error);
//          //response has 1.error 2.data if one exists, other's undefined (we designed it such way in callback)
//       }
//       else{
//        console.log(data);
//        console.log(data.location);  
//        console.log(data.forecast);
//       }
//    })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
let message1=document.querySelector('#message-1')
let message2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()
   message1.textContent='Loading...'
   message2.textContent=''
   const location=search.value
     fetch('http://localhost:3000/weather?address='+location).then((response)=>{
      response.json().then((data)=>{
         if(data.error){
            message1.textContent='Error'
            message2.textContent='Unable to find location. Try another search!'
            console.log('Unable to find location. Try another search!');
         }
         else{
            message1.textContent=data.location
            message2.textContent=data.forecast

            console.log(data);
            console.log(data.location);  
            console.log(data.forecast);  
         }
      })
     })
   }
)