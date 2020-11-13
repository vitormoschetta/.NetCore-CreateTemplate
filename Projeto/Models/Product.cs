using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Projeto.Models
{
    public class Product
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public decimal? Price { get; set; }
    }

    public class ProductResult : DataResult
    {
        public Product Object { get; set; }
    }
}