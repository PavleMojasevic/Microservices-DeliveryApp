using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductService.DTO;
using ProductService.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProductService.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IProductService productService;
        public OrderController(IProductService productService, IOrderService orderService)
        {
            this.orderService = orderService;
            this.productService = productService;
        }

        // GET: api/<ProductController>
        [HttpGet]

        [Authorize(Roles = "Admin")]
        public ActionResult Get()
        {
            //User tu je sve iz tokena, vazi samo u controlleru
            try
            {
                return Ok(orderService.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
         
       
        // POST api/<ProductController>
        [HttpPost]
        [Authorize]
        public ActionResult Post([FromBody] OrderDto order)
        {
            foreach (var item in order.OrderParts)
            {
                item.ProductId = productService.GetWithId(item.Product);
                item.Product = null;
            }
            orderService.AddEntity(order);
            return Ok(true);
        }
        
        [HttpGet("Undelivered")]
        [Authorize(Roles = "Dostavljac")]
        public ActionResult Undelivered()
        {
            var result = orderService.GetUndelivered();
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpPost("TakeOrder")]
        [Authorize(Roles = "Dostavljac")]
        public ActionResult TakeOrder([FromBody] long orderid)
        {
            List<Claim> claims = User.Claims.ToList();
            foreach (var item in claims)
            {
                if (item.Type.ToLower() == "id")
                    return Ok(orderService.TakeOrder(orderid, Convert.ToInt64(item.Value)));
            }
            return BadRequest();


        }
        [HttpGet("history")]
        [Authorize(Roles = "Korisnik")]
        public ActionResult History()
        {
            List<Claim> claims = User.Claims.ToList();
            foreach (var item in claims)
            {
                if (item.Type.ToLower() == "id")
                    return Ok(orderService.History(Convert.ToInt64(item.Value)));
            }
            return BadRequest(); 

        }
        [HttpGet("historyDeliverer")]
        [Authorize(Roles = "Dostavljac")]
        public ActionResult HistoryDeliverer()
        {
            List<Claim> claims = User.Claims.ToList();
            foreach (var item in claims)
            {
                if (item.Type.ToLower() == "id")
                    return Ok(orderService.HistoryDeliverer(Convert.ToInt64(item.Value)));
            }
            return BadRequest(); 

        }
        [HttpGet("currentOrder")]
        [Authorize]
        public ActionResult GetCurrentOrder()
        {
            List<Claim> claims = User.Claims.ToList();
            foreach (var item in claims)
            {
                if (item.Type.ToLower() == "id")
                    return Ok(orderService.GetCurrentOrder(Convert.ToInt64(item.Value)));
            }
            return BadRequest();
        }

    }
}
