sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (Controller) => {
    "use strict";
  
    return Controller.extend("employeelist.controller.EmployeeDetails", {
        onInit() {
        },

        
         onNavBack : function (){
          let oRouter = this.getOwnerComponent().getRouter();
          
          
          
          oRouter.navTo("RouteView1");
          
         }
        
    });
  });