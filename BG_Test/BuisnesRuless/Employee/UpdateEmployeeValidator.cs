using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Models;
using FluentValidation;

namespace BG_Test.BuisnesRuless.Employee
{
    public class UpdateEmployeeValidator : AbstractValidator<Models.Employee>
    {
        public UpdateEmployeeValidator()
        {
            RuleFor(u => u.forename)
                .NotEmpty().WithMessage("Forename is required");
            RuleFor(u => u.surname)
                .NotEmpty().WithMessage("Surname is required!!!");
            RuleFor(u => u.emailAddress)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Wrong format");
        }
    }
}
