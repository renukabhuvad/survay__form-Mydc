namespace survay__form_.Models
{
    public class ExpenseModel
    {
        public int? Age { get; set; }
        public ExpenseType ExpenseType { get; set; }
        public double? EstimatedAmount { get; set; }
        public double InflationRate { get; set; }
        public int TotalExpenses { get; set; }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public double ExpenseAmount { get; set; }
    }
}