using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Services;
using Projeto.Utils;

namespace Projeto.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly UserService _service;
        public AdminController(UserService service)
        {
            _service = service;
        }

        public async Task<IActionResult> LiberarAcesso(int? pageNumber)
        {
            var lista = await _service.GetInactivesFirstAccess();

            var itensPorPagina = 5;
            PaginatedList<User> listaPaginada = PaginatedList<User>.Create(lista, pageNumber ?? 1, itensPorPagina);

            return View(listaPaginada);
        }

        public async Task<IActionResult> LiberarAcessoConfirmar(Guid id)
        {
            UserResult result = await _service.ActivateFirstAccess(id);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                // ver alguma forma de transferir possiveis erros para a action 'LiberarAcesso()'
            }

            return RedirectToAction("LiberarAcesso");
        }

        public async Task<IActionResult> ExcluirPedidoAcesso(Guid id)
        {
            UserResult result = result = await _service.Delete(id);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                // ver alguma forma de transferir possiveis erros para a action 'LiberarAcesso()'
            }

            return RedirectToAction("LiberarAcesso");
        }


        public async Task<IActionResult> ListaUsuarios(int? pageNumber)
        {
            var lista = await _service.GetAll();

            var itensPorPagina = 5;
            PaginatedList<User> listaPaginada = PaginatedList<User>.Create(lista, pageNumber ?? 1, itensPorPagina);

            return View(listaPaginada);
        }

        public async Task<IActionResult> EditarAcessoUsuario(Guid id)
        {
            var user = await _service.GetById(id);
            return View(user);
        }

        [HttpPost]
        public async Task<IActionResult> EditarAcessoUsuario(User model)
        {
            UserResult result = await _service.UpdateRoleActive(model);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(model);
            }

            return RedirectToAction("ListaUsuarios");
        }


        public IActionResult AdicionarUsuario() => View();

        [HttpPost]
        public async Task<IActionResult> AdicionarUsuario(UserRegister model)
        {
            if (!ModelState.IsValid) return View(model);

            UserResult result = await _service.RegisterAdmin(model);
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


        public async Task<IActionResult> PaginationUser(int? pageNumber)
        {
            if (pageNumber == null) pageNumber = 1;
            var lista = await _service.GetAll();
            var itensPorPagina = 5;
            PaginatedList<User> listaPaginada = PaginatedList<User>.Create(lista, pageNumber ?? 1, itensPorPagina);
            return PartialView("_TabelaUsuarios", listaPaginada);
        }


        public async Task<IActionResult> SearchUser(int? pageNumber, string param)
        {
            if (param == null) param = "";
            var lista = await _service.Search(param);
            var itensPorPagina = 5;
            PaginatedList<User> listaPaginada = PaginatedList<User>.Create(lista, pageNumber ?? 1, itensPorPagina);
            return PartialView("_TabelaUsuarios", listaPaginada);
        }
    }
}