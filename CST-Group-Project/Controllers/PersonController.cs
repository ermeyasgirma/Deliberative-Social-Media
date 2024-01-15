using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CST_Group_Project.Data;
using CST_Group_Project.Models;
using CST_Group_Project.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public PersonController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Person
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetAllPersons(int limit = 100)
        {
            List<Person> ans = await _context.Person.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Person/5
        [HttpGet("{name}")]
        public async Task<ActionResult<Person>> GetPerson(string name)
        {
            var person = await _context.Person.FindAsync(name);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        [HttpGet("exists_name/{name}")]
        public async Task<Boolean> ExistsPerson(string name)
        {
            name = name.ToLower();
            List<Person> lst = await _context.Person.ToListAsync();
            foreach (var person in lst)
                if (person.Name.ToLower() == name) return true;
            return false;
        }

        [HttpGet("exists_email/{email}")]
        public async Task<Boolean> ExistsEmail(string email)
        {
            email = email.ToLower();
            List<Person> lst = await _context.Person.ToListAsync();
            foreach (var person in lst)
                if (person.Email != null && person.Email.ToLower() == email) return true;
            return false;
        }

        // PUT: api/Person/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{name}")]
        public async Task<IActionResult> PutPerson(string name, Person person)
        {
            if (name != person.Name)
            {
                return BadRequest();
            }

            //_context.Entry(person).State = EntityState.Modified;
            _context.Person.Remove(await _context.Person.FindAsync(name));
            _context.Person.Add(person);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(name))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Person
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            if (person.Created == null) person.Created = DateTimeOffset.UtcNow;
            if (person.Permission == null) person.Permission = "User";
            _context.Person.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.Name }, person);
        }

        // DELETE: api/Person/5
        [HttpDelete("{name}")]
        public async Task<IActionResult> DeletePerson(string name)
        {
            var person = await _context.Person.FindAsync(name);
            if (person == null)
            {
                return NotFound();
            }

            _context.Person.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonExists(string name)
        {
            return _context.Person.Any(e => e.Name == name);
        }

        [HttpGet("{name}/email/confirmation/send")]
        public async Task<ActionResult<String>> ConfirmEmailSend(string name)
        {
            var person = await _context.Person.FindAsync(name);

            if (person == null)
            {
                return "Person not found";
            }

            string result = EmailsSender.SendConfirmationEmail(ref person);
            _context.Person.Update(person);
            await _context.SaveChangesAsync();
            return result;

        }

        [HttpGet("{name}/password/reset/send")]
        public async Task<ActionResult<String>> ResetPasswordSend(string name)
        {
            var person = await _context.Person.FindAsync(name);

            if (person == null)
            {
                return "Person not found";
            }

            string result = EmailsSender.SendResetPasswordEmail(ref person);
            _context.Person.Update(person);
            await _context.SaveChangesAsync();
            return result;

        }

        [HttpGet("{name}/email/confirmed/{token}")]
        public async Task<ActionResult<String>> ConfirmEmailRecive(string name, string token)
        {
            var person = await _context.Person.FindAsync(name);

            if (person == null)
            {
                return "Person not found";
            }

            if (person.Token.StartsWith(token) && token.Length==20 && person.TokenExpiration > DateTime.Now)
            {
                person.EmailConfirmed = true;
                person.Token = null;
                person.TokenExpiration = null;
                _context.Person.Update(person);
                await _context.SaveChangesAsync();
                return "Email Confirmed";
            }
            


            return String.Format("{0}, date {1} \n {2},t2 {3}", person.Token.Equals(token), person.TokenExpiration > DateTime.Now, person.Token, token);

        }


    }



}
