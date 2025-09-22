using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjectOrryxPrime.BusinessLogic;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("armyController")]
    public class ArmyController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ArmyController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("createArmy")]
        public IActionResult CreateArmy([FromBody] ArmyResponseDataModel armyResponseDataModel)
        {
            CreateArmyModel armyModel = new CreateArmyModel(
                armyResponseDataModel.ArmyName,
                (FactionEnum)Enum.Parse(typeof(FactionEnum), armyResponseDataModel.Faction),
                armyResponseDataModel.Points,
                (DetachmentOrksEnum)Enum.Parse(typeof(DetachmentOrksEnum), armyResponseDataModel.Detachment)
            );
                
            ArmyBOL armyBol = new ArmyBOL(this._config);
            int rowsAffected = armyBol.CreateArmy(armyModel);
            if (rowsAffected > 0)
                return Ok(new { Message = "Army created successfully." });
            else
                return StatusCode(500, new { Message = "Failed to create army." });

        }
    }
}
