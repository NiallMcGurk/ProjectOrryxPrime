using Microsoft.AspNetCore.Mvc;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("controller")]
    public class CreateAccountController : ControllerBase
    {
        [HttpPost("account")]
        public IActionResult CreateAccount([FromBody] AccountModel model)
        {
            return Ok();
            // return Ok(new { message = "Account created", username = model.Username });
        }
    }
}
