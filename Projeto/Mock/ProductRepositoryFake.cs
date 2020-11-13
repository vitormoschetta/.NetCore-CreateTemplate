using System;
using System.Collections.Generic;
using System.Linq;
using Projeto.Models;

namespace Projeto.Mock
{
    public class ProductRepositoryFake
    {
        private readonly List<Product> List;
        private Product Product;

        public ProductRepositoryFake()
        {
            List = new List<Product>();

            for (int i = 0; i < 10; i++)
            {
                Product = new Product();
                Product.Id = Guid.NewGuid();
                Product.Name = "Product " + i.ToString();
                Product.Price = i * 2;

                List.Add(Product);
            }

            Product = new Product();
            Product.Id = new Guid("C56A4180-65AA-42EC-A945-5FD21DEC0537");
            Product.Name = "Product Teste";
            Product.Price = 599;

            List.Add(Product);
        }

        public bool Exists(string name)
        {
            var item = List.FirstOrDefault(x => x.Name == name);
            if (item != null)
                return true;

            return false;
        }

        public void Create(Product model)
        {
            List.Add(model);
        }


        public void Delete(Guid id)
        {
            var item = List.FirstOrDefault(x => x.Id == id);
            if (item != null)
                List.Remove(item);
        }


        public List<Product> GetAll()
        {
            return List;
        }

        public Product GetById(Guid id)
        {
            return List.FirstOrDefault(x => x.Id == id);
        }

        public void Update(Product model)
        {
            var item = List.FirstOrDefault(x => x.Id == model.Id);
            if (item != null)
            {
                List.Remove(item);
                List.Add(model);
            }

        }

        public List<Product> Search(string parametro)
        {
            var lista = List.Where(x => x.Name.Contains(parametro) || x.Price.ToString().Contains(parametro)).ToList();
            return lista;
        }
    }
}