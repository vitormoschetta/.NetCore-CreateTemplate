using System;
using System.Collections.Generic;
using System.Linq;

namespace Projeto.Utils
{
    // Recebe um tipo QUALQUER de objeto e retorna com paginação
    public class PaginatedList<T> : List<T>
    {
        public int PageIndex { get; private set; }
        public int TotalPages { get; private set; }

        // Metodo Construtor
        // items => lista de um tipo modificada de acordo com parametros de paginação recebidos no método 'CreateAsync'
        // count => quantidade de itens na lista
        public PaginatedList(List<T> items, int count, int pageIndex, int pagSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pagSize); // Ceiling => arredonda pra baixo            
            this.AddRange(items);
        }

        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (PageIndex < TotalPages);
            }
        }


        // Esse método estatico é invocado, recebendo parametros e retornando a classe a qual pertence.
        // source => lista de um tipo qualquer de objeto
        // pageIndex => página dentro da paginação em que se deseja ser redirecionado
        // pageSize => quantidade de itens em cada página
        public static PaginatedList<T> Create(IEnumerable<T> source, int pageIndex, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            // Retorna a classe a qual pertence passando parâmetros ao Metodo Construtor            
            return new PaginatedList<T>(items, count, pageIndex, pageSize);
        }
    }
}