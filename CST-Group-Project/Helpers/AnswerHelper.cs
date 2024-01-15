using CST_Group_Project.Data;
using CST_Group_Project.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Helpers
{
    public class AnswerHelper
    {
        public static async Task<Answer> AddAnswer(Answer answer, MyDatabaseContext _context)
        {
            _context.Answer.Add(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

        public static async Task<Boolean> RemoveAnswer(int id, MyDatabaseContext _context)
        {
            var answer = await _context.Answer.FindAsync(id);
            if (answer == null) return false;
            
            _context.Answer.Remove(answer);
            await _context.SaveChangesAsync();
            return true;
        }

        public static async Task<Answer> GetAnswer(int id, MyDatabaseContext _context)
        {
            var answer = await _context.Answer.FindAsync(id);
            return answer;
        }
    }
}
