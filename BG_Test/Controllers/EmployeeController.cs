﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BG_Test.Repository;
using BG_Test.Models;

namespace BG_Test.Controllers
{
    [Route("api/employees")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _iEmployeeService;

        public EmployeeController(IEmployeeRepository iEmployeeService)
        {
            this._iEmployeeService = iEmployeeService;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return this._iEmployeeService.List();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return this._iEmployeeService.Get(id);
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

                employee = this._iEmployeeService.Insert(employee);
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
            employee.id = id;
            this._iEmployeeService.Update(employee);
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this._iEmployeeService.Delete(id);
            return new NoContentResult();
        }
    }
}
