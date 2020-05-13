const axios = require('axios');
const fs = require('fs');


token = fs.readFileSync("./.token");
const config = {
    headers: {'Authorization': 'Bearer ' + token }
  };
  function GetData(callback){
    axios.get("https://tetr.io/api/users/me", config)
    .then(response => {
       console.log(response.data)
       let rating ="Rating: "+ response.data.user.league.rating.toFixed(2);
       let rank ="Tetra League rank: "+ response.data.user.league.rank.toUpperCase();
        let gp = "Games played:" + response.data.user.league.gamesplayed;
        let gw = "Games won:" + response.data.user.league.gameswon;
        
       fs.writeFile('rating.txt', rating, (err) => { 
     
           // In case of a error throw err. 
           if (err) throw err; 
       });
       fs.writeFile('rank.txt', rank, (err) => { 
     
        // In case of a error throw err. 
        if (err) throw err; 
        }); 
        fs.writeFile('gamesplayed.txt', rating, (err) => { 
     
            // In case of a error throw err. 
            if (err) throw err; 
        });
        fs.writeFile('gameswon.txt', rating, (err) => { 
     
            // In case of a error throw err. 
            if (err) throw err; 
        });
   });

   callback();
  }
function waitMinute(){
    setTimeout(function(){
        GetData(waitMinute);
    }, 60000)
}

GetData(waitMinute);
   