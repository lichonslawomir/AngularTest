using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BG_Test
{
    public class BaseResult
    {
        public BaseResult()
        {
        }
        public BaseResult(bool success)
        {
            this.Success = success;
        }
        public BaseResult(ErrorMessage err)
        {
            this.Success = false;
            Errors = new List<ErrorMessage>(
                new ErrorMessage[] {
                    err
                });
        }

        public bool Success { get; set; }
        public List<ErrorMessage> Errors { get; set; }
    }

    public class BaseResult<T> : BaseResult
    {
        public T Value { get; set; }
    }

    public class ErrorMessage
    {
        public string PropertyName { get; set; }
        public string Message { get; set; }

        public ErrorMessage()
        {
        }
        public ErrorMessage(string propertyName, string message)
        {
            this.PropertyName = propertyName;
            this.Message = message;
        }
    }
}
