using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductService.DTO;
using ProductService.Infrastructure;
using ProductService.Interfaces;
using ProductService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProductService.Services
{
    public class OrderService: IOrderService 
    {
        private readonly IMapper _mapper;
        private readonly ProductsDbContext _dbContext;
        private static readonly Object thisLock = new Object();

        public OrderService(IMapper mapper, ProductsDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }    
        public void AddEntity(OrderDto entity)
        {
            try
            {
                
                Order order = _mapper.Map<Order >(entity);
                order.State = State.NOTDELEVERED;
                order.DeliveredBy = 0;
                order.DateTimeOfDelivery = DateTime.Now;
                _dbContext.Orders.Add(order);
                _dbContext.SaveChanges(); 


                 

            }
            catch  
            { 
                return;
            }

        }

        public OrderDto FindById(long id)
        {
            return _mapper.Map<OrderDto>(_dbContext.Orders.Find(id));
        }

        public List<OrderDto> GetAll()
        {
            var ret= _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(x=>x.OrderParts).ThenInclude(c=>c.Product).ToList());
            foreach (OrderDto item in ret)
            {
                if (item.DeliveredBy != 0 && item.DateTimeOfDelivery > DateTime.Now)
                {
                    item.State = "DELIVERING";
                }
            }
            return ret;
        }

        public List<OrderDto> GetUndelivered()
        {
            var ret = _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(x => x.OrderParts).ThenInclude(c => c.Product).Where(c=>c.State==State.NOTDELEVERED).ToList());
            foreach (OrderDto item in ret)
            {
                if (item.DeliveredBy != 0 && item.DateTimeOfDelivery > DateTime.Now)
                {
                    item.State = "DELIVERING";
                }
            }
            return ret;
        }

        public List<OrderDto> GetUsersOrders(long userid)
        {
            var ret= _mapper.Map<List<OrderDto>>(_dbContext.Orders.Where(x => x.UserId == userid).Include(x => x.OrderParts).ToList());
            foreach (OrderDto item in ret)
            {
                if (item.DeliveredBy != 0 && item.DateTimeOfDelivery > DateTime.Now)
                {
                    item.State = "DELIVERING";
                }
            }
            return ret;
        }
        Random random = new Random();
        public bool TakeOrder(long orderid, long userId)
        {
            lock (thisLock)
            {
                List<Order> orders = (List<Order>)_dbContext.Orders.Where(x => x.DateTimeOfDelivery > DateTime.Now).Where(x => x.DeliveredBy == userId).ToList();
                List<Order> orders2 = (List<Order>)_dbContext.Orders.Where(x => x.OrderId ==orderid).Where(x => x.State == State.DELIVERED).ToList();
                if (orders.Count == 0 && orders2.Count==0)
                {
                    Order order = _dbContext.Orders.Find(orderid);
                    order.State = State.DELIVERED;
                    order.DeliveredBy = userId;
                    order.DateTimeOfDelivery = DateTime.Now.AddMinutes(random.Next(5, 30));
                    _dbContext.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public List<OrderDto> History(long userid)
        {
            var ret= _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(x => x.OrderParts).ThenInclude(c => c.Product).Where(x => x.UserId ==userid).Where(x => x.DeliveredBy!= 0).ToList());
            foreach (OrderDto item in ret)
            {
                if (item.DeliveredBy != 0 && item.DateTimeOfDelivery > DateTime.Now)
                {
                    item.State = "DELIVERING";
                }
            }
            return ret;
        }

        public List<OrderDto> HistoryDeliverer(long userid)
        {
            var ret = _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(x => x.OrderParts).ThenInclude(c => c.Product).Where(x => x.DeliveredBy == userid).Where(x => x.DeliveredBy != 0).ToList());
            foreach (OrderDto item in ret)
            {
                if(item.DeliveredBy!=0 && item.DateTimeOfDelivery>DateTime.Now)
                {
                    item.State = "DELIVERING";
                }
            }
            return ret;
        }
        public OrderDto GetCurrentOrder(long userid)
        {
            var order = _dbContext.Orders.Where(x => x.UserId == userid || x.DeliveredBy == userid).Where(x=>x.DateTimeOfDelivery>DateTime.Now).Include(x => x.OrderParts).ThenInclude(c => c.Product).ToList();
            if (order.Count == 0)
                return null;
            return _mapper.Map<OrderDto>(order[0]);
        }
    }
}
