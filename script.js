const axios = require('axios');
const fs = require('fs');


token = fs.readFileSync(".token");
const config = {
    headers: {'Authorization': 'Bearer ' + token }
  };
  function GetData(callback){
    axios.get("https://tetr.io/api/users/5e77979d1c08bb29066f7b93", config)
    .then(response => {
        console.log("succes",);
        let user = response.data.user;
        let l = '40l'
        let records = response.data.user.records
       Object.keys(records).forEach(function(key) {
           var value = records[key];
           
           if(value.record.endcontext.gametype == "40l"){
            //console.log(value.record.endcontext.finalTime);
            function millisToMinutesAndSeconds(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(3);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
              }

            let finalTime = "40L best time: " + millisToMinutesAndSeconds(value.record.endcontext.finalTime);
                console.log(finalTime);
            fs.writeFile('sprint.txt', finalTime, (err) => { 
     
                // In case of a error throw err. 
                if (err) throw err; 
            });
           }
           
       })

       function XPtoLevel(xp) {
        return Math.pow(xp / 500, 0.6) + ((1 / 5000) * xp) + 1;
    }



       let rating ="Rating: "+ user.league.rating.toFixed(2);
       let rank ="Tetra League rank: "+ user.league.rank.toUpperCase();
        let gp = "Games played: " + user.league.gamesplayed;
        let gw = "Games won: " + user.league.gameswon;
        let level = "Level: " + XPtoLevel(user.xp).toFixed(0);
        let wlpercentage = "W/L precentage: " + Math.floor(user.league.gameswon/user.league.gamesplayed*100) + "%";
       
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
    /*axios.get("https://tetr.io/api/users/me", config)
    .then(response => {
       console.log("succes");
       let user = response.data.user;
       
     
   });*/

   callback();
  }
function waitMinute(){
    setTimeout(function(){
        GetData(waitMinute);
    }, 180000 )
}

GetData(waitMinute);
   