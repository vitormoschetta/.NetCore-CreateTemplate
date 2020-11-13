using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Projeto.Models;

namespace Projeto.Services
{
    public class ProductService
    {
        private readonly GetUserAuth _userAuth;
        public ProductService(GetUserAuth userAuth)
        {
            _userAuth = userAuth;
        }

        private string baseUrl = "https://localhost:5001/Product";

        public async Task<ProductResult> Create(Product Product)
        {

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userAuth.GetToken());

                StringContent conteudo = new StringContent(JsonConvert.SerializeObject(Product), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync($"{baseUrl}/Create", conteudo))
                {
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        return new ProductResult()
                        {
                            Success = false,
                            Message = "Acesso Negado. ",
                            Notifications = new List<Notification>()
                            {
                                new Notification(){Property = string.Empty, Message = "Usuário sem permissão. "}
                            }
                        };
                    }

                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<ProductResult>(apiResponse);
                    return result;
                }

            }
        }


        public async Task<ProductResult> Update(Guid id, Product Product)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userAuth.GetToken());

                StringContent conteudo = new StringContent(JsonConvert.SerializeObject(Product), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PutAsync($"{baseUrl}/Update/{id}", conteudo))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();

                    var result = JsonConvert.DeserializeObject<ProductResult>(apiResponse);
                    return result;
                }
            }
        }


        public async Task<ProductResult> Delete(Guid id)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userAuth.GetToken());

                using (var response = await httpClient.DeleteAsync($"{baseUrl}/Delete/{id}"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();

                    var result = JsonConvert.DeserializeObject<ProductResult>(apiResponse);
                    return result;
                }
            }
        }
        public async Task<IList<Product>> GetAll()
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userAuth.GetToken());

                using (var response = await httpClient.GetAsync($"{baseUrl}/GetAll"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var Products = JsonConvert.DeserializeObject<List<Product>>(apiResponse);
                    return Products;
                }
            }
        }

        public async Task<Product> GetById(Guid id)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userAuth.GetToken());

                using (var response = await httpClient.GetAsync($"{baseUrl}/GetById/{id}"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var Product = JsonConvert.DeserializeObject<Product>(apiResponse);
                    return Product;
                }
            }
        }


        public async Task<IList<Product>> Search(string param)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userAuth.GetToken());

                param = (param == string.Empty || param == null) ? "empty" : param;
                using (var response = await httpClient.GetAsync($"{baseUrl}/Search/{param}"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var Products = JsonConvert.DeserializeObject<List<Product>>(apiResponse);
                    return Products;
                }
            }
        }
    }
}