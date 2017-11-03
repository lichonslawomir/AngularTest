using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Models;

namespace BG_Test.Services
{
    public class DummyEmployeeService : IEmployeeService
    {
        private readonly List<Employee> _list = new List<Employee>(new Employee[]
        {
            
        });

        public DummyEmployeeService()
        {
            for (int i = 0; i < 10; ++i)
            {
                _list.Add(new Employee()
                {
                    id = i+1,
                    forename = string.Format("forename: {0}",i),
                    surname = string.Format("surname: {0}", i),
                    emailAddress = string.Format("emailAddress: {0}", i)
                });
            }
        }
        public Employee[] List()
        {
            return _list.ToArray();
        }

        public Employee Get(int id)
        {
            return _list.FirstOrDefault(e => e.id == id);
        }

        public void Update(Employee employee)
        {
            var idx = _list.FindIndex(e => e.id == employee.id);
            if(idx >= 0)
                _list[idx] = employee;
        }

        public Employee Insert(Employee employee)
        {
            employee.id = (_list.Any() ? _list.Max(e => e.id) : 0) + 1;
            _list.Add(employee);
            return employee;
        }

        public void Delete(int id)
        {
            _list.RemoveAll(e => e.id == id);
        }
    }
}
