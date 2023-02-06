using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersService.DTO;
using UsersService.Models;

namespace UsersService.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto FindById(long id);
        UserDto FindByUsername(string username);
        bool AddUser(UserDto user); 
        bool ModifyUser(UserDto user);
        TokenDto Login(LoginDto user);
        List<UserDto> Unactivated();
        bool VerifyUser(long id);
        bool DismissUser(long id);
        TokenDto LoginGoogle(UserDto user);
        void AddImage(long v, string filePath);
        string GetImage(long v);
    }
}
