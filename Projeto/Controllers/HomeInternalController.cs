using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Services;
using Projeto.Utils;

namespace Projeto.Controllers
{
    [Authorize]
    public class HomeInternalController : Controller
    {
        private readonly UserService _service;
        public HomeInternalController(UserService service)
        {
            _service = service;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> AlterarSenha()
        {
            var user = await _service.GetByName(User.Identity.Name);
            var userUpdatePassword = new UserUpdatePassword();
            userUpdatePassword.Id = user.Id;
            userUpdatePassword.Username = user.Username;

            return View(userUpdatePassword);
        }

        [HttpPost]
        public async Task<IActionResult> AlterarSenha(UserUpdatePassword user)
        {
            if (!ModelState.IsValid) return View(user);

            UserResult result = await _service.UpdatePassword(user);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(user);
            }

            return View("Mensagem");
        }
    }
}