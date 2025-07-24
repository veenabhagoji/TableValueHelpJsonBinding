sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "employeelist/util/formatter",
      "sap/m/MessageBox",
      "sap/ui/export/Spreadsheet"
    
], (Controller, JSONModel, Filter, FilterOperator, Fragment, formatter, MessageBox, Spreadsheet ) => {
    "use strict";
   
    return Controller.extend("employeelist.controller.View1", {

        formatter: formatter,
         
        onInit() {
           this.oResourceBundle =  this.getOwnerComponent().getModel("i18n")
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
        },

        onRowPress: function(oEvent) {

            let oRouter = this.getOwnerComponent().getRouter();
           
          
          
                let oSelectedItem = oEvent.getSource();
                let oContext= oSelectedItem.getBindingContext('employeeModel')?.getObject();
                let sEmployeeId = oContext.employeeId;
              let sEmployeeName = oContext.firstName;
            
                sap.m.MessageToast.show("Selected EmployeeId: " + sEmployeeId);

                oRouter.navTo("EmployeeDetail", {
                    id :sEmployeeId,
                    firstName: sEmployeeName
                });
            },
               
        

        onClick: function(oEvent){
            let oSelectedButton = oEvent.getSource().getText();
            let oSelectedButtonType = oEvent.getSource().getType();
           let oResource =  this.oResourceBundle;
           var oRes = this.getView().getModel("i18n").getResourceBundle();

        //    this.onLoginPress();
          
          //  let sMessage = "Button Text: " + oSelectedButton + "\nButton Type: " + oSelectedButtonType;

        //   let sMessage = "Button Text: " + oSelectedButton + "\nButton Type: " + oSelectedButtonType;

            MessageBox.information(oRes.getText("ButtomMsg", [oSelectedButton, oSelectedButtonType]), {
                title: "Button Info"
            });
             
            let oDyanamicPage = this.byId('IdDynamic');
            let oFooter = oDyanamicPage.getShowFooter();
             if(oSelectedButton==='AA'){
            oDyanamicPage.setShowFooter(false);
             }else{
                oDyanamicPage.setShowFooter(true);
             }
        },
        onDownloadExcel: function () {
            var oTable = this.byId("employeeTable");
            var oModel = this.getView().getModel("employeeModel");
            var aData = oModel.getProperty("/employees");

            var aCols = this._createColumnConfig();

            var oSettings = {
                workbook: { columns: aCols },
                dataSource: aData,
                fileName: "EmployeeData.xlsx",
                worker: false // true enables background export
            };

            var oSheet = new Spreadsheet(oSettings);
            oSheet.build()
                .then(function () {
                    sap.m.MessageToast.show("Excel export done");
                })
                .catch(function (oError) {
                    console.error("Export failed", oError);
                });
        },

        _createColumnConfig: function () {
            return [
                { label: "Employee ID", property: "employeeId", type: "string" },
                { label: "First Name", property: "firstName", type: "string" },
                { label: "Last Name", property: "lastName", type: "string" },
                { label: "Designation", property: "designation", type: "string" },
                { label: "Department", property: "department", type: "string" },
                { label: "Email", property: "email", type: "string" },
                { label: "Contact Number", property: "contactNumber", type: "string" },
                { label: "Location", property: "location", type: "string" },
                { label: "Status", property: "status", type: "string" },
                { label: "Salary", property: "salary", type: "number", scale: 2 }
            ];
        },


        // onLoginPress: function () {
        //     // Hardcoded test input values (simulate user input)
        //     var username = "admin";
        //     var password = "secure123";
      
        //     const validUser = {
        //       username: "admin",
        //       password: "secure123",
        //       role: "admin"
        //     };
      
        //     if (username === validUser.username && password === validUser.password) {
        //       if (validUser.role === "admin") {
        //         MessageBox.information("Welcome, Admin! Access granted.");
        //         // You can call any local admin function here
        //         this._adminAccess();
        //       } else {
        //         MessageBox.information("Welcome, User! Access granted.");
        //         this._userAccess();
        //       }
        //     } else {
        //       MessageBox.error("Login failed. Incorrect username or password.");
        //       this._denyAccess();
        //     }
        //   },
      
        //   _adminAccess: function () {
        //     // Minimal admin logic
        //     // e.g., enable admin features or simulate something
        //   },
      
        //   _userAccess: function () {
        //     // Minimal user logic
        //   },
      
        //   _denyAccess: function () {
        //     // Optional: reset or disable inputs (if connected to a view)
        //   }
      

        
    
        
        

    });
});
