using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 

namespace ProductService.Models
{
    public enum State { NOTDELEVERED,DELIVERED, CANCELED}
    public class Order
    {
        public long OrderId { get; set; }

        public long UserId{ get; set; } 
        public List<OrderPart> OrderParts { get; set; }
        public State State { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public DateTime DateTimeOfDelivery { get; set; }
        public long DeliveredBy{ get; set; }
    }
}
