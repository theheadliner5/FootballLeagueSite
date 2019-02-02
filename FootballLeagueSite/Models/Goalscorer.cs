using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballLeagueSite.Models
{
    public class Goalscorer
    {
        public string time { get; set; }
        public string home_scorer { get; set; }
        public string score { get; set; }
        public string away_scorer { get; set; }
    }
}