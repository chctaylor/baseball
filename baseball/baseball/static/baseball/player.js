function create_season_hitting_stats (season_stat, season_team_abbrev, ab_stat, r_stat, h_stat, hr_stat, rbi_stat, avg_stat) {
    // Create table elements for season hitting stats
    const season_th = document.createElement('th');
    const team_td = document.createElement('td');
    const ab_td = document.createElement('td');
    const r_td = document.createElement('td');
    const h_td = document.createElement('td');
    const hr_td = document.createElement('td');
    const rbi_td = document.createElement('td');
    const avg_td = document.createElement('td');
    const hitting_stat_tr = document.createElement('tr');

    hitting_stat_tr.setAttribute("scope", "row");

    hitting_stat_tr.appendChild(season_th);
    hitting_stat_tr.appendChild(team_td);
    hitting_stat_tr.appendChild(ab_td);
    hitting_stat_tr.appendChild(r_td);
    hitting_stat_tr.appendChild(h_td);
    hitting_stat_tr.appendChild(hr_td);
    hitting_stat_tr.appendChild(rbi_td);
    hitting_stat_tr.appendChild(avg_td);

    // Set elements data
    season_th.innerHTML = `${season_stat}`;
    team_td.innerHTML = `${season_team_abbrev}`;
    ab_td.innerHTML = `${ab_stat}`;
    r_td.innerHTML = `${r_stat}`;
    h_td.innerHTML = `${h_stat}`;
    hr_td.innerHTML = `${hr_stat}`;
    rbi_td.innerHTML = `${rbi_stat}`;
    avg_td.innerHTML = `${avg_stat}`;

    document.getElementById("season-hitting-stats").appendChild(hitting_stat_tr);

}

function create_season_pitching_stats (season_stat, season_team_abbrev, w_stat, l_stat, era_stat, ip_stat, so_stat, whip_stat) {
    // Create table elements for season pitching stats
    const season_th = document.createElement('th');
    const team_td = document.createElement('td');
    const w_td = document.createElement('td');
    const l_td = document.createElement('td');
    const era_td = document.createElement('td');
    const ip_td = document.createElement('td');
    const so_td = document.createElement('td');
    const whip_td = document.createElement('td');
    const pitching_stat_tr = document.createElement('tr');

    pitching_stat_tr.setAttribute("scope", "row");

    pitching_stat_tr.appendChild(season_th);
    pitching_stat_tr.appendChild(team_td);
    pitching_stat_tr.appendChild(w_td);
    pitching_stat_tr.appendChild(l_td);
    pitching_stat_tr.appendChild(era_td);
    pitching_stat_tr.appendChild(ip_td);
    pitching_stat_tr.appendChild(so_td);
    pitching_stat_tr.appendChild(whip_td);

    // Set elements data
    season_th.innerHTML = `${season_stat}`;
    team_td.innerHTML = `${season_team_abbrev}`;
    w_td.innerHTML = `${w_stat}`;
    l_td.innerHTML = `${l_stat}`;
    era_td.innerHTML = `${era_stat}`;
    ip_td.innerHTML = `${ip_stat}`;
    so_td.innerHTML = `${so_stat}`;
    whip_td.innerHTML = `${whip_stat}`;

    document.getElementById("season-pitching-stats").appendChild(pitching_stat_tr);

}

// Get season data based on position played
async function get_player_season_data (season_year, player_id, player_position) {
    if (player_position != "P") {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${season_year}'&player_id='${player_id}'`)
        const data = await response.json();
        return data;
    }
    else {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${season_year}'&player_id='${player_id}'`)
        const data = await response.json();
        return data;
    }
}

// Get all the seasons a player has played and get each season data
async function get_all_player_season_data (player_id, player_debut_year, player_position) {
    var today = new Date();
    var yyyy = today.getFullYear();

    const all_player_season_data_promises = [];

    for (let index = (yyyy - 1); index >= player_debut_year; index--) {
        const season_data_promise = get_player_season_data(index, player_id, player_position);
        all_player_season_data_promises.push(season_data_promise);
    }

    return Promise.all(all_player_season_data_promises);

}

// Get Twitter created date and reformate
function reformate_twitter_created_date() {
    const all_tweet_created = document.querySelectorAll('#tweet-created')
    for (i = 0; i < all_tweet_created.length; i++) {
        const tweet_created = all_tweet_created[i].innerHTML
        const split_tweet_created_time = tweet_created.split("T")
        const split_tweet_created = split_tweet_created_time[0].split("-")
        const tweet_created_month = split_tweet_created[1]
        const tweet_created_day = split_tweet_created[2]
        const tweet_created_year = split_tweet_created[0]
        const formatted_tweet_created = `${tweet_created_month} - ${tweet_created_day} -${tweet_created_year}`
        all_tweet_created[i].innerHTML = formatted_tweet_created
    }
}

// Get news articles published date and reformate
function reformate_article_published_date() {
    const all_articles_published = document.querySelectorAll('#article-published')
    for (let i = 0; i < all_articles_published.length; i++) {
        const article_published = all_articles_published[i].innerHTML
        const split_article_published_time = article_published.split("T")
        const split_article_published = split_article_published_time[0].split("-")
        const article_published_month = split_article_published[1]
        const article_published_day = split_article_published[2]
        const article_published_year = split_article_published[0]
        const formatted_article_published = `${article_published_month} - ${article_published_day} - ${article_published_year}`
        all_articles_published[i].innerHTML = formatted_article_published
    }
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
    .then(async data => {
        
        console.log(data);
        // Get searched player info
        player_data = data.search_player_all.queryResults.row;
        console.log(player_data);

        console.log(player_data.pro_debut_date);
        // Get player debut year
        var player_debut_date = player_data.pro_debut_date;
        var player_debut_year = player_debut_date.split('-')[0];
        console.log(player_debut_year);

        // Get number of years played
        var player_years_played = yyyy - player_debut_year;
        console.log(player_years_played)
        
        // Determine player has data and search season stats for previous years based on position
        if (data.search_player_all.queryResults.totalSize > "0") {

            const all_player_season_data = await get_all_player_season_data(player_data.player_id, player_debut_year, player_data.position);

            for (let index=0; index < all_player_season_data.length; index++) {
                
                const season_data = all_player_season_data[index];
                console.log(index)

                if (player_data.position != "P") {

                    console.log(season_data);
                        
                    // SERGIO ROMO PROBLEM: If totalSize > 1, get totalSize, for i < totalSize, season_pitching_data[i], create
                    if (season_data.sport_hitting_tm.queryResults.totalSize > 1) {
                        for (let index = 0; index < season_data.sport_hitting_tm.queryResults.totalSize; index++) {

                            season_hitting_data = season_data.sport_hitting_tm.queryResults.row[index];

                            create_season_hitting_stats(season_hitting_data.season, season_hitting_data.team_abbrev, season_hitting_data.ab, season_hitting_data.r, season_hitting_data.h, season_hitting_data.hr, season_hitting_data.rbi, season_hitting_data.avg);

                        }
                    }
                    else {
                        season_hitting_data = season_data.sport_hitting_tm.queryResults.row;
                        // Ohtani Rule: Check to see if player had a gap year
                        if (season_data.sport_hitting_tm.queryResults.totalSize != "0") {
                            create_season_hitting_stats(season_hitting_data.season, season_hitting_data.team_abbrev, season_hitting_data.ab, season_hitting_data.r, season_hitting_data.h, season_hitting_data.hr, season_hitting_data.rbi, season_hitting_data.avg);
                        }
                    }
                }
                else {
                    console.log(season_data);

                        // Check to see if player has been on multiple teams in a single season
                        if (season_data.sport_pitching_tm.queryResults.totalSize > 1) {
                            for (let index = 0; index < season_data.sport_pitching_tm.queryResults.totalSize; index++) {
                                console.log("Test")
                                console.log(season_data.sport_pitching_tm.queryResults.row[index].season)

                                season_pitching_data = season_data.sport_pitching_tm.queryResults.row[index];

                                create_season_pitching_stats(season_pitching_data.season, season_pitching_data.team_abbrev, season_pitching_data.w, season_pitching_data.l, season_pitching_data.era, season_pitching_data.ip, season_pitching_data.so, season_pitching_data.whip);

                            }
                        }
                        else {
                            season_pitching_data = season_data.sport_pitching_tm.queryResults.row;
                            // Ohtani Rule: Check to see if player had a gap year
                            if (season_data.sport_pitching_tm.queryResults.totalSize != "0") {
                                create_season_pitching_stats(season_pitching_data.season, season_pitching_data.team_abbrev, season_pitching_data.w, season_pitching_data.l, season_pitching_data.era, season_pitching_data.ip, season_pitching_data.so, season_pitching_data.whip);
                            }

                        }
                }
            }
        }
    });

    // Get pro debut and reformate
    const pro_debut_date = document.getElementById("pro-debut-date").innerHTML
    const split_pro_debut_date_time = pro_debut_date.split("T")
    const split_pro_debut_date = split_pro_debut_date_time[0].split("-")
    const pro_debut_month = split_pro_debut_date[1]
    const pro_debut_day = split_pro_debut_date[2]
    const pro_debut_year = split_pro_debut_date[0]
    const formatted_pro_debut = `${pro_debut_month}-${pro_debut_day}-${pro_debut_year}`
    document.getElementById("pro-debut-date").innerHTML = formatted_pro_debut

    reformate_article_published_date();

    reformate_twitter_created_date();
    
});

// Listen for clicks on team names
document.addEventListener('click', event => {

    // Find what was clicked on
    const element = event.target;

    // If team name is clicked on in player bio take them to team page
    if (element.id === 'team-name-bio') {
        const url_player_name = element.innerHTML.replaceAll(" ", "_")
        location.href = `/team/${url_player_name}`;

    }
});