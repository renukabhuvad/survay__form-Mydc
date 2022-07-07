using System.Linq;
using System.Collections.Generic;

namespace  survay__form_.Models
{
    public class ChildDetailsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DOB { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public List<ExpenseModel> Expenses { get; set; }
        public ChildEducationCalculator Parent { get; set; }

        public int TotalExpense
        {
            get
            {
                return Expenses.Sum(e => e.TotalExpenses);
            }
        }

        public ChildDetailsModel()
        {
        }

        public ChildDetailsModel(int id, ChildEducationCalculator parent)
        {
            Id = id;
            Parent = parent; 
            Expenses = new List<ExpenseModel>
            {
                new ExpenseModel{ Age = 16, ExpenseType = ExpenseType.JuniorCollege, EstimatedAmount = 100000f },
                new ExpenseModel{ Age = 17, ExpenseType = ExpenseType.JuniorCollege, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 18, ExpenseType = ExpenseType.Graduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 19, ExpenseType = ExpenseType.Graduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 20, ExpenseType = ExpenseType.Graduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 21, ExpenseType = ExpenseType.PostGraduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 22, ExpenseType = ExpenseType.PostGraduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 23, ExpenseType = ExpenseType.PostGraduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 24, ExpenseType = ExpenseType.PostGraduation, EstimatedAmount = 100000f  },
                new ExpenseModel{ Age = 25, ExpenseType = ExpenseType.ProfessionalEducation, EstimatedAmount = 500000f  },
            };
        }

        public void CalculateTotalExpense(ExpenseModel expense)
        {
            double runningAmount = 0;
            for (int yearNo = Age.Value; yearNo < expense.Age; yearNo++)
            {
                if (expense.EstimatedAmount.HasValue)
                {
                    runningAmount = (runningAmount > 0 ? runningAmount : expense.EstimatedAmount.Value) * (1 + (double)expense.InflationRate / 100);
                }
            }
            expense.TotalExpenses = (int)runningAmount;
        }
    }    
}