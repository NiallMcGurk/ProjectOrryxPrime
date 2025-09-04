using Microsoft.AspNetCore.Mvc;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CreateAccountController : ControllerBase
    {
        [HttpPost("create")]
        public IActionResult CreateAccount([FromBody] AccountModel model)
        {
            // Do something with model (e.g., save to database)
            return Ok(new { message = "Account created", username = model.Username });
        }
    }
}
