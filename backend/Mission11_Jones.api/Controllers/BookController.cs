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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            var listOfBooks = _context.Books.Skip((pageNum-1) * pageSize).Take(pageSize).ToList(); // logic for pagination
            var totalNumBooks = _context.Books.Count();
            
            var booksObject = new
            {
                Books = listOfBooks,
                TotalNumBooks = totalNumBooks
            }; // Since I'm only using this object once, it is unnecessary to build a model for it

            return Ok(booksObject);
        }
    }
}