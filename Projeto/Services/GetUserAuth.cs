
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Projeto.Services
{
    public class GetUserAuth
    {
        private readonly IHttpContextAccessor _http;
        public GetUserAuth(IHttpContextAccessor http)
        {
            _http = http;
        }

        public string GetToken()
        {
            return _http.HttpContext.User.Claims
                .Where(c => c.Type == "Token")
                .Select(c => c.Value).SingleOrDefault();
        }

        public string GetRole()
        {
            return _http.HttpContext.User.Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).SingleOrDefault();
        }
    }
}