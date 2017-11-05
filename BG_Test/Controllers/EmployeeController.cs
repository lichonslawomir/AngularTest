using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BG_Test.Repository;
using BG_Test.Models;

namespace BG_Test.Controllers
{
    [Route("api/employees")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _iEmployeeRepository;
        private readonly IEmployeeLogic _iEmployeeLogic;

        public EmployeeController(IEmployeeRepository iEmployeeRepository, IEmployeeLogic iEmployeeLogic)
        {
            this._iEmployeeRepository = iEmployeeRepository ?? throw new ArgumentNullException(nameof(iEmployeeRepository));
            this._iEmployeeLogic = iEmployeeLogic ?? throw new ArgumentNullException(nameof(iEmployeeLogic));
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return this._iEmployeeRepository.List();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return this._iEmployeeRepository.Get(id);
        }


        private IActionResult BadRequest(BaseResult result)
        {
            foreach (var item in result.Errors)
            {
                ModelState.AddModelError(item.PropertyName, item.Message);
            }
            return BadRequest(ModelState);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Employee employee)
        {
            try
            {
                if (employee == null || !ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = this._iEmployeeLogic.Insert(employee);
                if (result.Success)
                {
                    employee = result.Value;
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception)
            {
                return BadRequest("Unknow error");
            }
            return Ok(employee);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Employee employee)
        {
            try
            {
                if (employee == null || !ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                employee.id = id;
                var result = this._iEmployeeLogic.Insert(employee);
                if (!result.Success)
                {
                    return BadRequest(result);
                }
            }
            catch (Exception)
            {
                return BadRequest("Unknow error");
            }
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = this._iEmployeeLogic.Delete(id);
                if (!result.Success)
                {
                    return BadRequest(result);
                }
            }
            catch (Exception)
            {
                return BadRequest("Unknow error");
            }
            return new NoContentResult();
        }
    }
}
