// * GLOABL VARIABLES * \\
var composition = app.project.activeItem;





// * ======== UI CREATION  ========* \\
// todo Makes UI Usable as a dockable panel in AE todo (START)
function myScript(thisObj) {
    function myScript_buildUI(thisObj){
       var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Background Change", undefined, {resizeable:true});
       
// ! ======== UI INSIDE THE PANEL ======== \\

        // ? ======== Dropdown UI ======== ? \\
        var dropdownGroup = myPanel.add("group")
        var dropdownGroupTitle = dropdownGroup.add('statictext', undefined, 'Select Layer')
        var layerDropdown = dropdownGroup.add("dropdownlist", undefined, []);
        layerDropdown.size = [170, 25];




          // todo If selectedLayers.length does not = layerDropdown.length then
          // todo clear dropdown list and add new
      var refreshButton = dropdownGroup.add("button", undefined, "Refresh Layers");
      refreshButton.onClick = function () {
        layerDropdown.removeAll();
        for (var i = 1; i < selectedLayers.length + 1; i++) {
          layerDropdown.add("item", i,) 
          } 
          layerDropdown.selection = 0;
    }
      // todo ===========================================
 

         // ? ================================


       // ? ======== Darken Slider UI ======== ? \\
       var  lightSliderGroup = myPanel.add("group");
       var lightSliderGroupTitle = lightSliderGroup.add('statictext', undefined, 'Brightness Slider')
       var lightSlider = lightSliderGroup.add("slider");
       lightSlider.minvalue = -100;
       lightSlider.maxvalue = 100;
       lightSlider.value = 0;

        var lightSliderText = lightSliderGroup.add("statictext",undefined,"0");
        lightSliderText.preferredSize=[50,20];

        // ? Changes the Brightness and the value slider on user activation
        lightSlider.onChanging = function(){
        var lightSliderValue = Math.ceil(lightSlider.value)
        lightSliderText.text = lightSliderValue;
        sliderValue = lightSliderText.text;
        changeBrightnessValue(layerDropdown.selection.text, Math.ceil(lightSlider.value));
      };
      // ? ================================




       // ? ======== Blur Slider UI ======== ? \\
       var  blurSliderGroup = myPanel.add("group");
       var blurSliderGroupTitle = blurSliderGroup.add('statictext', undefined, 'Blur Slider')
       var blurSlider = blurSliderGroup.add("slider");
       blurSlider.minvalue = 0;
       blurSlider.maxvalue = 100;
       blurSlider.value = 0;

       var blurSliderText = blurSliderGroup.add("statictext",undefined,"0");
       blurSliderText.preferredSize=[50,20];

       // ? Changes the Brightness and the value slider on user activation
       blurSlider.onChanging = function(){
        var blurSliderValue = Math.ceil(blurSlider.value)
        blurSliderText.text = blurSliderValue;
        changeBlurrinessValue(layerDropdown.selection.text, Math.ceil(blurSlider.value))
      };
        // ? ================================



        var effectsGroup = myPanel.add("group")

      // ? ======== Add Effects Button ======== ? \\
      var addEffectsButton = effectsGroup.add("button", undefined, "Add Effects");
      addEffectsButton.onClick = function (){
        addEffects(layerDropdown.selection.text);
      }
      // ? ================================



      // ? ======== Remove Effects Button ======== ? \\
      var removeEffectsButton = effectsGroup.add("button", undefined, "Remove Effects");
      removeEffectsButton.onClick = function (){
        removeEffects(layerDropdown.selection.text);
      }
      // ? ================================


// todo Makes UI Usable as a dockable panel in AE todo (END)
       myPanel.layout.layout(true);
       return myPanel;
    }
    var myScriptPal = myScript_buildUI(thisObj);
    if (myScriptPal != null && myScriptPal instanceof Window){
       myScriptPal.center();
       myScriptPal.show();
    }
 
 // * ================================ \\

}


 // * ======== FUNCTIONS ======== * \\ 
 // ? A Function that adds the effects to a selected layer
 function addEffects(layer) {
    if(!selectedLayers[layer].Effects.property("Gaussian Blur (Legacy)")) { 
    var addBlurEffect = selectedLayers[layer].property("Effects").addProperty("Gaussian Blur (Legacy)");
    }
    if (!selectedLayers[layer].Effects.property("Brightness & Contrast")) {
    var addBrightnessEfect = selectedLayers[layer].property("Effects").addProperty("Brightness & Contrast"); 
  }
}

// ? Function that changes the brightness value of the effects whenever the sliders are changed
function changeBrightnessValue(layer, sliderValue) {
    if(selectedLayers[layer].Effects.property("Brightness & Contrast")) {
    var addBrightness =  selectedLayers[layer].property("Effects").property("Brightness & Contrast").property("Brightness").setValue([sliderValue]);
    } 
} 


// ? Function that changes the blurriness value of the effects whenever the sliders are changed
function changeBlurrinessValue(layer, sliderValue) {
  if(selectedLayers[layer].Effects.property("Gaussian Blur (Legacy)")) {
  var addBlurriness =  selectedLayers[layer].property("Effects").property("Gaussian Blur (Legacy)").property("Blurriness").setValue([sliderValue]);
} 
}

// ? A Function that removes the effects to a selected layer
function removeEffects(layer) {
  if(selectedLayers[layer].Effects.property("Gaussian Blur (Legacy)")) { 
    var removeBlurEffect = selectedLayers[layer].property("Effects").property("Gaussian Blur (Legacy)").remove();
    }
    if (selectedLayers[layer].Effects.property("Brightness & Contrast")) {
      var removeBrightnessEfect = selectedLayers[layer].property("Effects").property("Brightness & Contrast").remove(); 
    }
}

 // * ================================ \\



 // * ======== STARTUPS ======== * \\
 
 if (composition = app.project.activeItem) {
  var selectedLayers = composition.layers;
  myScript(this);
  }

  // * ================================ \\