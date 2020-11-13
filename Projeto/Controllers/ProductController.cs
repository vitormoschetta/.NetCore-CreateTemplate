using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Projeto.Mock;
using Projeto.Utils;
using Projeto.Models;
using Projeto.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading;
using System.Linq;

namespace Projeto.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly ProductService _service;
        public ProductController(ProductService service)
        {
            _service = service;
        }

        public async Task<IActionResult> Index(int? pageNumber)
        {
            if (pageNumber == null) pageNumber = 1;

            var lista = await _service.GetAll();

            var itensPorPagina = 5;
            PaginatedList<Product> listaPaginada = PaginatedList<Product>.Create(lista, pageNumber ?? 1, itensPorPagina);

            return View(listaPaginada);
        }


        public IActionResult Create() => View();

        [HttpPost]
        public async Task<IActionResult> Create(Product model)
        {
            if (!ModelState.IsValid) return View(model);

            ProductResult result = await _service.Create(model);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(model);
            }

            model = result.Object;
            TempDataUtil.Put(TempData, "product", model);
            return RedirectToAction("Details", new { message = result.Message });
        }


        public async Task<IActionResult> Edit(Guid id)
        {
            var model = await _service.GetById(id);
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Product model)
        {
            if (!ModelState.IsValid) return View(model);

            ProductResult result = await _service.Update(model.Id, model);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(model);
            }

            model = result.Object;
            TempDataUtil.Put(TempData, "product", model);
            return RedirectToAction("Details", new { message = result.Message });
        }



        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var model = await _service.GetById(id);
            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Product model)
        {
            if (!ModelState.IsValid) return View(model);

            ProductResult result = await _service.Delete(model.Id);
            if (result.Success == false)
            {
                var notifications = Agrupar.GroupNotifications(result);
                ModelState.AddModelError(string.Empty, notifications);
                return View(model);
            }

            return RedirectToAction("Index");
        }


        public IActionResult Details(string message)
        {
            ViewBag.Message = message;
            var model = TempData.Get<Product>("product");
            return View(model);
        }


        public async Task<IActionResult> Pagination(int? pageNumber)
        {
            if (pageNumber == null) pageNumber = 1;
            var lista = await _service.GetAll();
            var itensPorPagina = 5;
            PaginatedList<Product> listaPaginada = PaginatedList<Product>.Create(lista, pageNumber ?? 1, itensPorPagina);
            return PartialView("_TabelaIndex", listaPaginada);
        }


        public async Task<IActionResult> Search(int? pageNumber, string param)
        {
            if (param == null) param = "";
            var lista = await _service.Search(param);
            var itensPorPagina = 5;
            PaginatedList<Product> listaPaginada = PaginatedList<Product>.Create(lista, pageNumber ?? 1, itensPorPagina);
            return PartialView("_TabelaIndex", listaPaginada);
        }

    }
}