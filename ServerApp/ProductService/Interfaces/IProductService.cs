using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductService.DTO;
using ProductService.Models;

namespace ProductService.Interfaces
{
    public interface IProductService 
    {
        List<ProductDto> GetAll();
        ProductDto FindById(long id); 
        bool AddEntity(ProductDto entity);
        bool RemoveEntity(long id);
        bool ModifyEntity(ProductDto entity, long id);
        long GetWithId(ProductDto product);

    }
}
