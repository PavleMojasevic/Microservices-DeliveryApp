using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UsersService.DTO;
using UsersService.Interfaces;
using System.Web;
using Microsoft.AspNetCore.Http;
using System.IO;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UsersService.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<UsersController>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult Get()
        {
            //principal, clames principal
            try
            {
                return Ok(_userService.GetUsers());
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")] 
        [Authorize]
        public ActionResult Get(long id)
        {
            try
            {
                return Ok(_userService.FindById(id));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
       
        // POST api/<UsersController>
        [HttpPost]
        public ActionResult Post([FromBody] UserDto user)
        {
            if(_userService.AddUser(user))
                return Ok(true);


            return Ok(false);
        }  
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginDto user)
        { 
            return Ok(_userService.Login(user)); 
        }
         
        [HttpPost("put")]
        [Authorize]
        public ActionResult Put([FromBody] UserDto user)
        {
            if (_userService.ModifyUser(user))
                return Ok();


            return BadRequest(); 
        }

        private string HasToken(string name, List<Claim> claims)
        {
            foreach (var item in claims)
            {
                if (item.Type == name)
                    return item.Value;
            }
            return null;
        }
        // PUT api/<UsersController>/5
        [HttpGet("username/{username}")]  
        [Authorize]
        public ActionResult GetByUsername(string username)
        {
            UserDto user = _userService.FindByUsername(username);
            user.Password = "";
            if (user!=null)
                return Ok(user); 
            return BadRequest();
        } 
        [HttpGet("Unactivated")]
        [Authorize(Roles = "Admin")]
        public ActionResult Unactivated()
        {
            List<UserDto> ret = _userService.Unactivated();
            return Ok(ret); 
            
        }
        [HttpPost("verifyUser")]
        [Authorize(Roles = "Admin")]
        public ActionResult VerifyUser([FromBody]long id)
        {
            bool ret = _userService.VerifyUser(id);
            return Ok(ret); 
            
        }
        [HttpPost("dismissUser")]
        [Authorize(Roles = "Admin")]
        public ActionResult DismissUser([FromBody]long id)
        {
            bool ret = _userService.DismissUser(id);
            return Ok(ret); 
            
        }
        [HttpPost("LoginGoogle")]
        
        public ActionResult LoginGoogle([FromBody]UserDto user)
        {
            var ret = _userService.LoginGoogle(user);
            return Ok(ret); 
            
        }
        [HttpPost("uploadImage")]
        [Authorize]
        public ActionResult UploadFile(IFormFile file)
        { 
             
            if (file.Length > 0)
            {
                string filePath = "./Images/" + file.FileName;

                using (var stream = System.IO.File.Create(filePath))
                {
                    file.CopyTo(stream);
                }
                List<Claim> claims = User.Claims.ToList();
                foreach (var item in claims)
                {
                    if (item.Type.ToLower() == "id")
                    {
                        _userService.AddImage(Convert.ToInt64(item.Value), filePath);
                        return Ok(true);
                    }
                }
            }


            return Ok(false);
        }
        [HttpGet("image")]
        [Authorize]
        public IActionResult GetImage()
        {
            foreach (var item in User.Claims.ToList())
            {
                if (item.Type.ToLower() == "id")
                { 
                    string filePath=_userService.GetImage(Convert.ToInt64(item.Value));
                    if (filePath == null || filePath=="")
                        return null;
                    var bytes = System.IO.File.ReadAllBytes(filePath);

                    var cd = new System.Net.Mime.ContentDisposition
                    {
                        FileName = filePath.Split('/')[filePath.Split('/').Length-1],
                        Inline = false
                    };

                    Response.Headers.Add("Content-Disposition", cd.ToString());
                    Response.Headers.Add("X-Content-Type-Options", "nosniff");

                    return File(bytes, "image/png"); 
                }
            }
            return null;
        }
        [HttpGet("imagegoogle")]
        [Authorize]
        public UrlDto GetImageGoogle()
        {
            foreach (var item in User.Claims.ToList())
            {
                if (item.Type.ToLower() == "id")
                {
                    string filePath = _userService.GetImage(Convert.ToInt64(item.Value));
                    var x = new UrlDto();
                    x.url = filePath;
                    return x;
                }
            }
            return null;
        }
    }
}
