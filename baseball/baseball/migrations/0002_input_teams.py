from django.db import migrations

def team_info(apps, schema_editor):

    # Team Name, MLB_Team_ID, Division, Team Abreviation, Twitter_handles
    teams = [
        ("Baltimore Orioles", "110", "AL East", "BAL", ["Orioles", "masnOrioles"]),
        ("Boston Red Sox", "111", "AL East", "BOS", ["RedSox", "redsoxstats"]),
        ("New York Yankees", "147", "AL East", "NYY", ["Yankees", "BronxPinstripes"]),
        ("Tampa Bay Rays", "139", "AL East", "TB", ["RaysBaseball", "TBTimes_Rays"]),
        ("Toronto Blue Jays", "141", "AL East", "TOR", ["BlueJays", "BlueJayHunter"]),

        ("Chicago White Sox", "145", "AL Central", "CWS", ["whitesox", "NBCSWhiteSox"]),
        ("Cleveland Guardians", "114", "AL Central", "CLE", ["CleGuardians", "GuardiansTalk"]),
        ("Detroit Tigers", "116", "AL Central", "DET", ["tigers", "DetroitTigersPR"]),
        ("Kansas City Royals", "118", "AL Central", "KC", ["Royals", "royalsreview"]),
        ("Minnesota Twins", "142", "AL Central", "MIN", ["Twins", "TwinsFansUK"]),

        ("Houston Astros", "117", "AL West", "HOU", ["astros", "CrawfishBoxes"]),
        ("Los Angeles Angels", "108", "AL West", "LAA", ["Angels", "JeffFletcherOCR"]),
        ("Oakland Athletics", "133", "AL West", "OAK", ["Athletics", "NBCSAthletics"]),
        ("Seattle Mariners", "136", "AL West", "SEA", ["Mariners", "MarinersPR"]),
        ("Texas Rangers", "140", "AL West", "TEX", ["Rangers", "TXRangersPR"]),

        ("Atlanta Braves", "144", "NL East", "ATL", ["Braves", "Braves30YrsAgo"]),
        ("Miami Marlins", "146", "NL East", "MIA", ["Marlins", "fishstripes"]),
        ("New York Mets", "121", "NL East", "NYM", ["Mets", "NYMhistory"]),
        ("Philadelphia Phillies", "143", "NL East", "PHI", ["Phillies", "PhilliesNation"]),
        ("Washington Nationals", "120", "NL East", "WSH", ["Nationals", "NBCSNationals"]),

        ("Chicago Cubs", "112", "NL Central", "CHC", ["Cubs", "CubbiesOnTap"]),
        ("Cincinnati Reds", "113", "NL Central", "CIN", ["Reds", "redreporter"]),
        ("Milwaukee Brewers", "158", "NL Central", "MIL", ["Brewers", "ReviewingTheBrew"]),
        ("Pittsburgh Pirates", "134", "NL Central", "PIT", ["Pirates", "AlexJStumpf"]),
        ("St. Louis Cardinals", "138", "NL Central", "STL", ["Cardinals", "stl_baseball"]),

        ("Arizona Diamondbacks", "109", "NL West", "ARI", ["Dbacks", "nickpiecoro"]),
        ("Colorado Rockies", "115", "NL West", "COL", ["Rockies", "RoxPileFS"]),
        ("Los Angeles Dodgers", "119", "NL West", "LAD", ["Dodgers", "DodgerBlue1958"]),
        ("San Diego Padres", "135", "NL West", "SD", ["Padres", "sdutKevinAcee"]),
        ("San Francisco Giants", "137", "NL West", "SF", ["SFGiants", "NBCSGiants"]),

    ]

    Teams = apps.get_model('baseball', 'Teams')
    TeamTwitter = apps.get_model('baseball', 'TeamTwitter')
    for t in teams:
        team = Teams()
        team.name_display_full = t[0]
        team.MLB_API_ID = t[1]
        team.division = t[2]
        team.name_abbrev = t[3]
        team.save()
        for handle in t[4]:
            teamtwitter = TeamTwitter()
            teamtwitter.team_id = Teams(team.id)
            teamtwitter.handle = handle
            teamtwitter.save()

class Migration(migrations.Migration):

    dependencies = [
        ('baseball', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(team_info),
    ]