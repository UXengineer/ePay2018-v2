using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ePay2018_v2.Areas.Distributor.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Distributor/Dashboard
        public ActionResult Index()
        {
            return View();
        }
    }
}