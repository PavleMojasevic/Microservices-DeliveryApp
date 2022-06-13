using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Models
{
    
    public class Product
    {
        public long ProductId { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public double Price { get; set; } 
        public List<OrderPart> OrderParts { get; set; }
    }
}
