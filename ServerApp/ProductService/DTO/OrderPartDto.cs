using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.DTO
{
    public class OrderPartDto
    { 

        public ProductDto Product { get; set; }
        public long ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
