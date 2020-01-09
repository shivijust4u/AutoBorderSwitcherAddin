window.autoBorderSwitcher = window.autoBorderSwitcher || {};
window.autoBorderSwitcher.databaseModule = function(){
    const autoBorderSwitcherAddInId = "an6Ljmw_7WkGN0fcT6TyGew", 
        autoBorderSwitcherMasterTableId = "azJO-XNJvokyuVoFOnXbFTQ",
        _createTable = function(api, tableEntity){
            let createTablePromise = new Promise((resolve, reject) => {
            api.call('Add', {
                    typeName: 'AddInData',
                    entity: tableEntity
                },
                    function (result) {
                    resolve(result);
                },
                    function (error) {
                    reject(error);
                });
            });        
            return createTablePromise;
        },
        // createConfigTable = async function(api){
        //     const   tableEntity = {
        //         "addInId":autoBorderSwitcherAddInId, 
        //         "groups":[{"id": "GroupCompanyId"}]
        //     };
        //     //TODO: Choose Data properties
        //     let data = JSON.stringify({"next":null,"driverRulesets":[],"version":1});
            
        //     tableEntity.data = data;
            
        //     return await _createTable(api, tableEntity);
        // },
        createMasterConfigTable = async function(api, config){
            const   tableEntity = {
                "addInId": autoBorderSwitcherAddInId, 
                "id": autoBorderSwitcherMasterTableId, 
                "groups":[{"id": "GroupCompanyId"}]
            };
            //TODO: Choose Data properties
            let data = JSON.stringify({"next":null,"driverRulesets":config,"version":1});
            
            tableEntity.data = data;
            
            return await _createTable(api, tableEntity);
        }, 
        getTable = function(api, tableId){
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
        updateTable = function(api, entity){
            return new Promise(function(resolve,reject){
                api.call("Set", {
                        "typeName": "AddInData",
                        "entity": entity
                    },function(result){
                        console.log(result);                    
                        if(result == null){
                            resolve(true);
                        }else{
                            resolve(false);
                        }
                    },function(error){
                        console.log("Failed to Update Table: " + entity.id + " within AddIn Storage: " + entity.addInId);
                        reject(error);                    
                    }
                );
            });
        };
return{
    createMasterTable : createMasterConfigTable,
    getTable : getTable,
    updateTable : updateTable
};
}(); 
