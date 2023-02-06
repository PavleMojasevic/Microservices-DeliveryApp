using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UsersService.DTO;
using UsersService.Infrastructure;
using UsersService.Interfaces;
using UsersService.Models;

namespace UsersService.Services
{
    public class UserService : IUserService
    {

        private readonly IMapper _mapper;
        private readonly UsersDbContext _dbContext;
        private readonly IConfigurationSection _secretKey;
        private readonly IConfigurationSection _tokenAddress;
        private const string _pepper = "aasf3rko3W";
        string Encode(string raw)
        {
            using (var sha = SHA256.Create())
            {
                var computedHash = sha.ComputeHash(
                Encoding.Unicode.GetBytes(raw + _pepper));
                return Convert.ToBase64String(computedHash);
            }
        }
        public UserService(IMapper mapper, UsersDbContext dbContext, IConfiguration config)
        {
            _mapper = mapper;
            _dbContext = dbContext; 
            _secretKey = config.GetSection("SecretKey");
            _tokenAddress = config.GetSection("tokenAddress");

        }

        public bool AddUser(UserDto userdb)
        {
            try
            {
                var users = _dbContext.Users.Where(s => s.Email == userdb.Email || s.Username == userdb.Username).ToList();
                if (users.Count != 0)
                    return false; 
                userdb.Password = Encode(userdb.Password);
                if (userdb.Type.ToLower() != "korisnik")
                {
                    userdb.Activated = false;
                    userdb.Status = StatusDobavljaca.NEVERIFIKOVAN;
                }
                else
                    userdb.Activated = true;
                User user = _mapper.Map<User>(userdb);
                user.IsGoogle=false;
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {

                return false;
            }

            return true;
        }

        public UserDto FindById(long id)
        {
            return _mapper.Map<UserDto>(_dbContext.Users.Find(id));
        }

        public UserDto FindByUsername(string username)
        {
            return _mapper.Map<UserDto>(_dbContext.Users.Where(s => s.Username == username).ToList()[0]);
        }

        public List<UserDto> GetUsers()
        {
            List<UserDto> users =_mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
            foreach (var item in users)
            {
                item.Password = "";
            }
            return users;
        }

        public TokenDto Login(LoginDto user)
        {
            var users = _dbContext.Users.Where(s => s.Username == user.Username).Where(x => x.Password == Encode(user.Password)  && x.IsGoogle== false).ToList();
            if (users.Count == 0)
                return null;
            List<Claim> claims = new List<Claim>();
            if(users[0].Activated)
                 claims.Add(new Claim("username", users[0].Username));
            claims.Add(new Claim("id", users[0].Id.ToString()));
            claims.Add(new Claim("role", users[0].Type));
            claims.Add(new Claim("isGoogle", "false"));
            claims.Add(new Claim("isActivated", users[0].Activated.ToString()));
            claims.Add(new Claim("Status", users[0].Status.ToString()));
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(//kreiranje JWT
                   issuer: _tokenAddress.Value, //url servera koji je izdao token
                   claims: claims, //claimovi
                   expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                   signingCredentials: signinCredentials //kredencijali za potpis
               );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new TokenDto() { Token = tokenString };
        }

        public bool ModifyUser(UserDto userdto )
        {
            User user = _dbContext.Users.Find(userdto.Id); //Ucitavamo objekat u db context (ako postoji naravno)
            if (user == null)
                return false;
            user.Firstname = userdto.Firstname;
            user.Address = userdto.Address;
            user.BirthDate= userdto.BirthDate;
            user.Email = userdto.Email;
            user.Firstname = userdto.Firstname;
            user.Lastname = userdto.Lastname;
            if(userdto.Password.Length>4)
                user.Password = Encode(userdto.Password); 
            user.Username= userdto.Username;

            _dbContext.SaveChanges(); 

            return true;
        }
         

        public List<UserDto> Unactivated()
        {
            return _mapper.Map<List<UserDto>>(_dbContext.Users.Where(x => x.Status == StatusDobavljaca.NEVERIFIKOVAN).ToList());
        }

        public bool VerifyUser(long id)
        {
            User user = _dbContext.Users.Find(id);
            SendMail(user.Email,true);
            if (user == null)
                return false;
            user.Activated = true;
            user.Status = StatusDobavljaca.VERIFIKOVAN;
            _dbContext.SaveChanges();
            return true;
        }

        private void SendMail(string to, bool uspesnost)
        {   
            string from = "p.mojasevic.ftn@gmail.com"; //From address    
            MailMessage message = new MailMessage(from, to);
            string mailbody;
            if (uspesnost)
            {
                mailbody = "Uspesna verifikacija dostavljaca";
            }
            else
            {
                mailbody = "Neuspesna verifikacija dostavljaca";
            }
            message.Subject = "Verifikacija";
            message.Body = mailbody;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = false;
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp    
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("p.mojasevic.ftn@gmail.com", "uahimiqzadufprch");
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            try
            {
                client.Send(message);
            }

            catch (SmtpException ex)
            { 
            }
        }

        public bool DismissUser(long id)
        {

            User user = _dbContext.Users.Find(id);
            if (user == null)
                return false;
            SendMail(user.Email, false);
            user.Activated = false;
            user.Status = StatusDobavljaca.ODBIJEN;
            _dbContext.SaveChanges();  
            return true;
        }

        public TokenDto LoginGoogle(UserDto userdto)
        {
            User user;
            var users = _dbContext.Users.Where(s => s.Email==userdto.Email).ToList();
            if (users.Count == 0)
            {
                user = _mapper.Map<User>(userdto);
                user.Password = "";
                user.IsGoogle = true;
                user.Type = "Korisnik";
                user.Activated = true;
                user.Address = "";

                _dbContext.Users.Add(user);
                _dbContext.SaveChanges(); 
            }
            else
            {
                user = users[0];
                if (!users[0].IsGoogle)
                    return null;
            }
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("username", user.Username));
            claims.Add(new Claim("id", user.Id.ToString()));
            claims.Add(new Claim("role", user.Type));
            claims.Add(new Claim("isGoogle", "true"));
            claims.Add(new Claim("isActivated", users[0].Activated.ToString()));
            claims.Add(new Claim("Status", users[0].Status.ToString()));
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(//kreiranje JWT
                   issuer: "https://localhost:44305", //url servera koji je izdao token
                   claims: claims, //claimovi
                   expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                   signingCredentials: signinCredentials //kredencijali za potpis
               );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new TokenDto() { Token = tokenString };
        }

        public void AddImage(long userId, string filePath)
        {
            User user = _dbContext.Users.Find(userId);
            if (user == null||user.IsGoogle==true)
                return;
            user.PhotoUrl = filePath;
            _dbContext.SaveChanges();
        }

        public string GetImage(long userId)
        {
            User user = _dbContext.Users.Find(userId);
            if (user == null)
                return null;
            return user.PhotoUrl;
        }
    }
}
