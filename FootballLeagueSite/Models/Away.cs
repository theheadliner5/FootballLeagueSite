using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballLeagueSite.Models
{
    public class Away
    {
        public IList<object> starting_lineups { get; set; }
        public IList<object> substitutes { get; set; }
        public IList<object> coach { get; set; }
        public IList<object> substitutions { get; set; }
    }
}