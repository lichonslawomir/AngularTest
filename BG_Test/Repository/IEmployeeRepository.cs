using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Models;

namespace BG_Test.Repository
{
    public interface IEmployeeRepository
    {
        Employee[] List();
        Employee Get(int id);
        void Update(Employee employee);
        Employee Insert(Employee employee);
        void Delete(int id);
    }
}
