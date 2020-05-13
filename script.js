const axios = require('axios');
const fs = require('fs');


token = fs.readFileSync(".token");
const config = {
    headers: {'Authorization': 'Bearer ' + token }
  };
  function GetData(callback){
    axios.get("https://tetr.io/api/users/me", config)
    .then(response => {
       console.log(response.data)
       let user = response.data.user;
       
       function XPtoLevel(xp) {
        return Math.pow(xp / 500, 0.6) + ((1 / 5000) * xp) + 1;
    }



       let rating ="Rating: "+ user.league.rating.toFixed(2);
       let rank ="Tetra League rank: "+ user.league.rank.toUpperCase();
        let gp = "Games played: " + user.league.gamesplayed;
        let gw = "Games won: " + user.league.gameswon;
        let level = "Level: " + XPtoLevel(user.xp).toFixed(0);
        let wlpercentage = "(" + Math.floor(user.league.gameswon/user.league.gamesplayed*100) + ")";
       
       fs.writeFile('rating.txt', rating, (err) => { 
     
           // In case of a error throw err. 
           if (err) throw err; 
       });
       fs.writeFile('rank.txt', rank, (err) => { 
     
        // In case of a error throw err. 
        if (err) throw err; 
        }); 
        fs.writeFile('gamesplayed.txt', gp, (err) => { 
     
            // In case of a error throw err. 
            if (err) throw err; 
        });
        fs.writeFile('gameswon.txt', gw, (err) => { 
     
            // In case of a error throw err. 
            if (err) throw err; 
        });

        fs.writeFile('percentage.txt', wlpercentage, (err) => { 
     
            // In case of a error throw err. 
            if (err) throw err; 
        });
        
        fs.writeFile('level.txt', level, (err) => { 
     
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
   