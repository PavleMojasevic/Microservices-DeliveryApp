using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersService.Models
{
    
    public enum StatusDobavljaca { VERIFIKOVAN, NEVERIFIKOVAN, ODBIJEN};
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public bool Activated { get; set; }
        public bool IsGoogle { get; set; }
        public string PhotoUrl { get; set; }
        public StatusDobavljaca Status { get; set; }
    }
}
