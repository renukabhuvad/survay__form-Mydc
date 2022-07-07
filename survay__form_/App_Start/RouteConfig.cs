using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace survay__form_
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
             name: "calculator",
             url: "calculator",
             defaults: new { controller = "Home", action = "ChildPlanner", id = UrlParameter.Optional }
         );

          //  routes.MapRoute(
          //    name: "cepCalculator",
          //    url: "home/cepCalculator/{id}",
          //    defaults: new { controller = "Home", action = "ChildEducationCalculator", id = UrlParameter.Optional }
          //);
            routes.MapRoute(
              name: "ChildPlaner",
              url: "ChildPlaner/{id}",
              defaults: new { controller = "Home", action = "ChildPlanner", id = UrlParameter.Optional }
          );
            routes.MapRoute(
              name: "RetirementPlanner",
              url: "RetirementPlanner/{id}",
              defaults: new { controller = "Home", action = "RetirementCalculator", id = UrlParameter.Optional }
          );
            routes.MapRoute(
              name: "FamilyFinancialSecurity",
              url: "FamilyFinancialSecurity/{id}",
              defaults: new { controller = "Home", action = "FamilyFinancialSecurity", id = UrlParameter.Optional }
          );
            routes.MapRoute(
             name: "WealthValueCalculator",
             url: "WealthValueCalculator/{id}",
             defaults: new { controller = "Home", action = "WealthValueCalculator", id = UrlParameter.Optional }
         );
            routes.MapRoute(
            name: "EMI",
            url: "EMI/{id}",
            defaults: new { controller = "Home", action = "EMI", id = UrlParameter.Optional }
        );
            routes.MapRoute(
          name: "FutureValue",
          url: "PresentAndFutureValue/{id}",
          defaults: new { controller = "Home", action = "PresentAndFutureValue", id = UrlParameter.Optional }
      );
            routes.MapRoute(
         name: "PresentValue",
         url: "PresentValue/{id}",
         defaults: new { controller = "Home", action = "PresentValue", id = UrlParameter.Optional }
     );
            routes.MapRoute(
            name: "calculatorretirement",
            url: "calculatorretirement",
            defaults: new { controller = "Home", action = "RetirementCalculator", id = UrlParameter.Optional }
            );
           // routes.MapRoute(
           //             name: "rpCalculator",
           //             url: "Home/rpCalculator",
           //             defaults: new { controller = "Home", action = "RetirementPlanCalculator", id = UrlParameter.Optional }
           //);

            routes.MapRoute(
              name: "emicalculator",
              url: "emicalculator",
              defaults: new { controller = "Home", action = "EMI", id = UrlParameter.Optional }
          );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
