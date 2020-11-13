using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Projeto.Models;
using Projeto.Services;
using Projeto.Utils;

namespace Projeto.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserService _service;
        public HomeController(UserService service)
        {
            _service = service;
        }

        public IActionResult Index() => View();

        public IActionResult Register() => View();

        [HttpPost]
        public async Task<IActionResult> Register(UserRegister model)
        {
            if (!ModelState.IsValid) return View(model);

            UserResult result = await _service.Register(model);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(model);
            }

            User user = result.Object;
            TempDataUtil.Put(TempData, "user", model);
            return RedirectToAction("ConfirmedRegister", new { message = result.Message });
        }

        public IActionResult ConfirmedRegister() => View();


        public IActionResult Login() => View();

        [HttpPost]
        public async Task<IActionResult> Login(User model)
        {
            if (!ModelState.IsValid) return View(model);

            UserResult result = await _service.Login(model);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(model);
            }

            RegistrarCookies(result);

            return RedirectToAction("Index", "HomeInternal");
        }
        
        public async void RegistrarCookies(UserResult result)
        {
            //cria coockie
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, result.Object.Username),
                new Claim(ClaimTypes.Role, result.Object.Role),
                new Claim("Token", result.Token)
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Usuario");
            var claimsPrincipal = new ClaimsPrincipal(new[] { claimsIdentity });

            await HttpContext.SignInAsync(claimsPrincipal); // <-- efetua o login cookie
        }



        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }


        public IActionResult AccessDenied()
        {
            return View();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
