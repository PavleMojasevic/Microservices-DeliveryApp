using ProductService.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Interfaces
{
    public interface IOrderService
    {
        List<OrderDto> GetAll();
        OrderDto FindById(long id);
        void AddEntity(OrderDto entity);
        List<OrderDto> GetUsersOrders(long userid);
        List<OrderDto> GetUndelivered();
        bool TakeOrder(long orderid, long userId);
        List<OrderDto> History(long userid);
        List<OrderDto> HistoryDeliverer(long userid);
        OrderDto GetCurrentOrder(long userid);
    }
}
