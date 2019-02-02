using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballLeagueSite.Models
{
    public class Match
    {
        public string match_id { get; set; }
        public string country_id { get; set; }
        public string country_name { get; set; }
        public string league_id { get; set; }
        public string league_name { get; set; }
        public string match_date { get; set; }
        public string match_status { get; set; }
        public string match_time { get; set; }
        public string match_hometeam_name { get; set; }
        public string match_hometeam_score { get; set; }
        public string match_awayteam_name { get; set; }
        public string match_awayteam_score { get; set; }
        public string match_hometeam_halftime_score { get; set; }
        public string match_awayteam_halftime_score { get; set; }
        public string match_hometeam_extra_score { get; set; }
        public string match_awayteam_extra_score { get; set; }
        public string match_hometeam_penalty_score { get; set; }
        public string match_awayteam_penalty_score { get; set; }
        public string match_hometeam_system { get; set; }
        public string match_awayteam_system { get; set; }
        public string match_live { get; set; }
        public IList<Goalscorer> goalscorer { get; set; }
        public IList<Card> cards { get; set; }
        public Lineup lineup { get; set; }
        public IList<Statistic> statistics { get; set; }
    }

}