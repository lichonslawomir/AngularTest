using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BG_Test.Models;

namespace BG_Test.Interfaces
{
    public interface IEmployeeLogic
    {
        BaseResult Update(Employee employee);
        BaseResult<Employee> Insert(Employee employee);
        BaseResult Delete(int id);
    }
}
