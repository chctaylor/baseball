// Create elements for todays games in Owl Carousel
function create_owl_carousel_item(date, away_team_full, home_team_full) {
    const item_div = document.createElement('div');
    const card_div = document.createElement('div');
    const list_group_ul = document.createElement('ul');
    const date_li = document.createElement('li');
    const away_team_full_li = document.createElement('a');
    const home_team_full_li = document.createElement('a');

    item_div.className = "item";
    card_div.className = "card";
    card_div.style.width = "14rem";
    list_group_ul.className = "list-group list-group-flush";
    date_li.className = "list-group-item";
    away_team_full_li.className = "list-group-item";
    home_team_full_li.className = "list-group-item";

    list_group_ul.appendChild(date_li);
    list_group_ul.appendChild(away_team_full_li);
    list_group_ul.appendChild(home_team_full_li);

    away_team_full_li.href = `/team/${away_team_full.replaceAll(" ", "_")}`
    home_team_full_li.href = `/team/${home_team_full.replaceAll(" ", "_")}`

    date_li.innerHTML = `Today: ${date} Local`;
    away_team_full_li.innerHTML = `A: ${away_team_full}`;
    home_team_full_li.innerHTML = `H: ${home_team_full}`;

    card_div.appendChild(list_group_ul);

    item_div.appendChild(card_div);

    document.getElementById("owl-carousel").appendChild(item_div);

}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve todays date and games data
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + mm + dd;

    fetch(`http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&home_away='H'&start_date='${today}'&end_date='${today}'&season='${yyyy}'`)
    .then(response => response.json())
    .then(data => {

        // Retrieve all games playing today
        const games = data.mlb_broadcast_info.queryResults.row
        // Check to see if no games are playing
        if (data.mlb_broadcast_info.queryResults.totalSize != 0) {
            for (index = 0; index < games.length; index++) {
                
                // Format time from data 
                var game_time = games[index].game_time_local;
                var day = game_time.split('T')

                // Test for duplicates and create game card * IF GAME NOT NEXT EACHOTHER DOES NOT CATCH
                try {
                    if (games[index].home_team_full == games[index+1].home_team_full) continue;
                    create_owl_carousel_item(day[1].slice(0,5), games[index].away_team_full, games[index].home_team_full);
                }
                catch {
                    create_owl_carousel_item(day[1].slice(0,5), games[index].away_team_full, games[index].home_team_full);
                }
            }
        }

        // Owl Carousel parameters
        $('#owl-carousel').owlCarousel({
            loop:false,
            margin:0,
            nav:true,
            rewind: true,
            dots: false,
            mouseDrag: false,
            stagePadding: 10,
            responsive:{
                0:{
                    items:1
                },
                450:{
                    items:2
                },
                675:{
                    items:3
                },
                900:{
                    items:4
                },
                1125:{
                    items:5
                },
                1350:{
                    items:6
                },
            }
        })
    });
    
});