using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Infrastructure.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.OrderId); //Podesavam primarni kljuc tabele
            builder.Property(x => x.OrderId).ValueGeneratedOnAdd();

            builder.Property(x => x.UserId).IsRequired(); 

            builder.HasMany(x => x.OrderParts)
                   .WithOne(x => x.Order);

            


        }
    }
}
