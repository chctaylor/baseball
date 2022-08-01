function get_api_team_id () {

    // Get current year
    var today = new Date();
    var yyyy = today.getFullYear();

    // Get yesterdays date for transactions
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    var y_dd = String(yesterday.getDate()).padStart(2, '0');
    var y_mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    var y_yyyy = yesterday.getFullYear();

    yesterday = y_yyyy + y_mm + y_dd;

    // Fetch for all teams to get current visited team info
    fetch(`http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='${yyyy}'&team_all_season.col_in=name_display_full&team_all_season.col_in=team_id`)
    .then(response => response.json())
    .then(data => {

        all_teams_data = data.team_all_season.queryResults.row;

        // Get URL and breakdown team name
        const url = new URL(window.location.href);

        var split_path = url.pathname.split('/');
        const team_name = split_path[2].replaceAll("_", " ");

        // Get MLB API Team ID
        var team_id;

        // Find current visited team and search for team hitting/pitching leaders
        for (let index=0; index < all_teams_data.length; index++) {

            if (team_name == all_teams_data[index].name_display_full) {
                team_id = all_teams_data[index].team_id;
                get_searched_team_leaders(yyyy, team_id);
                get_recent_team_transactions(yesterday, team_id)
            }
        }
        
    });    
}

async function get_searched_team_leaders (yyyy, team_id) {

    // Define hitting and pitching stats needed for leaders
    const hitting_stat = ["hr", "rbi", "avg", "r", "h"]
    const pitching_stat = ["so", "w", "era", "whip", "qs"]

    // Get hitting leaders for each hitting stat
    for (let index=0; index < hitting_stat.length; index++) {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='${hitting_stat[index]}'&leader_hitting_repeater.col_in=name_display_first_last&leader_hitting_repeater.col_in=${hitting_stat[index]}&leader_hitting_repeater.col_in=player_id&leader_hitting_repeater.col_in=team_abbrev&leader_hitting_repeater.col_in=team_name&team_id='${team_id}'`)
        const hitting_data = await response.json();
        const hitting_data_total_results = hitting_data.leader_hitting_repeater.leader_hitting_mux.queryResults.totalSize
        const hitting_data_clean = hitting_data.leader_hitting_repeater.leader_hitting_mux.queryResults.row
        const current_hitting_stat = hitting_stat[index]

        // Get leaders for individual hitting stat and create html
        if (hitting_data_total_results == "0") {
            create_no_leaders_apology(`hitting_leaders_${current_hitting_stat}`);
        }
        else if (hitting_data_total_results == "1") {
            create_pitching_leaders(hitting_data_clean.name_display_first_last, hitting_data_clean.team_abbrev, hitting_data_clean[current_hitting_stat], hitting_data_clean.team_name, current_hitting_stat)
        }
        else {
            for (let j = 0; j < hitting_data_total_results; j++) {
                create_hitting_leaders(hitting_data_clean[j].name_display_first_last, hitting_data_clean[j].team_abbrev, hitting_data_clean[j][current_hitting_stat], hitting_data_clean[j].team_name, current_hitting_stat)
            }
    
        }
    }

    // Get pitching leaders for each pitching stat
    for (let index=0; index < pitching_stat.length; index++) {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='${pitching_stat[index]}'&leader_pitching_repeater.col_in=${pitching_stat[index]}&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name&team_id='${team_id}'`)
        const pitching_data = await response.json();
        const pitching_data_total_results = pitching_data.leader_pitching_repeater.leader_pitching_mux.queryResults.totalSize
        const pitching_data_clean = pitching_data.leader_pitching_repeater.leader_pitching_mux.queryResults.row
        const current_pitching_stat = pitching_stat[index]

        // Get leaders for individual pitching stat and create html
        if (pitching_data_total_results == "0") {
            create_no_leaders_apology(`pitching_leaders_${current_pitching_stat}`);
        }
        else if (pitching_data_total_results == "1") {
            create_pitching_leaders(pitching_data_clean.name_display_first_last, pitching_data_clean.team_abbrev, pitching_data_clean[current_pitching_stat], pitching_data_clean.team_name, current_pitching_stat)
        }
        else {
            for (let j =0; j < pitching_data_total_results; j++) {
                create_pitching_leaders(pitching_data_clean[j].name_display_first_last, pitching_data_clean[j].team_abbrev, pitching_data_clean[j][current_pitching_stat], pitching_data_clean[j].team_name, current_pitching_stat)
            }
        }
         
    }
}

// Create hitting leaders for each hitting stat hr, rbi, avg, r, h
async function create_hitting_leaders (player_name, player_team_abbrev, hitting_stat_count, player_team_full, stat) {
    const player_info_li = document.createElement('li');
    const team_info = document.createElement('a');
    const player_info = document.createElement('a');

    team_info.href = `/team/${player_team_full.replaceAll(" ", "_")}`
    player_info.href = `/player/${player_name.replace(" ", "_")}`

    team_info.setAttribute('id', 'team-info');
    player_info.setAttribute('id', 'player-info');

    team_info.innerHTML = `(${player_team_abbrev})`;
    player_info.innerHTML = `${player_name}`;

    player_info_li.appendChild(player_info);
    player_info_li.insertAdjacentHTML('beforeend', ' ');
    player_info_li.appendChild(team_info);
    player_info_li.insertAdjacentHTML('beforeend', ` - ${hitting_stat_count}`)

    document.getElementById(`hitting_leaders_${stat}`).appendChild(player_info_li)
}

// Create pitching leaders for each pitching stat so, w, era, whip, qs
async function create_pitching_leaders (player_name, player_team_abbrev, pitching_stat_count, player_team_full, stat) {
    const player_info_li = document.createElement('li');
    const team_info = document.createElement('a');
    const player_info = document.createElement('a');

    team_info.href = `/team/${player_team_full.replaceAll(" ", "_")}`
    player_info.href = `/player/${player_name.replace(" ", "_")}`

    team_info.setAttribute('id', 'team-info');
    player_info.setAttribute('id', 'player-info');

    team_info.innerHTML = `(${player_team_abbrev})`;
    player_info.innerHTML = `${player_name}`;

    player_info_li.appendChild(player_info);
    player_info_li.insertAdjacentHTML('beforeend', ' ');
    player_info_li.appendChild(team_info);
    player_info_li.insertAdjacentHTML('beforeend', ` - ${pitching_stat_count}`)

    document.getElementById(`pitching_leaders_${stat}`).appendChild(player_info_li)
}

async function create_no_leaders_apology (element_id_stat) {
    document.getElementById(`${element_id_stat}`).innerHTML = "We apologize, but there are no leaders in this category at this time"
}

async function create_no_transaction_apology () {
    document.getElementById("transactions").innerHTML = "We apologize, but there were no team transactions made yesterday"
}

async function get_recent_team_transactions (yesterday, team_id) {
    const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.transaction_all.bam?sport_code='mlb'&start_date='${yesterday}'&end_date='${yesterday}'&team_id='${team_id}'`)
    const team_transaction_data = await response.json();
    const team_transaction_data_total_results = team_transaction_data.transaction_all.queryResults.totalSize
    const team_transaction_data_clean = team_transaction_data.transaction_all.queryResults.row

    if (team_transaction_data_total_results == "0") {
        create_no_transaction_apology();
    }
    else if (team_transaction_data_total_results == "1") {
        create_recent_team_transaction(team_transaction_data_clean.team, team_transaction_data_clean.name_display_first_last, team_transaction_data_clean.note);
    }
    else if (team_transaction_data_total_results < 10) {
        for (let index = 0; index < team_transaction_data_total_results; index++) {
            create_recent_team_transaction(team_transaction_data_clean[index].team, team_transaction_data_clean[index].name_display_first_last, team_transaction_data_clean[index].note)
        }
    }
    else {
        for (let index = 0; index < 10; index++) {
            create_recent_team_transaction(team_transaction_data_clean[index].team, team_transaction_data_clean[index].name_display_first_last, team_transaction_data_clean[index].note)
        }
    }
}

async function create_recent_team_transaction(team_name, player_name, note_details) {
    const team_player_info = document.createElement('h5');
    const team_info = document.createElement('a');
    const player_info = document.createElement('a');

    team_info.href = `/team/${team_name.replaceAll(" ", "_")}`
    player_info.href = `/player/${player_name.replace(" ", "_")}`

    const transaction_note = document.createElement('div');
    const divider = document.createElement('hr');

    team_player_info.setAttribute('id', 'team_player')
    team_info.setAttribute('id', 'team-info');
    player_info.setAttribute('id', 'player-info');

    team_info.innerHTML = `${team_name}`
    player_info.innerHTML = `${player_name}`
    transaction_note.innerHTML = `${note_details}`;

    team_player_info.appendChild(team_info);
    team_player_info.insertAdjacentHTML('beforeend', ' - ')
    team_player_info.appendChild(player_info);

    document.getElementById("transactions").appendChild(team_player_info);
    document.getElementById("transactions").appendChild(transaction_note);
    document.getElementById("transactions").appendChild(divider);

}

// Get Twitter created date and reformate
function reformate_twitter_created_date() {
    const all_tweet_created = document.querySelectorAll('#tweet-created')
    for (let i = 0; i < all_tweet_created.length; i++) {
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
    // Get team id of current team page
    get_api_team_id();

    reformate_twitter_created_date();

    reformate_article_published_date();
});


// Listen for clicks on player names
document.addEventListener('click', event => {

    // Find what was clicked on
    const element = event.target;

    // If player name is clicked on in 40 Man Roster take them to player page
    if (element.id === 'player-name-40') {
        const url_player_name = element.innerHTML.replaceAll(" ", "_")
        location.href = `/player/${url_player_name}`;

    }
});
