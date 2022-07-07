using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace survay__form_.Models
{
    public class ChildEducationCalculator
    {
        public string Name { get; set; }
        public string email { get; set; }

        public string mobile { get; set; }
        public string DOB { get; set; }
       
        public int? Age { get; set; }
        public int? NoOfChildren { get; set; }
        public double? CurrentSavings { get; set; }
        public List<ChildDetailsModel> ChildDetails { get; set; }
        public List<ProfessionModel> Professions { get; set; }
        public string agentname { get; set; }
        public int agentid { get; set; }
        public string emailid { get; set; }
        public string personalcontact { get; set; }
        public string profileimage { get; set; }
        public int TotalExpense
        {
            get
            {
                return ChildDetails.Sum(s => s.TotalExpense);
            }
        }
        public int Gap
        {
            get
            {
                return TotalExpense - (int) CurrentSavings;
            }
        }
        public string Message
        {
            get
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendFormat("Hello",TotalExpense,Gap);
                return sb.ToString();
            }
        }
        public ChildEducationCalculator()
        {
            ChildDetails = new List<ChildDetailsModel>
            {
                new ChildDetailsModel(1, this),
                new ChildDetailsModel(2, this),
                new ChildDetailsModel(3, this),
                new ChildDetailsModel(4, this),
                new ChildDetailsModel(5, this)
            };

            Professions = new List<ProfessionModel>
            {
                new ProfessionModel{ Name = "Doctor", ImagePath = "child_doctor.png", EstimatedAmount = 2500000 },
                new ProfessionModel{ Name = "Engineer", ImagePath = "child_enginer.png", EstimatedAmount = 900000 },
                new ProfessionModel{ Name = "Pilot", ImagePath = "child_pilot.png", EstimatedAmount = 1200000 },
                new ProfessionModel{ Name = "MBA", ImagePath = "child_mba.png", EstimatedAmount = 500000 },
                new ProfessionModel{ Name = "Charterd Accountant", ImagePath = "child_ca.png", EstimatedAmount = 500000 },
                new ProfessionModel{ Name = "Marriage", ImagePath = "child_marriage.png", EstimatedAmount = 1000000 },
                new ProfessionModel{ Name = "Others", ImagePath = "child_other.png", EstimatedAmount = 500000 },
            };
        }
    }
}