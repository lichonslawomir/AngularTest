using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BG_Test.Services
{
    public interface IValidatorFactory
    {
        T Create<T>();
    }
}
