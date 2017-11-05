using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Interfaces;
using BG_Test.Repository;
using BG_Test.Services;

namespace BG_Test.BuisnesRuless.Employee
{
    public class EmployeeLogic : IEmployeeLogic
    {
        private readonly IValidatorFactory _validatorFactory;
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeLogic(IValidatorFactory validatorFactory, IEmployeeRepository employeeRepository)
        {
            _validatorFactory = validatorFactory ?? throw new ArgumentNullException(nameof(validatorFactory));
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
        }

        public BaseResult Update(Models.Employee employee)
        {
            if (employee == null)
                throw new ArgumentNullException(nameof(employee));

            var validator = _validatorFactory.Create<UpdateEmployeeValidator>();
            var validationResult = validator.Validate(employee);

            if (!validationResult.IsValid)
            {
                return new BaseResult<Models.Employee>()
                {
                    Success = false,
                    Errors = validationResult.Errors
                        .Select(e => new ErrorMessage(e.PropertyName, e.ErrorMessage))
                        .ToList()
                };
            }

            _employeeRepository.Update(employee);
            return new BaseResult<Models.Employee>()
            {
                Success = true
            };
        }

        public BaseResult<Models.Employee> Insert(Models.Employee employee)
        {
            if (employee == null)
                throw new ArgumentNullException(nameof(employee));

            var validator = _validatorFactory.Create<InsertEmployeeValidator>();
            var validationResult = validator.Validate(employee);

            if (!validationResult.IsValid)
            {
                return new BaseResult<Models.Employee>()
                {
                    Success = false,
                    Errors = validationResult.Errors
                        .Select(e => new ErrorMessage(e.PropertyName, e.ErrorMessage))
                        .ToList()
                };
            }

            employee = _employeeRepository.Insert(employee);
            return new BaseResult<Models.Employee>()
            {
                Success = true,
                Value = employee
            };
        }

        public BaseResult Delete(int id)
        {
            _employeeRepository.Delete(id);
            return new BaseResult<Models.Employee>()
            {
                Success = true
            };
        }
    }
}
