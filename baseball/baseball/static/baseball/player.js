function create_season_hitting_stats (season_stat, ab_stat, r_stat, h_stat, hr_stat, rbi_stat, avg_stat) {
    // Create table elements for season hitting stats
    const season_th = document.createElement('th');
    const ab_td = document.createElement('td');
    const r_td = document.createElement('td');
    const h_td = document.createElement('td');
    const hr_td = document.createElement('td');
    const rbi_td = document.createElement('td');
    const avg_td = document.createElement('td');
    const hitting_stat_tr = document.createElement('tr');

    hitting_stat_tr.setAttribute("scope", "row");

    hitting_stat_tr.appendChild(season_th);
    hitting_stat_tr.appendChild(ab_td);
    hitting_stat_tr.appendChild(r_td);
    hitting_stat_tr.appendChild(h_td);
    hitting_stat_tr.appendChild(hr_td);
    hitting_stat_tr.appendChild(rbi_td);
    hitting_stat_tr.appendChild(avg_td);

    // Set elements data
    season_th.innerHTML = `${season_stat}`;
    ab_td.innerHTML = `${ab_stat}`;
    r_td.innerHTML = `${r_stat}`;
    h_td.innerHTML = `${h_stat}`;
    hr_td.innerHTML = `${hr_stat}`;
    rbi_td.innerHTML = `${rbi_stat}`;
    avg_td.innerHTML = `${avg_stat}`;

    document.getElementById("season-hitting-stats").appendChild(hitting_stat_tr);

}

function create_season_pitching_stats (season_stat, w_stat, l_stat, era_stat, ip_stat, so_stat, whip_stat) {
    // Create table elements for season pitching stats
    const season_th = document.createElement('th');
    const w_td = document.createElement('td');
    const l_td = document.createElement('td');
    const era_td = document.createElement('td');
    const ip_td = document.createElement('td');
    const so_td = document.createElement('td');
    const whip_td = document.createElement('td');
    const pitching_stat_tr = document.createElement('tr');

    pitching_stat_tr.setAttribute("scope", "row");

    pitching_stat_tr.appendChild(season_th);
    pitching_stat_tr.appendChild(w_td);
    pitching_stat_tr.appendChild(l_td);
    pitching_stat_tr.appendChild(era_td);
    pitching_stat_tr.appendChild(ip_td);
    pitching_stat_tr.appendChild(so_td);
    pitching_stat_tr.appendChild(whip_td);

    // Set elements data
    season_th.innerHTML = `${season_stat}`;
    w_td.innerHTML = `${w_stat}`;
    l_td.innerHTML = `${l_stat}`;
    era_td.innerHTML = `${era_stat}`;
    ip_td.innerHTML = `${ip_stat}`;
    so_td.innerHTML = `${so_stat}`;
    whip_td.innerHTML = `${whip_stat}`;

    document.getElementById("season-pitching-stats").appendChild(pitching_stat_tr);

}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve todays and yesterdays date and Leader data
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + mm + dd;

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    var y_dd = String(yesterday.getDate()).padStart(2, '0');
    var y_mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    var y_yyyy = yesterday.getFullYear();

    yesterday = y_yyyy + y_mm + y_dd;

    // Get player name from URL
    const url = new URL(window.location.href);

    var split_path = url.pathname.split('/');

    var player_name = split_path[2];
    console.log(player_name);

    fetch(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&search_player_all.col_in=name_display_first_last&search_player_all.col_in=player_id&search_player_all.col_in=pro_debut_date&search_player_all.col_in=position&name_part='${player_name}'`)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        // Get searched player info
        player_data = data.search_player_all.queryResults.row;
        console.log(player_data);

        console.log(player_data.pro_debut_date);
        // Get player debut year
        var player_debut_date = player_data.pro_debut_date;
        var player_debut_year = player_debut_date.split('-');
        console.log(player_debut_year[0]);

        // Get number of years played
        var player_years_played = yyyy - player_debut_year[0];
        console.log(player_years_played)
        
        // Determine player has data and search season stats for previous years based on position
        if (data.search_player_all.queryResults.totalSize > "0") {
            for (index = (yyyy - 1); index >= player_debut_year[0]; index--) {

                console.log(index);

                if (player_data.position != "P") {
                    fetch(`http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${index}'&player_id='${player_data.player_id}'`)
                    .then(response => response.json())
                    .then(data => {

                        console.log(data);

                        season_hitting_data = data.sport_hitting_tm.queryResults.row;
                        console.log(season_hitting_data);

                        create_season_hitting_stats(season_hitting_data.season, season_hitting_data.ab, season_hitting_data.r, season_hitting_data.h, season_hitting_data.hr, season_hitting_data.rbi, season_hitting_data.avg)
                        
                    });
                }
                else {
                    fetch(`http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${index}'&player_id='${player_data.player_id}'`)
                    .then(response => response.json())
                    .then(data => {

                        console.log(data);

                        season_pitching_data = data.sport_pitching_tm.queryResults.row;
                        console.log(season_pitching_data); 

                        create_season_pitching_stats(season_pitching_data.season, season_pitching_data.w, season_pitching_data.l, season_pitching_data.era, season_pitching_data.ip, season_pitching_data.so, season_pitching_data.whip)

                    });
                }
            }
        }
    });
    
});