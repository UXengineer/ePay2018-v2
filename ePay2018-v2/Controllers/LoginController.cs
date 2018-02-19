using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ePay2018_v2.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        //UNKNOWN DEVICE LOGIC FLOW
        [ActionName("Unknown-Device")]
        public ActionResult UnknownDevice()
        {
            ViewBag.Message = "UnknownDevice";

            return View("UnknownDevice");
        }

        [ActionName("Enter-Token")]
        public ActionResult EnterToken()
        {
            ViewBag.Message = "EnterToken";

            return View("EnterToken");
        }

        [ActionName("Token-Error")]
        public ActionResult TokenError()
        {
            ViewBag.Message = "TokenError";

            return View("TokenError");
        }

        //KNOW DEVICE LOGIC FLOW
        public ActionResult Password()
        {
            return View();
        }

        [ActionName("Fogot-Password")]
        public ActionResult FogotPassword()
        {
            ViewBag.Message = "FogotPassword";

            return View("FogotPassword");
        }

        [ActionName("New-Password")]
        public ActionResult NewPassword()
        {
            ViewBag.Message = "NewPassword";

            return View("NewPassword");
        }
    }
}