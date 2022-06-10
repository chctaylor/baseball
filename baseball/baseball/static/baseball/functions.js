document.addEventListener('DOMContentLoaded', function() {

    // Retrieve todays date and games
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + mm + dd;

    console.log(today);

    fetch(`http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'&start_date='${today}'&end_date='${today}'&season='2022'`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // See all games playing today
        console.log(data.mlb_broadcast_info.queryResults.row)

        const games = data.mlb_broadcast_info.queryResults.row
        const home_team_full = data.mlb_broadcast_info.queryResults.row.home_team_full
        const away_team_full = data.mlb_broadcast_info.queryResults.row.away_team_full
        const game_time_local = data.mlb_broadcast_info.queryResults.row.game_time_local
        
        for (index = 0; index <= games.length; index++) {
            
            console.log(games[index].home_team_full);
            //console.log(games[index].away_team_full);
            //console.log(games[index].game_time_local);

            const div_element = document.createElement('div');
            div_element.innerHTML = `${games[index].home_team_full} vs. ${games[index].away_team_full} at ${games[index].game_time_local}`;
            document.getElementById("game").appendChild(div_element);
        }

    });
});