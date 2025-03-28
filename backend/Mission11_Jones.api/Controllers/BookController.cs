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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            string? favBookType = Request.Cookies["favoriteBookType"];
            Console.WriteLine("===========COOKIE===========\n", favBookType);
            
            HttpContext.Response.Cookies.Append("favoriteBookType", "The Snowball", new CookieOptions
            {
                HttpOnly = true, Secure = true, SameSite = SameSiteMode.Strict, Expires = DateTime.Now.AddMinutes(1),
            });
            
            var totalNumBooks = query.Count();
            var listOfBooks = query.Skip((pageNum-1) * pageSize).Take(pageSize).ToList(); // logic for pagination
            
            var booksObject = new
            {
                Books = listOfBooks,
                TotalNumBooks = totalNumBooks
            }; // Since I'm only using this object once, it is unnecessary to build a model for it

            return Ok(booksObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookTypes = _context.Books.Select(b => b.Category).Distinct().ToList();
            
            return Ok(bookTypes);
        }
    }
}