sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "employeelist/util/formatter"
], (Controller, JSONModel, Filter, FilterOperator, Fragment, formatter) => {
    "use strict";

    return Controller.extend("employeelist.controller.View1", {

        formatter: formatter,

        onInit() {
            var oModel = new JSONModel();
            let data = {
                employees: [
                    { "employeeId": "E001", "firstName": "John", "lastName": "Doe", "designation": "Software Engineer", "department": "IT", "email": "john.doe@example.com", "contactNumber": "9876543210", "location": "Bangalore", "status": "Active", "salary": 75000 },
                    { "employeeId": "E002", "firstName": "Priya", "lastName": "Sharma", "designation": "UI/UX Designer", "department": "Design", "email": "priya.sharma@example.com", "contactNumber": "9123456780", "location": "Pune", "status": "Active", "salary": 68000 },
                    { "employeeId": "E003", "firstName": "Michael", "lastName": "Smith", "designation": "Project Manager", "department": "Management", "email": "michael.smith@example.com", "contactNumber": "9988776655", "location": "Hyderabad", "status": "Inactive", "salary": 95000 },
                    { "employeeId": "E004", "firstName": "Ananya", "lastName": "Rao", "designation": "Quality Analyst", "department": "QA", "email": "ananya.rao@example.com", "contactNumber": "9871234560", "location": "Chennai", "status": "Active", "salary": 62000 },
                    { "employeeId": "E005", "firstName": "David", "lastName": "Williams", "designation": "DevOps Engineer", "department": "IT", "email": "david.williams@example.com", "contactNumber": "9090909090", "location": "Mumbai", "status": "Inactive", "salary": 80000 }
                ],
                employeeNames: [
                    { key: "E001", name: "John Doe" },
                    { key: "E002", name: "Priya Sharma" },
                    { key: "E003", name: "Michael Smith" },
                    { key: "E004", name: "Ananya Rao" },
                    { key: "E005", name: "David Williams" }
                ],
                designations: [
                    { key: "Software Engineer", name: "Software Engineer" },
                    { key: "UI/UX Designer", name: "UI/UX Designer" },
                    { key: "Project Manager", name: "Project Manager" },
                    { key: "Quality Analyst", name: "Quality Analyst" },
                    { key: "DevOps Engineer", name: "DevOps Engineer" }
                ]
            };

            oModel.setData(data);
            this.getView().setModel(oModel, "employeeModel");
        },

        // Name Value Help
        onNameValueHelp: function() {
            var oView = this.getView();

            if (!this._pNameDialog) {
                this._pNameDialog = Fragment.load({
                    id: oView.getId(),
                    name: "employeelist.view.fragments.NameValuehelp",
                    controller: this
                }).then(function(oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                    return oDialog;
                });
            } else {
                this._pNameDialog.then(function(oDialog) {
                    oDialog.open();
                });
            }
        },

        onValueHelpSearch: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("name", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpConfirm: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                var sSelectedName = oSelectedItem.getTitle();
                this.byId("idNameInput").setValue(sSelectedName);
                sap.m.MessageToast.show("Selected: " + sSelectedName);
            }
        },

        onValueHelpCancel: function() {
            // Optional: Handle cancel event if needed
        },

        // Designation Value Help
        onDesignationValueHelp: function() {
            var oView = this.getView();

            if (!this._pDesignationDialog) {
                this._pDesignationDialog = Fragment.load({
                    id: oView.getId(),
                    name: "employeelist.view.fragments.Designation",
                    controller: this
                }).then(function(oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                    return oDialog;
                });
            } else {
                this._pDesignationDialog.then(function(oDialog) {
                    oDialog.open();
                });
            }
        },

        onDesignationValueHelpSearch: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("name", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onDesignationValueHelpConfirm: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                var sSelectedName = oSelectedItem.getTitle();
                this.byId("idDesignationEmployee").setValue(sSelectedName);
                sap.m.MessageToast.show("Selected: " + sSelectedName);
            }
        },

        onSearch: function(oEvent) {
            var oView = this.getView();
            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");
        
            // Get FilterBar inputs
            var sName = this.byId("idNameInput").getValue();
            var sDesignation = this.byId("idDesignationEmployee").getValue();
        
            var aFilters = [];
        
            // Name Filter (firstName + lastName concatenation)
            if (sName) {
                var aNameParts = sName.split(" ");
                var sFirstName = aNameParts[0];
                var sLastName = aNameParts[1];
        
                aFilters.push(new Filter({
                    filters: [
                        new Filter("firstName", FilterOperator.EQ, sFirstName),
                        new Filter("lastName", FilterOperator.EQ, sLastName)
                    ],
                    and: true
                }));
            }
        
            // Designation Filter
            if (sDesignation) {
                aFilters.push(new Filter("designation", FilterOperator.EQ, sDesignation));
            }
        
            // Apply filters to the table
            oBinding.filter(aFilters);
        
            // Optional: Show message
            sap.m.MessageToast.show("Filters applied");
        },

        onSearch: function(oEvent) {
            var oView = this.getView();
            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");
        
            // Get FilterBar inputs
            var sName = this.byId("idNameInput").getValue();
            var sDesignation = this.byId("idDesignationEmployee").getValue();
        
            var aFilters = [];
        
            // Name Filter (firstName + lastName concatenation)
            if (sName) {
                var aNameParts = sName.split(" ");
                var sFirstName = aNameParts[0];
                var sLastName = aNameParts[1];
        
                aFilters.push(new Filter({
                    filters: [
                        new Filter("firstName", FilterOperator.EQ, sFirstName),
                        new Filter("lastName", FilterOperator.EQ, sLastName)
                    ],
                    and: true
                }));
            }
        
            // Designation Filter
            if (sDesignation) {
                aFilters.push(new Filter("designation", FilterOperator.EQ, sDesignation));
            }
        
            // Apply filters to the table
            oBinding.filter(aFilters);
        
            // Optional: Show message
            sap.m.MessageToast.show("Filters applied");
        }
        
        

    });
});
