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

function hide_favortie_team_info() {
    document.querySelector('#favorite-team-articles').style.display = 'none';
    document.querySelector('#favorite-team-tweets').style.display = 'none';
    document.querySelector('#favorite-team-show-hide').innerHTML = 'Show Favorite Team Info';
}

function show_favortie_team_info() {
    document.querySelector('#favorite-team-articles').style.display = 'block';
    document.querySelector('#favorite-team-tweets').style.display = 'block';
    document.querySelector('#favorite-team-show-hide').innerHTML = 'Hide Favorite Team Info';
}

document.addEventListener('DOMContentLoaded', function() {
    
    reformate_twitter_created_date();

    reformate_article_published_date();
});

// Listen for clicks on team names
document.addEventListener('click', event => {

    // Find what was clicked on
    const element = event.target;

    // If team name is clicked on in player bio take them to team page
    if (element.id === 'favorite-team-show-hide') {
        console.log(element.innerHTML)
        if (element.innerHTML == 'Hide Favorite Team Info') {
            hide_favortie_team_info();
        }
        else if (element.innerHTML == 'Show Favorite Team Info') {
            show_favortie_team_info();
        }

    }
});