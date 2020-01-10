window.autoBorderSwitcher = window.autoBorderSwitcher || {};
/**
 * @returns {{initialize: Function, focus: Function, blur: Function}}
 */
geotab.addin.drivetestaddin = function () {
  'use strict';

  // the root container
  let elAddin, 
  switcherButton = document.getElementById('rss-switcherButton'),
  rulesetDataObject, 
  availableRulesets, 
  activeUser, 
  username,
  api,
  htmlEscape = function (str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
  },allRulesets = {
    'None': {
        name: 'No Ruleset (7-day cycle)'
    },

    'None8Day': {
        name: 'No Ruleset (8-day cycle)'
    },

    'America7Day': {
        name: 'USA Property 60-hour/7-day'
    },

    'America7DayBig': {
        name: 'USA Property 60-hour/7-day (16-hour exemption)'
    },

    'America8Day': {
        name: 'USA Property 70-hour/8-day'
    },

    'America8DayBig': {
        name: 'USA Property 70-hour/8-day (16-hour exemption)'
    },

    'AmericaShortHaul': {
        name: 'USA Property Short-haul 60-hour/7-day'
    },

    'AmericaShortHaul8Day': {
        name: 'USA Property Short-haul 70-hour/8-day'
    },

    'America7DayPassenger': {
        name: 'USA Passenger 60-hour/7-day'
    },

    'America8DayPassenger': {
        name: 'USA Passenger 70-hour/8-day'
    },

    'AmericaShortHaulPassenger': {
        name: 'USA Passenger Short-haul 60-hour/7-day'
    },

    'AmericaShortHaulPassenger8Day': {
        name: 'USA Passenger Short-haul 70-hour/8-day'
    },

    'CanadaCycleOne': {
        name: 'Canada 7-Day Cycle 1'
    },

    'CanadaCycleTwo': {
        name: 'Canada 14-Day Cycle 2'
    },

    'CaliforniaProperty': {
        name: 'California Property Intrastate'
    },

    'CaliforniaPassenger': {
        name: 'California Passenger Intrastate'
    },

    'OilTransport7Day': {
        name: 'USA Property 60-hour/7-day 24-hour restart'
    },

    'OilTransport7DayBig': {
        name: 'USA Property 60-hour/7-day 24-hour restart (16-hour exemption)'
    },

    'OilTransport8Day': {
        name: 'USA Property 70-hour/8-day 24-hour restart'
    },

    'OilTransport8DayBig': {
        name: 'USA Property 70-hour/8-day 24-hour restart (16-hour exemption)'
    },

    'OilTransportShortHaul': {
        name: 'USA Property Short-haul 60-hour/7-day 24-hour restart'
    },

    'OilTransportShortHaul8Day': {
        name: 'USA Property Short-haul 70-hour/8-day 24-hour restart'
    },

    'AmericaSalesperson': {
        name: 'Salesperson'
    },

    'OilWell7Day': {
        name: 'USA Oil Well 60-hour/7-day'
    },

    'OilWell7DayBig': {
        name: 'USA Oil Well 60-hour/7-day (16-hour exemption)'
    },

    'OilWell8Day': {
        name: 'USA Oil Well 70-hour/8-day'
    },

    'OilWell8DayBig': {
        name: 'USA Oil Well 70-hour/8-day (16-hour exemption)'
    },

    'AmericaTexas': {
        name: 'USA Texas 70-hour/7-day'
    },

    'AmericaTexasShortHaul': {
        name: 'USA Texas Short-haul 60-hour/7-day'
    },

    'AmericaTexasShortHaul8Day': {
        name: 'USA Texas Short-haul 70-hour/8-day'
    },

    'OilTransportTexas': {
        name: 'USA Texas Oil Transport 70-hour/7-day'
    },

    'OilWellTexas': {
        name: 'USA Texas Oil Well 70-hour/7-day'
    },

    'Florida7Day': {
        name: 'Florida Property 70-hour/7-Day Intrastate'
    },

    'Florida8Day': {
        name: 'Florida Property 80-hour/8-Day Intrastate'
    },

    'FloridaShortHaul7Day': {
        name: 'Florida Property Short-haul 70-hour/7-Day Intrastate'
    },

    'FloridaShortHaul8Day': {
        name: 'Florida Property Short-haul 80-hour/8-Day Intrastate'
    },

    'America7DayNo34h': {
        name: 'USA Property 60-hour/7-day without 34-hour restart'
    },

    'America8DayNo34h': {
        name: 'USA Property 70-hour/8-day without 34-hour restart'
    },

    'AmericaShortHaulNo34h': {
        name: 'USA Property Short-haul 60-hour/7-day without 34-hour restart'
    },

    'AmericaShortHaul8DayNo34h': {
        name: 'USA Property Short-haul 70-hour/8-day without 34-hour restart'
    },

    'BrazilShortHaul': {
        name: 'Brazil Property Short-haul'
    },

    'CarrierExemption': {
        name: 'Carrier Exemption'
    },

    'AmericaNonCdlShortHaul7Day': {
        name: 'Non-CDL short-haul 60-hour/7-day'
    },

    'AmericaNonCdlShortHaul8Day': {
        name: 'Non-CDL short-haul 70-hour/8-day'
    },

    'AmericaNoRestRequirement7Day': {
        name: 'USA Property 60-hour/7-day without Rest Requirement'
    },

    'AmericaNoRestRequirement7DayBig': {
        name: 'USA Property 60-hour/7-day (16-hour exemption) without Rest Requirement'
    },

    'AmericaNoRestRequirement8Day': {
        name: 'USA Property 70-hour/8-day without Rest Requirement'
    },

    'AmericaNoRestRequirement8DayBig': {
        name: 'USA Property 70-hour/8-day (16-hour exemption) without Rest Requirement'
    },

    'OilTransportNoRestRequirement7Day': {
        name: 'USA Oil Transport 60-hour/7-day without Rest Requirement'
    },

    'OilTransportNoRestRequirement7DayBig': {
        name: 'USA Oil Transport 60-hour/7-day (16-hour exemption) without Rest Requirement'
    },

    'OilTransportNoRestRequirement8Day': {
        name: 'USA Oil Transport 70-hour/8-day without Rest Requirement'
    },

    'OilTransportNoRestRequirement8DayBig': {
        name: 'USA Oil Transport 70-hour/8-day (16-hour exemption) without Rest Requirement'
    },

    'OilWellNoRestRequirement7Day': {
        name: 'USA Oil Well 60-hour/7-day without Rest Requirement'
    },

    'OilWellNoRestRequirement7DayBig': {
        name: 'USA Oil Well 60-hour/7-day (16-hour exemption) without Rest Requirement'
    },

    'OilWellNoRestRequirement8Day': {
        name: 'USA Oil Well 70-hour/8-day without Rest Requirement'
    },

    'OilWellNoRestRequirement8DayBig': {
        name: 'USA Oil Well 70-hour/8-day (16-hour exemption) without Rest Requirement'
    }
  };

  let rulesetCheck = function () {
    if (activeUser.hosRuleSet == availableRulesets[0] || activeUser.hosRuleSet == availableRulesets[1]) {
        switcherButton.disabled = false;
        document.getElementById('isStatus').innerHTML = 'Status: Online';
    }
    else {
        switcherButton.disabled = true;
        document.getElementById('isStatus').innerHTML = 'Status: You do not have a compatible ruleset to use this addin.';
        console.log('Incompatibile Ruleset');
        return;
    }
  },
  getActiveUser = async function(){
    //activeUser = await autoBorderSwitcher.databaseModule.getUser(api,username);
    // if(activeUser){
    //   document.getElementById('isRuleset').innerHTML = 'Current Ruleset: ' + htmlEscape(allRulesets[activeUser.hosRuleSet].name);
    // }
    api.call("Get", {
        "typeName": "User",
        "search": {
          "name": username
        }
      },function(result){
        console.log(result);
        activeUser = result[0]; 
        document.getElementById('isRuleset').innerHTML = 'Current Ruleset: ' + htmlEscape(allRulesets[activeUser.hosRuleSet].name);                   
      },function(error){
        console.log("Failed to Get User Object for " + username);
      }
    );
    
  },
  populateRulesetInfo = async function(){
    await getActiveUser();
    // let getAddInDataResult = await autoBorderSwitcher.databaseModule.getAddInData(api, autoBorderSwitcher.databaseModule.autoBorderSwitcherMasterTableId);
    // console.log(getAddInDataResult);
    // if(getAddInDataResult){
    //   rulesetDataObject = JSON.parse(getAddInDataResult.data);
    //   for(let i=0;i < rulesetDataObject.driverRulesets.length;i++){
    //     // console.log(Object.keys(rulesetData.driverRulesets[i])[0]);
    //     if(Object.keys(rulesetDataObject.driverRulesets[i])[0] == activeUser.id){
    //       console.log("Found Compatible Rulesets for this user!");
    //       console.log(rulesetDataObject.driverRulesets[i][activeUser.id]);
  
    //       availableRulesets = rulesetDataObject.driverRulesets[i][activeUser.id];
  
    //       document.getElementById('ruleConfig').innerHTML = 'Compatible Rulesets: ' + htmlEscape(allRulesets[availableRulesets[0]].name) + ', ' + htmlEscape(allRulesets[availableRulesets[1]].name);
    //     }
    //   }
    //   if(!availableRulesets){
    //     document.getElementById('ruleConfig').innerHTML = 'No compatible rulesets available';
    //     switcherButton.disabled = true;
    //   }
    //   console.log(rulesetDataObject);
    //   rulesetCheck();
    // }
    // else{
    //   document.getElementById('ruleConfig').innerHTML = 'No compatible rulesets available';
    //   switcherButton.disabled = true;
    // }
    
  },
  offlineCheck = function (state) {
    console.log(state.online);
    if (!state.online) {
        switcherButton.disabled = true;
        // hide main content
        document.querySelector('#optinDiv').className = 'hidden';
        document.querySelector('#switcherDiv').className = 'hidden';
        document.getElementById('isStatus').innerHTML = 'Status: System is offline, please check back later';
        return true;
    }
    else{
      document.querySelector('#optinDiv').className = 'panel';
      document.querySelector('#switcherDiv').className = '';
      document.getElementById('isStatus').innerHTML = 'Status: Online';
    }
    return false;

  };

  return {
    /**
     * initialize() is called only once when the Add-In is first loaded. Use this function to initialize the
     * Add-In's state such as default values or make API requests (MyGeotab or external) to ensure interface
     * is ready for the user.
     * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
     * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
     * @param {function} initializeCallback - Call this when your initialize route is complete. Since your initialize routine
     *        might be doing asynchronous operations, you must call this method when the Add-In is ready
     *        for display to the user.
     */
    initialize: function (freshApi, freshState, initializeCallback) {
      api = freshApi;
      elAddin = document.querySelector('#autoBorderSwitcher');
      freshApi.getSession(session => {
        username = session.userName;
      });
      offlineCheck(freshState);
      // populateRulesetInfo();
      // MUST call initializeCallback when done any setup
      initializeCallback();
    },

    /**
     * focus() is called whenever the Add-In receives focus.
     *
     * The first time the user clicks on the Add-In menu, initialize() will be called and when completed, focus().
     * focus() will be called again when the Add-In is revisited. Note that focus() will also be called whenever
     * the global state of the MyGeotab application changes, for example, if the user changes the global group
     * filter in the UI.
     *
     * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
     * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
     */
    focus: function (freshApi, freshState) {
       // getting the current user to display in the UI
      freshApi.getSession(session => {
        freshApi.call('Get', {
          typeName: 'Device',
          search: {
            id: freshState.device.id
          }
        }, result => {
          let device = result[0];

          elAddin.querySelector('#autoBorderSwitcher-driver').textContent = session.userName;
          elAddin.querySelector('#autoBorderSwitcher-vehicle').textContent = device.name;
        }, err => {
          console.error(err);
        });
      });
      offlineCheck(freshState);
      populateRulesetInfo();
    },

    /**
     * blur() is called whenever the user navigates away from the Add-In.
     *
     * Use this function to save the page state or commit changes to a data store or release memory.
     *
     * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
     * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
     */
    blur: function () {
      // hide main content
    }
  };
};
