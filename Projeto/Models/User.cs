using System;
using System.ComponentModel.DataAnnotations;

namespace Projeto.Models
{
    public class User
    {
        public Guid Id { get; set; }


        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [StringLength(50, ErrorMessage = "Usuário inválido", MinimumLength = 5)]
        public string Username { get; set; }


        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [StringLength(50, ErrorMessage = "Senha inválida", MinimumLength = 4)]
        public string Password { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }

    }

    public class UserRegister
    {

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [StringLength(50, ErrorMessage = "Campo deve conter de {2} a {1} caracteres", MinimumLength = 5)]
        public string Username { get; set; }


        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [StringLength(12, ErrorMessage = "Campo deve conter de {2} a {1} caracteres", MinimumLength = 4)]
        public string Password { get; set; }


        [Compare("Password", ErrorMessage = "Confirmação da Senha diferente da Senha.")]
        public string ConfirmPassword { get; set; }

        public string Role { get; set; }
        public bool Active { get; set; }

    }


    public class UserUpdatePassword
    {
        public Guid Id { get; set; }
        public string Username { get; set; }


        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [StringLength(12, ErrorMessage = "Campo deve conter de {2} a {1} caracteres", MinimumLength = 4)]
        public string Password { get; set; }


        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [StringLength(12, ErrorMessage = "Campo deve conter de {2} a {1} caracteres", MinimumLength = 4)]
        public string NewPassword { get; set; }


        [Compare("NewPassword", ErrorMessage = "Confirmação diferente da Senha.")]
        public string ConfirmNewPassword { get; set; }
    }


    public class UserResult : DataResult
    {
        public User Object { get; set; }
        public string Token { get; set; }
    }


}