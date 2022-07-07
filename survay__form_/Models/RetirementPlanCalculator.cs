using System.Linq;
using System.Collections.Generic;
using System;

namespace survay__form_.Models
{
    public class RetirementPlanCalculator
    {
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Gender { get; set; }
        public string EmailId { get; set; }
        public string EmailId_ { get; set; }
        public string DOB { get; set; }
        public int? Age { get; set; }
        public int? RetirementAge { get; set; }
        public double? InflationRate  { get; set; }
        public double? InterestRate { get; set; }
        public int? PensionAge { get; set; }
        public bool IsDetailedMonthlyExpense { get; set; }
        public double CurrentSavings { get; set; }
        public double MonthlyExpense { get; set; }
        public List<ExpenseModel> Expenses { get; set; }
        public string Message { get; set; }
        public string agentname { get; set; }
        public int agentid { get; set; }
        
        public string personalcontact { get; set; }
        public string profileimage { get; set; }
        public int YearsTillRetirement
        {
            get
            {
                return RetirementAge.Value - Age.Value;
            }
        }

        public int YearsRetirementToPension
        {
            get
            {
                return PensionAge.Value - RetirementAge.Value;
            }
        }
        public double TotalNeed { get; set; }
        public double TotalSavings{ get; set; }
        public double MonthlyEMI { get; set; }
        public double Gap
        {
            get
            {
                return TotalNeed - TotalSavings;
            }
        }

        public RetirementPlanCalculator()
        {
            //Name = "Kunal";
            //MobileNo = "9833704849";
            //EmailId = "kunalsmehta@yahoo.com";
            //RetirementAge = 55;
            //InterestRate = 8;
            //InflationRate = 6;
            //CurrentSavings = 200000;
            PensionAge = 80;
            //MonthlyExpense = 40000;
            agentname = "";
            agentid = 0;
            EmailId_ = "";
            personalcontact = "";
            profileimage = "";
            Expenses = new List<ExpenseModel>()
            {
                new ExpenseModel{ Id = 1, Name = "Regular Bills", ImagePath="bill1.png"},
                new ExpenseModel{ Id = 2, Name = "Food", ImagePath="foods.png"},
                new ExpenseModel{ Id = 3, Name = "Clothing", ImagePath="clothing1.png"},
                new ExpenseModel{ Id = 4, Name = "Medical", ImagePath="medical1.png"},
                new ExpenseModel{ Id = 5, Name = "Transport", ImagePath="transport1.png"},
                new ExpenseModel{ Id = 6, Name = "Lifestyle", ImagePath="lifestyle1.png"},
                new ExpenseModel{ Id = 7, Name = "Other", ImagePath="bill1.png"},
                new ExpenseModel{ Id = 8, Name = "Maintenance /Rent", ImagePath="home1.png"}
            };
        }

        public void CalculateTotalNeed()
        {            
            double yearlyNeedAtRetirement = MonthlyExpense * 12 * Math.Pow(1 + InflationRate.Value / 100, YearsTillRetirement-1);
            double remainingSavings = TotalSavings;
            TotalNeed = 0;
            double runningYearlyNeed = yearlyNeedAtRetirement;
            for (int yearNo = 0; yearNo < YearsRetirementToPension + 1; yearNo++)
            {                
                runningYearlyNeed = runningYearlyNeed * (1 + InflationRate.Value / 100);
                TotalNeed += runningYearlyNeed;
                double realRunningYearlyNeed = runningYearlyNeed;
                if (remainingSavings > 0) {                    
                    if (runningYearlyNeed <= remainingSavings)
                    {
                        remainingSavings -= runningYearlyNeed;
                        realRunningYearlyNeed = 0;
                    }
                    else
                    {
                        realRunningYearlyNeed = runningYearlyNeed - remainingSavings;
                        remainingSavings = 0;
                    }
                }
                if (realRunningYearlyNeed != runningYearlyNeed)
                {
                    double presentValue = realRunningYearlyNeed / Math.Pow(1 + InflationRate.Value / 100, YearsTillRetirement + yearNo);
                    MonthlyEMI += (presentValue / 365) / (YearsTillRetirement);
                    //$('#EMI').value = MonthlyEMI;
                }
                else
                {
                    MonthlyEMI += (MonthlyExpense * 12 / 365) / (YearsTillRetirement);
                }
            }
        }

        public void CalculateTotalSavings()
        {
            TotalSavings = CurrentSavings * Math.Pow(1 + InterestRate.Value / 100, YearsTillRetirement);
        }
    }
}
