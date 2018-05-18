sap.ui.define([
   'sap/ui/jsroot/GuiPanelController',
   'sap/ui/model/json/JSONModel'
], function (GuiPanelController, JSONModel) {
   "use strict";


   return GuiPanelController.extend("localapp.controller.SimpleFitPanel",{

         //function called from GuiPanelController
      onPanelInit : function() {
         console.log("I am A");
         var id = this.getView().getId();
         var opText = this.getView().byId("OperationText");
         var fOpText = opText.getValue();
         var data = {
               fDataSet:[ { fId:"1", fSet: "----" } ],
               fSelectDataId: "0",
               fMinRange: -4,
               fMaxRange: 4,
               fStep: 0.01,
               fRange: [-4,4],
               func: "gaus"
         };
         this.getView().setModel(new JSONModel(data));
         this._data = data;
      },

      OnWebsocketMsg: function(handle, msg){

         if(msg.indexOf("MODEL:")==0){
            var json = msg.substr(6);
            var data = JSROOT.parse(json);

            if(data) {
               this.getView().setModel(new JSONModel(data));
               this._data = data;
            }
            console.log("Robust" + this.getView().getModel().getData().fRobust);
            console.log("Library " + this.getView().getModel().getData().fLibrary);
         }
         else {
            //this.getView().byId("SampleText").setText("Get message:\n" + msg);
         }
      },

      doFit: function() {
         // console.log("model=", this.getView().getModel().getProperty("/fSelectXYId"), 
         //       this.getView().getModel().getProperty("/fSet"));
         var v1 = this.getView().byId("TypeFunc");
         

         

 
         if (this.websocket)
            this.websocket.Send('DOFIT:'+this.getView().getModel().getJSON());
         
         //if (this.websocket)
         //   this.websocket.Send('Range:'+ v1.getValue());
      },

      onPanelExit: function(){

      },

      fOpTextleLiveChange: function(oEvent) {
          var sfOpText = oEvent.getParameter("value");
          this.byId("selectedOpText").setText(sfOpText);
      },

       onChange: function(oEvent){
         var data = this.getView().getModel().getData();
         var func = oEvent.getParameter("selectedItem").getText();
         console.log("func " + func);
         data.func1 = func;

         this.getView().getModel().refresh();
         console.log(data.func1);
       },

      selectRB: function(){
         
         var data = this.getView().getModel().getData();

         var lib = this.getView().getModel().getData().fLibrary;

         console.log('lib = ', lib);
         
         // same code as initialization
         data.fMethodMin = data.fMethodMinAll[parseInt(lib)];
         
         
         // refresh all UI elements
         this.getView().getModel().refresh();
         console.log(data.fMethodMinAll[parseInt(lib)]);
         
    },

      takeVar: function(){

         var data = this.getView().getModel().getData();

         var v2 = this.getView().byId("Slider");

         var slider = v2.getRange();
         console.log('Slider Range ' + slider);

         data._slider = slider;

         this.getView().getModel().refresh();

         console.log(data._slider);
       },

   });
});