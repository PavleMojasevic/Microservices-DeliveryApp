using Microsoft.EntityFrameworkCore.Migrations;

namespace ProductService.Migrations
{
    public partial class orderupdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveredBy",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveredBy",
                table: "Orders");
        }
    }
}
