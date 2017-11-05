using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Models;
using BG_Test.Repository;
using FluentValidation;
using FluentValidation.Results;

namespace BG_Test.BuisnesRuless.Employee
{
    public class InsertEmployeeValidator : UpdateEmployeeValidator
    {
        private readonly IEmployeeRepository _iEmployeeRepository;

        public InsertEmployeeValidator(IEmployeeRepository iEmployeeRepository)
        {
            this._iEmployeeRepository = iEmployeeRepository ?? throw new ArgumentNullException(nameof(iEmployeeRepository));
        }

        public override ValidationResult Validate(ValidationContext<Models.Employee> context)
        {
            var result = base.Validate(context);
            if (result.IsValid)
            {
                var v = context.InstanceToValidate;
                if (_iEmployeeRepository.List().Any(e => e.emailAddress == v.emailAddress))
                    return new ValidationResult(new[] { new ValidationFailure("emailAddress", "Must be unique") });
            }
            return result;
        }
    }
}
