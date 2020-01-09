window.autoBorderSwitcher = window.autoBorderSwitcher || {};
window.autoBorderSwitcher.uiModule = function(){
    let populateDriverList = function(driversList){
        console.log("Populating Drivers");
        let table = document.getElementById('driversTable');
        for(let i=0; i<driversList.length;i++){            
            let newRow = document.getElementById('driversTable').insertRow();
            newRow.setAttribute('id', driversList[i].id);
            newRow.setAttribute('class', 'driverNameRow');
            let newCell = newRow.insertCell(0);
            // newCell.setAttribute('id', driversList[i].id);
            newCell.appendChild(document.createTextNode(driversList[i].name));
        }
        document.querySelectorAll('#driversTable tr').forEach(item => {
            item.addEventListener('click', event => {
              _selectDriver(item);
            });
        });
        _checkSubmitButton();
    },
    _selectDriver = function (tableRow){ 
        let newRow = document.getElementById('selectedDriversTable').insertRow();
        newRow.setAttribute('data-driverid', tableRow.id);
        newRow.setAttribute('class', 'driverNameRow');
        let newCell = newRow.insertCell(0);
        newCell.appendChild(document.createTextNode(tableRow.innerText));  
        newRow.addEventListener('click', event => {
            _unselectDriver(newRow);
        });
        tableRow.style.display = "none"; 
        _checkSubmitButton();
    },
    _unselectDriver = function(tableRow){
        document.getElementById(tableRow.getAttribute("data-driverid")).style.display = "";
        tableRow.remove();
        _checkSubmitButton();
    },
    resetDriverLists = function(){
        document.querySelectorAll(".driverNameRow").forEach(e => e.parentNode.removeChild(e));
        populateDriverList(autoBorderSwitcher.allDrivers);
        _checkSubmitButton();
    },
    rulesetCheck = function(checkmarkId){
        let newA = document.getElementById('options_hosRuleSetA').value;
        let newB = document.getElementById('options_hosRuleSetB').value;
        if (newA == newB) {
          console.log("A = B: Disabling");
          document.getElementById(checkmarkId).style.display="none";
        }
        else {
          console.log("A != B: Enabling");
          // save.disabled = true;
          document.getElementById("rulesetACheckmark").style.display="";
          document.getElementById("rulesetBCheckmark").style.display="";
        }
        _checkSubmitButton();
    },
    _checkSubmitButton = function(){
        if(document.querySelectorAll('#selectedDriversTable tr').length == 0 || document.getElementById("rulesetACheckmark").style.display == "none" ||
        document.getElementById("rulesetBCheckmark").style.display == "none"){
            document.getElementById("submitButton").disabled = true;
        }
        else{
            document.getElementById("submitButton").disabled = false;
        }
    }
return{
    populateDriverList : populateDriverList,
    rulesetCheck: rulesetCheck,
    resetDriverLists : resetDriverLists
};
}(); 
