using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Projeto.ViewComponents
{
    public class MenuViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(string perfil)
        {
            switch (perfil)
            {
                case "Admin":
                    return View("_MenuAdmin");
                case "User":
                    return View("_MenuUsuario");
                default:
                    return View("_MenuUsuario");
            }
        }
    }
}