// Create elements for todays games in Owl Carousel
function create_owl_carousel_item(date, team_one, team_two) {
    const item_div = document.createElement('div');
    const card_div = document.createElement('div');
    const list_group_ul = document.createElement('ul');
    const date_li = document.createElement('li');
    const team_one_li = document.createElement('li');
    const team_two_li = document.createElement('li');

    item_div.className = "item";
    card_div.className = "card";
    card_div.style.width = "13rem";
    list_group_ul.className = "list-group list-group-flush";
    date_li.className = "list-group-item";
    team_one_li.className = "list-group-item";
    team_two_li.className = "list-group-item";

    list_group_ul.appendChild(date_li);
    list_group_ul.appendChild(team_one_li);
    list_group_ul.appendChild(team_two_li);

    date_li.innerHTML = `Today: ${date} Local`;
    team_one_li.innerHTML = team_one;
    team_two_li.innerHTML = team_two;

    card_div.appendChild(list_group_ul);

    item_div.appendChild(card_div);

    document.getElementById("owl-carousel").appendChild(item_div);

}

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
        
        for (index = 0; index < games.length; index++) {
            
            //console.log(games[index].home_team_full);
            //console.log(games[index].away_team_full);
            //console.log(games[index].game_time_local);

            var game_time = games[index].game_time_local;
            var day = game_time.split('T')

            console.log(day[1].slice(0,5));

            // Test for duplicates and create game card
            try {
                if (games[index].home_team_full == games[index+1].home_team_full) continue;
                create_owl_carousel_item(day[1].slice(0,5), games[index].away_team_full, games[index].home_team_full);
            }
            catch {
                create_owl_carousel_item(day[1].slice(0,5), games[index].away_team_full, games[index].home_team_full);
            }

            try {
                if (games[index].home_team_full == games[index+1].home_team_full) continue;
                const div_element = document.createElement('div');
                div_element.className = "test";
                div_element.setAttribute("id", "tester");
                div_element.innerHTML = `${games[index].home_team_full} vs. ${games[index].away_team_full} at ${games[index].game_time_local}`;
                document.getElementById("game").appendChild(div_element);
            }
            catch {
                const div_element = document.createElement('div');
                div_element.className = "test";
                div_element.setAttribute("id", "tester");
                div_element.innerHTML = `${games[index].home_team_full} vs. ${games[index].away_team_full} at ${games[index].game_time_local}`;
                document.getElementById("game").appendChild(div_element);;
            }
            
        }

        $('#owl-carousel').owlCarousel({
            loop:false,
            margin:0,
            nav:true,
            rewind: true,
            dots: false,
            responsive:{
                0:{
                    items:1
                },
                450:{
                    items:2
                },
                650:{
                    items:3
                },
                850:{
                    items:4
                },
                1075:{
                    items:5
                },
                1300:{
                    items:6
                },
            }
        })
    });
});