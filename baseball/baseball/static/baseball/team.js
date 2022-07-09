function get_api_team_id () {

    // Get current year
    var today = new Date();
    var yyyy = today.getFullYear();

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
        const hitting_data_clean = hitting_data.leader_hitting_repeater.leader_hitting_mux.queryResults.row
        const current_hitting_stat = hitting_stat[index]

        // Get leaders for individual hitting stat and create html
        for (let j = 0; j < hitting_data_clean.length; j++) {
            create_hitting_leaders(hitting_data_clean[j].name_display_first_last, hitting_data_clean[j].team_abbrev, hitting_data_clean[j][current_hitting_stat], hitting_data_clean[j].team_name, current_hitting_stat)
        }

    }

    // Get pitching leaders for each pitching stat
    for (let index=0; index < pitching_stat.length; index++) {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='${pitching_stat[index]}'&leader_pitching_repeater.col_in=${pitching_stat[index]}&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name&team_id='${team_id}'`)
        const pitching_data = await response.json();
        const pitching_data_clean = pitching_data.leader_pitching_repeater.leader_pitching_mux.queryResults.row
        const current_pitching_stat = pitching_stat[index]

        // Get leaders for individual pitching stat and create html
        for (let j =0; j < pitching_data_clean.length; j++) {
            create_pitching_leaders(pitching_data_clean[j].name_display_first_last, pitching_data_clean[j].team_abbrev, pitching_data_clean[j][current_pitching_stat], pitching_data_clean[j].team_name, current_pitching_stat)
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

document.addEventListener('DOMContentLoaded', function() {
    // Get team id of current team page
    get_api_team_id();
});
