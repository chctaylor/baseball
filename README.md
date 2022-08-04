# Baseball
#### Final Project CS50 Web Programming with Python and JavaScript
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

Finally, a free [MLB Data API](https://appac.github.io/mlb-data-api-docs/#top) was used to get all relevant MLB data from upcoming games, team info, player info, statistics, and transactions. The necessary data from the [MLB Data API](https://appac.github.io/mlb-data-api-docs/#top) was fetched using both python and JavaScript and displayed depending on what data was being fetched. For example, the daily games were fetched via JavaScript to display the games at the top of every page, where as data such as player info were fetched in python and then displayed using template tags in the pages respective HTML file.

Using all three of these APIs to display news articles, recent tweets, games, team info, player info, statistics and more depending on what page is currently being visited is what gives this project a definitive level of distinctiveness and complexity when compared to other projects in CS50 Web Programming with Python and JavaScript.

## What's contained in each file created

### Migrations
  - 0002_input_teams.py
    - This migration contains the code needed to populate the Teams and the TeamTwitter models used for the project. Each team is comprised of the full team name, the [MLB Data API](https://appac.github.io/mlb-data-api-docs/#top) Team ID, the division, and the team name abbreviation. Alongside each team there is a list of two twitter handles, the first being the teams official twitter handle and the second being another twitter handle that posts content specific to that team. When this migration is run it gets both the Teams and TeamTwitter models and populates and saves them into the database with the information given for each team. This migration is dependent on the 0001_initial.py migration that sets up the Teams and TeamTwitter models used in this project. 

### Static Files
  - #### Images
    - Within the images folder of the static files there are two folders, one for logos and the other for stadiums. The logos folder contains the logo for Twitter for use when displaying recent tweets. Within the stadiums file there are photos of all 30 MLB team stadiums, where 28 of them were taken from [Launch Photography](http://www.launchphotography.com/Ballpark_Panoramas.html). The other two stadium photos were taken from sites [ballparksofbaseball](https://www.ballparksofbaseball.com/ballparks/t-mobile-park/) and [gigapan](http://www.gigapan.com/gigapans?order=most_popular&profile_id=CarlosG). All images were used for the educational purpose of creating this project and credits and ownership of the images belong to those who are linked.

  - #### JavaScript

  - #### CSS
    - styles.css file is used to style various elements within the project.

    - owl.carousel.min.css and owl.theme.default.min.css files were downloaded and used in order to make the [owl carousel](https://owlcarousel2.github.io/OwlCarousel2/docs/started-welcome.html) for todays games work properly.

### Templates

### .py Files

  - keys.py
    - This file is ignored via gitignore, however it is where the API keys for the [News API](https://newsapi.org/) and [Twitter API](https://developer.twitter.com/en/docs) are stored and called from views.py.

  - models.py
    - This file contains the models used in this project. It contains the Teams model, TeamTwitter model, FavoriteTeams model, and FavoritePlayers model. The Teams and TeamTwitter models are pre-populated with the appropriate data following the first migration of the project as stated above under the [Migrations](https://github.com/chctaylor/baseball/blob/main/README.md#migrations) section. The FavoritedTeams model and the FavoritePlayers model allows the user to favorite teams and/or players that they can then view news and media for on their own personal profile page.

### Sources.txt
  - This file contains descriptions and links to the various issues that were solved throughout the project in some way by following the advice found via the given links. It also gives image credit for the MLB stadium photos used in this project for the team pages seen via links to the appropriate sites.

### Requirments.txt
  - This file is a breakdown of packages that need to be downloaded in order to run this project.
