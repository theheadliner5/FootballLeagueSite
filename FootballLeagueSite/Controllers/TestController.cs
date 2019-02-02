using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Web;
using Umbraco.Core;
using System.Web.Http;
using System.Web.Mvc;

namespace FootballLeagueSite.Controllers
{
    public class TestController : Umbraco.Web.WebApi.UmbracoApiController
    {
        [System.Web.Http.HttpGet]
        public IHttpActionResult testAction()
        {
            var contentService = ApplicationContext.Current.Services.ContentService;
            var publishDate = DateTime.Now;

            var content = contentService.CreateContent("Leeds-Unites", 1164, "Team");
            content.ReleaseDate = publishDate;
            content.CreateDate = publishDate;
            content.UpdateDate = publishDate;
            content.SetValue("pageTitle", "lol2");
            var result = contentService.SaveAndPublishWithStatus(content);

            return Redirect("http://www.google.com");
        }
    }
}