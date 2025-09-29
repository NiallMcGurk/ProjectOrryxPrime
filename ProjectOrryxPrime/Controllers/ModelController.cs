using Microsoft.AspNetCore.Mvc;
using ProjectOrryxPrime.BusinessLogic;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("modelController")]
    public class ModelController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ModelController(IConfiguration config)
        {
            this._config = config;
        }

        [HttpGet]
        [Route("getModels")]
        public IActionResult GetModel(string factionType)
        {
            try
            {
                ViewModelModel model = new ModelBOL(this._config).GetModel(factionType);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while retrieving the model.", Details = ex.Message });
            }
        }
    }
}
