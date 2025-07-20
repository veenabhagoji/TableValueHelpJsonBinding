sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("employeelist.controller.EmployeeDetails", {
      onInit() {
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

      onNavBack: function () {
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteView1");
      }
  });
});
