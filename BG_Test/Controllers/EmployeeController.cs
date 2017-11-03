﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BG_Test.Services;
using BG_Test.Models;

namespace BG_Test.Controllers
{
    [Route("api/employees")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _iEmployeeService;

        public EmployeeController(IEmployeeService iEmployeeService)
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
        public void Post([FromBody]Employee employee)
        {
            this._iEmployeeService.Update(employee);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Employee employee)
        {
            this._iEmployeeService.Insert(employee);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this._iEmployeeService.Delete(id);
        }
    }
}