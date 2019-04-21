console.log('Client side javascript file is loaded!');
//http://puzzle.mead.io/puzzle

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
// fetch('https://www.mocky.io/v2/5cad515a2f0000b71c3a950b').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });
const getLocation = (location)=>{
fetch('https://171c31a14d7c4beb9235d576e1bf617e.vfs.cloud9.us-east-2.amazonaws.com/weather?address='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
        }else{
            console.log(data);
            console.log(data.location);
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

        }
    });
});    
}



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log('Testing');
    let location = search.value;
    // console.log(location);
    
    getLocation(location);
    
    
    
    
});