using AutoMapper;
using ProductService.DTO;
using ProductService.Infrastructure;
using ProductService.Interfaces;
using ProductService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly ProductsDbContext _dbContext;

        public ProductService(IMapper mapper, ProductsDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public bool AddEntity(ProductDto entity)
        {
            try
            {
                Product product = _mapper.Map<Product>(entity);
                _dbContext.Products.Add(product);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }
        public long GetWithId(ProductDto product)
        {
            var tmp = _dbContext.Products.Where(s => s.Name == product.Name).Where(s=>s.Ingredients==product.Ingredients);
            return _mapper.Map<ProductDto>(tmp.ToList()[0]).ProductId;

        }
        public ProductDto FindById(long id)
        {
            return _mapper.Map<ProductDto>(_dbContext.Products.Find(id));
        }

        public List<ProductDto> GetAll()
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
        }

        public bool ModifyEntity(ProductDto entity, long id)
        {
            Product product = _dbContext.Products.Find(id);
            if (product == null)
                return false;
            product.Ingredients = entity.Ingredients;
            product.Name = entity.Name;
            product.Price = entity.Price; 
            _dbContext.SaveChanges();
            return true;
        }

        public bool RemoveEntity(long id)
        {
            Product product = _dbContext.Products.Find(id);
            if (product == null)
                return false;
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
