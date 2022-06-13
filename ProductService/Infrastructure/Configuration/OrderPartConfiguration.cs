using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Infrastructure.Configuration
{
    public class OrderPartConfiguration : IEntityTypeConfiguration<OrderPart>
    {
        public void Configure(EntityTypeBuilder<OrderPart> builder)
        {
            builder.HasKey(x => x.OrderPartId); //Podesavam primarni kljuc tabele
            builder.Property(x => x.OrderPartId).ValueGeneratedOnAdd();

            builder.Property(x => x.OrderId).IsRequired();
            builder.Property(x => x.ProductId).IsRequired();
            builder.Property(x => x.Quantity).IsRequired();

            builder.HasOne(x => x.Order)
                   .WithMany(x => x.OrderParts)
                   .HasForeignKey(x => x.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Product)
                   .WithMany(x => x.OrderParts)
                   .HasForeignKey(x => x.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);




        }
    }
}
