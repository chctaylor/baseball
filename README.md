# Baseball
#### Final Project CS50 Web Programming with Python and Javascript
#### Video Demo: 

## How to run this application
  1. Create a virtual env
  2. `pip install -r requirements.txt`
  3. `python manage.py migrate`
  4. `python manage.py runserver`

## Distinctiveness and Complexity
This project is distinctive in the fact that it is a Major League Baseball news and media site, where as other projects in this course have touched on google search queries, wikipedia postings, fetching and composing emails, eBay auctions, and social media posts. This applications main focus is getting news and media pertaining to the MLB from various sources and put that info in one convenient location.

The bulk of the projects complexity comes from the use of three separate APIs. 

First, in order to get the desired MLB news articles, the free version of [News API](https://newsapi.org/) was used. By using this API, news articles from sources such as ESPN, NBC Sports, Fox Sports, and CBS Sports pertaining specifically to the MLB were fetched using python and then displayed on the site. Using various parameters the application will display news articles dependent on which page you are on. Being on the main page displays all MLB articles from the aforementioned sources, where as if you are on a team page or a players page, the articles that are displayed will be team or player specific.

Second, the [Twitter API](https://developer.twitter.com/en/docs) was used to fetch recent tweets from various users dependent on which page of the application is being visited. If on the home page, a set of MLB specific handles are fetched using python and displayed on the site with a replica of the Twitter card. As with the news articles, if a team page or player page is visited, the Twitter posts that are fetched are either team specific, based on the teams specific Twitter handle and a second Twitter handle that covers the team, or player specific, using the players own Twitter handle, if one exists, to display the most recent tweets.

Finally, a free [MLB Data API](https://appac.github.io/mlb-data-api-docs/#top) was used to get all relevant MLB data from upcoming games, team info, player info, statistics, and transactions. The necessary data from the [MLB Data API](https://appac.github.io/mlb-data-api-docs/#top) was fetched using both python and javascript and displayed depending on what data was being fetched. For example, the daily games were fetched via javascript to display the games at the top of every page, where as data such as player info were fetched in python and then displayed using template tags in the pages respective HTML file.

Using all three of these APIs to display news articles, recent tweets, games, team info, player info, statistics and more depending on what page is currently being visited is what gives this project a definitive level of distinctiveness and complexity when compared to other projects in CS50 Web Programming with Python and Javascript.

## What's contained in each file created

### Migrations

### Static Files

### Templates

### .py Files

### Sources.txt

### Requirments.txt
