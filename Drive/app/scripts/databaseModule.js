window.autoBorderSwitcher = window.autoBorderSwitcher || {};
window.autoBorderSwitcher.databaseModule = function(){
    const autoBorderSwitcherAddInId = "an6Ljmw_7WkGN0fcT6TyGew", 
        autoBorderSwitcherMasterTableId = "azJO-XNJvokyuVoFOnXbFTQ"; 
        let getAddInData = function(api, tableId){
            return new Promise(function(resolve,reject){
                console.log("autoBorderSwitcherAddInId:", autoBorderSwitcherAddInId);
                console.log("autoBorderSwitcherMasterTableId:",autoBorderSwitcherMasterTableId);
                api.call("Get", {
                        "typeName": "AddInData",
                        "search": {
                            "addInId": autoBorderSwitcherAddInId,
                            "id": tableId
                        }
                    },function(result){
                        console.log(result);                    
                        if(result.length > 0){
                            resolve(result[0]);
                        }else{
                            resolve(false);
                        }
                    },function(error){
                        console.log("Failed to Get Table: " + tableId + " within AddIn Storage: " + autoBorderSwitcherAddInId);
                        reject(error);                    
                    }
                );
            });
        },
        getUser = function(api, username){
            return new Promise(function(resolve,reject){
                api.call("Get", {
                        "typeName": "User",
                        "search": {
                            "name": username
                        }
                    },function(result){
                        console.log(result);                    
                        if(result){
                            resolve(result[0]);
                        }else{
                            resolve(false);
                        }
                    },function(error){
                        console.log("Failed to Get User Object for " + username);
                        reject(error);                    
                    }
                );
            });
        },
        setUser = function(api, user){
            return new Promise(function(resolve,reject){
                api.call("Set", {
                        "typeName": "User",
                        "entity": user
                    },function(result){
                        resolve(true);
                    },function(error){
                        console.log("Failed to Get User Object for " + user);
                        reject(error);                    
                    }
                );
            });
        };
return{
    getAddInData : getAddInData,
    getUser : getUser,
    setUser : setUser
};
}(); 
