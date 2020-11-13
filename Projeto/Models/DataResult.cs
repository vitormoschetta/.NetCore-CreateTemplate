using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public class DataResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<Notification> Notifications { get; set; }
    }

    public class Notification
    {
        public string Property { get; set; }
        public string Message { get; set; }
    }
}