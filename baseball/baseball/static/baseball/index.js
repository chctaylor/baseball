// Create List for Home Run (HR) Hitting Leaders
function create_hr_leaders (player_name, player_team_abbrev, hr_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${hr_stat}`)

    document.getElementById("hitting_leaders_hr").appendChild(player_info_li)
}

// Create List for Runs Batted In (RBI) Hitting Leaders
function create_rbi_leaders (player_name, player_team_abbrev, rbi_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${rbi_stat}`)

    document.getElementById("hitting_leaders_rbi").appendChild(player_info_li)
}

// Create List for Batting Average (AVG) Hitting Leaders
function create_avg_leaders (player_name, player_team_abbrev, avg_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${avg_stat}`)

    document.getElementById("hitting_leaders_avg").appendChild(player_info_li)
}

// Create List for Runs (R) Hitting Leaders
function create_r_leaders (player_name, player_team_abbrev, r_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${r_stat}`)

    document.getElementById("hitting_leaders_r").appendChild(player_info_li)
}

// Create List for Hits (H) Hitting Leaders
function create_h_leaders (player_name, player_team_abbrev, h_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${h_stat}`)

    document.getElementById("hitting_leaders_h").appendChild(player_info_li)
}

// Create List for Strike Outs (SO) Pitching Leaders
function create_so_leaders (player_name, player_team_abbrev, so_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${so_stat}`)

    document.getElementById("pitching_leaders_so").appendChild(player_info_li)
}

// Create List for Wins (W) Pitching Leaders
function create_w_leaders (player_name, player_team_abbrev, w_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${w_stat}`)

    document.getElementById("pitching_leaders_w").appendChild(player_info_li)
}

// Create List for Earned Runs Average (ERA) Pitching Leaders
function create_era_leaders (player_name, player_team_abbrev, era_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${era_stat}`)
    
    document.getElementById("pitching_leaders_era").appendChild(player_info_li)
}

// Create List for Walks and Hits Per Inning Pitched (WHIP) Pitching Leaders
function create_whip_leaders (player_name, player_team_abbrev, whip_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${whip_stat}`)
    
    document.getElementById("pitching_leaders_whip").appendChild(player_info_li)
}

// Create List for Quality Starts (QS) Pitching Leaders
function create_qs_leaders (player_name, player_team_abbrev, qs_stat, player_team_full) {
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
    player_info_li.insertAdjacentHTML('beforeend', ` - ${qs_stat}`)

    document.getElementById("pitching_leaders_qs").appendChild(player_info_li)
}

// Create elements for Recent Transaction History
function create_transaction_item (team_name, player_name, note_details) {
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

    // THIS WORKS BUT COMMENTED OUT FOR TESTING 
    //team_player_info.innerHTML = `${team_name} - ${player_name}`;
    //transaction_note.innerHTML = `${note_details}`;

    document.getElementById("transactions").appendChild(team_player_info);
    document.getElementById("transactions").appendChild(transaction_note);
    document.getElementById("transactions").appendChild(divider);
}

// Get Twitter created date and reformate
function reformate_twitter_created_date() {
    const all_tweet_created = document.querySelectorAll('#tweet-created')
    console.log(all_tweet_created[0].innerHTML)
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

    console.log(yesterday);

    // Retrieve Home Run (HR) Hitting Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='hr'&leader_hitting_repeater.col_in=name_display_first_last&leader_hitting_repeater.col_in=hr&leader_hitting_repeater.col_in=player_id&leader_hitting_repeater.col_in=team_abbrev&leader_hitting_repeater.col_in=team_id&leader_hitting_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const hr_hitting_leader = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row

        for (index = 0; index < hr_hitting_leader.length; index++) {
            create_hr_leaders(hr_hitting_leader[index].name_display_first_last, hr_hitting_leader[index].team_abbrev, hr_hitting_leader[index].hr, hr_hitting_leader[index].team_name)
        }
    });

    // Retrieve Runs Batted In (RBI) Hitting Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='rbi'&leader_hitting_repeater.col_in=name_display_first_last&leader_hitting_repeater.col_in=rbi&leader_hitting_repeater.col_in=player_id&leader_hitting_repeater.col_in=team_abbrev&leader_hitting_repeater.col_in=team_id&leader_hitting_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const rbi_hitting_leader = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row

        for (index = 0; index < rbi_hitting_leader.length; index++) {
            create_rbi_leaders(rbi_hitting_leader[index].name_display_first_last, rbi_hitting_leader[index].team_abbrev, rbi_hitting_leader[index].rbi, rbi_hitting_leader[index].team_name)
        }
    });

    // Retrieve Batting Average (AVG) Hitting Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='avg'&leader_hitting_repeater.col_in=name_display_first_last&leader_hitting_repeater.col_in=avg&leader_hitting_repeater.col_in=player_id&leader_hitting_repeater.col_in=team_abbrev&leader_hitting_repeater.col_in=team_id&leader_hitting_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const avg_hitting_leader = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row

        for (index = 0; index < avg_hitting_leader.length; index++) {
            create_avg_leaders(avg_hitting_leader[index].name_display_first_last, avg_hitting_leader[index].team_abbrev, avg_hitting_leader[index].avg, avg_hitting_leader[index].team_name)
        }
    });

    // Retrieve Runs (R) Hitting Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='r'&leader_hitting_repeater.col_in=name_display_first_last&leader_hitting_repeater.col_in=r&leader_hitting_repeater.col_in=player_id&leader_hitting_repeater.col_in=team_abbrev&leader_hitting_repeater.col_in=team_id&leader_hitting_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const r_hitting_leader = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row

        for (index = 0; index < r_hitting_leader.length; index++) {
            create_r_leaders(r_hitting_leader[index].name_display_first_last, r_hitting_leader[index].team_abbrev, r_hitting_leader[index].r, r_hitting_leader[index].team_name)
        }
    });

    // Retrieve Hits (H) Hitting Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='h'&leader_hitting_repeater.col_in=name_display_first_last&leader_hitting_repeater.col_in=h&leader_hitting_repeater.col_in=player_id&leader_hitting_repeater.col_in=team_abbrev&leader_hitting_repeater.col_in=team_id&leader_hitting_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const h_hitting_leader = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row

        for (index = 0; index < h_hitting_leader.length; index++) {
            create_h_leaders(h_hitting_leader[index].name_display_first_last, h_hitting_leader[index].team_abbrev, h_hitting_leader[index].h, h_hitting_leader[index].team_name)
        }
    });

    // Retrieve Strike Outs (SO) Pitching Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='so'&leader_pitching_repeater.col_in=so&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const so_pitching_leader = data.leader_pitching_repeater.leader_pitching_mux.queryResults.row

        for (index = 0; index < so_pitching_leader.length; index++) {
            create_so_leaders(so_pitching_leader[index].name_display_first_last, so_pitching_leader[index].team_abbrev, so_pitching_leader[index].so, so_pitching_leader[index].team_name)
        }
    });

    // Retrieve Wins (W) Pitching Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='w'&leader_pitching_repeater.col_in=w&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const w_pitching_leader = data.leader_pitching_repeater.leader_pitching_mux.queryResults.row

        for (index = 0; index < w_pitching_leader.length; index++) {
            create_w_leaders(w_pitching_leader[index].name_display_first_last, w_pitching_leader[index].team_abbrev, w_pitching_leader[index].w, w_pitching_leader[index].team_name)
        }
    });

    // Retrieve Earned Runs Average (ERA) Pitching Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='era'&leader_pitching_repeater.col_in=era&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const era_pitching_leader = data.leader_pitching_repeater.leader_pitching_mux.queryResults.row

        for (index = 0; index < era_pitching_leader.length; index++) {
            create_era_leaders(era_pitching_leader[index].name_display_first_last, era_pitching_leader[index].team_abbrev, era_pitching_leader[index].era, era_pitching_leader[index].team_name)
        }
    });

    // Retrieve Walks and Hits Per Inning Pitched (WHIP) Pitching Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='whip'&leader_pitching_repeater.col_in=whip&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const whip_pitching_leader = data.leader_pitching_repeater.leader_pitching_mux.queryResults.row

        for (index = 0; index < whip_pitching_leader.length; index++) {
            create_whip_leaders(whip_pitching_leader[index].name_display_first_last, whip_pitching_leader[index].team_abbrev, whip_pitching_leader[index].whip, whip_pitching_leader[index].team_name)
        }
    });

    // Retrieve Quality Starts (QS) Pitching Leaders
    fetch(`http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=5&game_type='R'&season='${yyyy}'&sort_column='qs'&leader_pitching_repeater.col_in=qs&leader_pitching_repeater.col_in=player_id&leader_pitching_repeater.col_in=name_display_first_last&leader_pitching_repeater.col_in=team_abbrev&leader_pitching_repeater.col_in=team_id&leader_pitching_repeater.col_in=team_name`)
    .then(response => response.json())
    .then(data => {

        const qs_pitching_leader = data.leader_pitching_repeater.leader_pitching_mux.queryResults.row

        for (index = 0; index < qs_pitching_leader.length; index++) {
            create_qs_leaders(qs_pitching_leader[index].name_display_first_last, qs_pitching_leader[index].team_abbrev, qs_pitching_leader[index].qs, qs_pitching_leader[index].team_name)
        }
    });

    // Retrieve Transaction Data
    fetch(`http://lookup-service-prod.mlb.com/json/named.transaction_all.bam?sport_code='mlb'&start_date='${yesterday}'&end_date='${yesterday}'`)
    .then(response => response.json())
    .then(data => {

        const recent_transactions = data.transaction_all.queryResults.row
        console.log(recent_transactions.length)
        if (recent_transactions.length >= 10) {
            for (index = 0; index < 10; index++) {
                create_transaction_item(recent_transactions[index].team, recent_transactions[index].name_display_first_last, recent_transactions[index].note)
            }
        }
        else {
            for (index = 0; index < recent_transactions.length; index++) {
                create_transaction_item(recent_transactions[index].team, recent_transactions[index].name_display_first_last, recent_transactions[index].note)
            }
        }
    });
    
    reformate_article_published_date();

    reformate_twitter_created_date();

});
