using FootballLeagueSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Umbraco.Core;

namespace FootballLeagueSite.Controllers
{
    public class MatchController :  Umbraco.Web.WebApi.UmbracoApiController
    {

    [System.Web.Http.HttpGet]
    public async System.Threading.Tasks.Task<IHttpActionResult> getMatchPageAsync(String id)
    {
        var contentService = ApplicationContext.Current.Services.ContentService;
        var publishDate = DateTime.Now;
            if (contentService.GetChildrenByName(1165, id).Count() == 0)
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("https://apifootball.com/api/?action=get_events&APIkey=3ce69bda6adcb6ada903df6dbac642171c71c1accf5cb7551c7c75865165534a&match_id=" + id);
                HttpResponseMessage response = await client.GetAsync("https://apifootball.com/api/?action=get_events&APIkey=3ce69bda6adcb6ada903df6dbac642171c71c1accf5cb7551c7c75865165534a&match_id=" + id);
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var table = Newtonsoft.Json.JsonConvert.DeserializeObject<Match>(data);
                    var content = contentService.CreateContent(id, 1165, "Match");
                    content.ReleaseDate = publishDate;
                    content.CreateDate = publishDate;
                    content.UpdateDate = publishDate;
                    content.SetValue("pageTitle", id);
                    content.SetValue("matchTextArea", table.ToString());
                    var result = contentService.SaveAndPublishWithStatus(content);
                }
            }
            return Redirect("http://localhost:45371/match-list-page/" + id + "/");
    }
}
}