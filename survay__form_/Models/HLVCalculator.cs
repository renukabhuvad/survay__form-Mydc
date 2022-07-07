using System;
using System.Text;

namespace survay__form_.Models
{
    public class HLVCalculator
    {
        public string Name { get; set; }
        public DateTime? DOB { get; set; }
        public int Age { get; set; }
        public int RetirementAge { get; set; }
        public int InflationRate { get; set; }
        public string Gender { get; set; }
        public int AnnualIncome { get; set; }
        public int SpouseAnnualIncome { get; set; }
        public int SpouseIncomeGrowthPercentage { get; set; }
        public int SpouseTotalIncome { get; set; }
        public int AnnualExpenses { get; set; }
        public int TotalExpenses { get; set; }
        public int CurrentLiabilities { get; set; }
        public bool? IsMarried { get; set; }
        public int LiquidableSavings { get; set; }
        public bool? IsInsured { get; set; }
        public int LifeInsuranceCover { get; set; }
        public int HumanLifeValue
        {
            get
            {
                return TotalExpenses + CurrentLiabilities - SpouseTotalIncome - LiquidableSavings;
            }
        }

        public string HLVMessage
        {
            get
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendFormat("In your absence, your family will be protected for {0} year only, with existing saving and Insurance cover. Therefore you need a further insurance of Rs.{1} to fill the gap.", NoOfSurvivalYears, InsuranceCoverNeed);
                return sb.ToString();
            }
        }

        public double NoOfSurvivalYears
        {
            get
            {
                return Math.Ceiling((double)(LiquidableSavings + LifeInsuranceCover) / AnnualExpenses);
            }
        }

        public int InsuranceCoverNeed
        {
            get
            {
                return HumanLifeValue - LifeInsuranceCover;
            }
        }

        public int HappinessIndex
        {
            get
            {
                return (int) ((double)LifeInsuranceCover/ HumanLifeValue * 100);
            }
        }

        public int YearsRemaining
        {
            get
            {
                return RetirementAge - Age;
            }
        }

        public void CalculateTotalExpense()
        {
            double runningExpense = 0;
            double totalRunningExpense = 0;
            for (int yearNo = 0; yearNo < YearsRemaining; yearNo++)
            {
                runningExpense = (runningExpense > 0 ? runningExpense : AnnualExpenses) * (1 + (double)InflationRate / 100);
                totalRunningExpense += runningExpense;
            }
            TotalExpenses = (int)totalRunningExpense;
        }

        public void CalculateTotalSpouseIncome()
        {
            double runningIncome = 0;
            double totalRunningIncome = 0;
            for (int yearNo = 0; yearNo < YearsRemaining; yearNo++)
            {
                runningIncome = (runningIncome > 0 ? runningIncome : SpouseAnnualIncome) * (1 + (double)SpouseIncomeGrowthPercentage / 100);
                totalRunningIncome += runningIncome;
            }
            SpouseTotalIncome = (int)totalRunningIncome;
        }
    }
}