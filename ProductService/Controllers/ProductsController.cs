using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductService.Interfaces;
using ProductService.DTO;
using Microsoft.AspNetCore.Authorization;

namespace ProductService.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService productService;
        public ProductsController(IProductService productService)
        {
            this.productService = productService;
        }

        // GET: api/<ProductController>
        [HttpGet]
        [Authorize(Policy = "ImaToken")]
        public ActionResult Get()
        {
            try
            {
                return Ok(productService.GetAll());
            }
            catch  
            {
                return BadRequest();
            }
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        [Authorize(Policy = "ImaToken")]
        public ActionResult Get(int id)
        {
            try
            {
                return Ok(productService.FindById(id));
            }
            catch 
            {
                return BadRequest();
            }
        }
        // POST api/<ProductController>
        [HttpPost] 
        [Authorize(Roles = "Admin")]
        public ActionResult Post([FromBody] ProductDto product)
        {
            if (productService.AddEntity(product))
                return Ok(true);


            return BadRequest(false);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult Put(int id, [FromBody] ProductDto product)
        {
            if (productService.ModifyEntity(product, id))
                return Ok();
            return BadRequest();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int id)
        {
            if (productService.RemoveEntity(id))
                return Ok(); 
            return BadRequest();

        }
    }
}
