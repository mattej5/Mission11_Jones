using Microsoft.AspNetCore.Mvc;
using Mission11_Jones.API.Data;

namespace Mission11_Jones.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        
        public BookController(BookDbContext temp) => _context = temp;

        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return _context.Books.ToList();
        }
    }
}