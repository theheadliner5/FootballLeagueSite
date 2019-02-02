using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballLeagueSite.Models
{
    public class Lineup
    {
        public Home home { get; set; }
        public Away away { get; set; }
    }
}