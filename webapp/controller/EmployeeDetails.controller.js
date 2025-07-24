sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/ui/core/Fragment",
], (Controller, JSONModel, MessageBox, Fragment) => {
  "use strict";

  return Controller.extend("employeelist.controller.EmployeeDetails", {
      onInit() {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("EmployeeDetail").attachPatternMatched(this._onObjectMatched, this);
          // Employee Model (for form binding)
          const employeeData = {
              employeeId: "E001",
              firstName: "John",
              lastName: "Doe",
              designation: "Software Engineer",
              department: "IT",
              email: "john.doe@example.com",
              contactNumber: "9876543210",
              location: "Bangalore",
              status: true, // For checkbox
              salary: 75000
          };
          const employeeModel = new JSONModel(employeeData);
          this.getView().setModel(employeeModel, "employeeModel");

          // Designation Model (for dropdown)
          const designationData = {
              designations: [
                  { key: "Software Engineer", name: "Software Engineer" },
                  { key: "UI/UX Designer", name: "UI/UX Designer" },
                  { key: "Project Manager", name: "Project Manager" },
                  { key: "Quality Analyst", name: "Quality Analyst" },
                  { key: "DevOps Engineer", name: "DevOps Engineer" }
              ]
          };
          const designationModel = new JSONModel(designationData);
          this.getView().setModel(designationModel, "designationModel");

          // Location Model (for dropdown)
          const locationData = {
              locations: [
                  { key: "Bangalore", name: "Bangalore" },
                  { key: "Pune", name: "Pune" },
                  { key: "Hyderabad", name: "Hyderabad" },
                  { key: "Chennai", name: "Chennai" },
                  { key: "Mumbai", name: "Mumbai" }
              ]
          };
          const locationModel = new JSONModel(locationData);
          this.getView().setModel(locationModel, "locationModel");
      },
      onDesignationChange: function(oEvent) {
        const selectedKey = oEvent.getSource().getSelectedKey();
        const oEmployeeModel = this.getView().getModel("employeeModel");
        oEmployeeModel.setProperty("/designation", selectedKey);
    },


    handleEditBtnPress: function() {
        MessageBox.confirm(
            "Are you sure you want to edit this page?",
            {
                title: "Confirm Edit",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: (oAction) => {  // Use arrow function
                    if (oAction === MessageBox.Action.YES) {
                        this.visibilityModeEdit();
                    }
                }
            }
        );
    },
    

    visibilityModeEdit:function(){
const vbox1 =this.getView().byId("EmployeeViewFragment") ;  /// vuiew
const vbox2 =this.getView().byId("EmployeeEditFragment") ;  /// edit

vbox1.setVisible (false);
vbox2.setVisible(true);

    },
    
      onNavBack: function () {
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteView1");
      },
      _onObjectMatched: function(oEvent) {
        var sEmployeeId = oEvent.getParameter("arguments").id;
         var sEmployeeName = oEvent.getParameter("arguments").firstName;
    
        // Example usage
       
        alert("employee Id"+ sEmployeeId +"employee Name:"+ sEmployeeName);
    
      
    },

  });
});
