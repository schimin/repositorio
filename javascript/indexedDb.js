const dbName     = 'logisticapedidos';
 const dbStore   = "dblogistica" ;

// CONECTA AO BANCO
    var connectDB = (dbStore, dbName_ = null, resolve, reject) => {
        let id_entrega  = $("#id_boletim").val();
        let dbName;
        if( typeof dbName_ === 'undefined' || dbName_ === null ){
            dbName  = "dbentrega" + id_entrega.toString();
        }else {
            dbName = dbName_;
        }

        console.log('connectDB', dbName, dbName_, dbStore)

        var dbDef = {
                dbName: dbName,
                dbVer: 1,
                dbStore: dbStore,
                dbKeyp: "id_pedido",
                dbIndex: []
            };

        return new Promise((resolve, reject) => {
            
            // Opens a connection to the existing database or creates a new one    
            req = window.indexedDB.open(dbDef.dbName, dbDef.dbVer);
            
            req.onsuccess = (ev) => {
                // Saves an instance of the connection to our custom object        
                dbDef.dbCon = ev.target.result;
                resolve(dbDef);
            }
            req.onupgradeneeded = (event) => {
                // Only fired once per db version, used to initiliaze the db
                dbDef.dbCon     = event.target.result;
                dbDef.dbInit    = 1;
                

                resolve(dbDef);  
            }
            req.onerror = (e) => {
                // Returns error event
                reject(e);
            }
        });
    }
    
    // CRIA O BANCO
    var createDB = (dbDef) => {
        return new Promise((resolve, reject) => {
            // if not called through onupgradeneeded event, return
            if (!dbDef.dbInit) {
                resolve(`[createDB] ${dbDef.dbName}, already initialized`)
            }
            var objectStore = dbDef.dbCon.createObjectStore(dbDef.dbStore, { keyPath: dbDef.dbKeyp });
            
            for (var i in dados_db) {
                objectStore.add(dados_db[i]);
            }
        });
    }

    // ADICIONA VALOR AO BANCO
    var appendDB = (dbDef, newData) => {
        return new Promise((resolve, reject) => {
            // Request a transaction with readwrite
            var trx = dbDef.dbCon.transaction([dbDef.dbStore], "readwrite").objectStore(dbDef.dbStore);
            // Append new objects to store by mapping over the newData array of objects
            
            //newData.map(row => trx.add(row));
            trx.add(newData)

            resolve(`[appendDB] -> ${dbDef.dbStore}, Task finished`);
            
            trx.onerror = (e) => {
                reject(e);
            }
        });
    };

    // BUSCA UM VALOR PELA KEY NO BANCO
    var readDB = (dbDef, key) => {
        return new Promise((resolve, reject) => {
            var trx = dbDef.dbCon.transaction([dbDef.dbStore]).objectStore(dbDef.dbStore);
            trx = trx.get(key);

            trx.onsuccess = (r) => {
                if (r.target.result === undefined) {
                    //reject(`[readDB] ${dbDef.dbStore}, key: ${key} not found`);
                    reject(false);
                } else {
                    resolve(r.target.result);
                }
            }

            trx.onerror = (e) => {
                reject(e);
            }
        });
    }

    // BUSCA TODOS OS VALORES NO BANCO
    var readDBAll = (dbDef) => {
        return new Promise((resolve, reject) => {
            var trx = dbDef.dbCon.transaction([dbDef.dbStore]).objectStore(dbDef.dbStore);
            trx = trx.getAll();

            trx.onsuccess = (r) => {
                if (r.target.result === undefined) {
                    reject(`[readDB] ${dbDef.dbStore}, key: ${key} not found`);
                } else {
                    resolve(r.target.result);
                }
            }

            trx.onerror = (e) => {
                reject(e);
            }
        });
    }
    //https://aakash-pandey.medium.com/understanding-indexeddb-and-creating-our-own-promise-based-api-19c425132d0c

    // ALTERA UM VALOR NO BANCO LOCAL
    var updateDB = (dbDef, key, newData) => {
        return new Promise((resolve, reject) => {
            var trx = dbDef.dbCon.transaction([dbDef.dbStore], "readwrite").objectStore(dbDef.dbStore);
            // Attempt to fetch the object row based on key
            req = trx.get(key);
            req.onsuccess = (r) => {
                // resolve(r.target.result);
                if (r.target.result !== undefined) {
                    // assign a reference of fetched row to data 
                    //data = r.target.result;
                    //console.log('updateDB', data)
                    // Iterate over the keys of newData
                    
                    /*
                    Array.from(Object.keys(newData)).map((i) => {
                    // Update with new data values
                        data[i] = newData[i];
                    });
                    */
                    // Write the changes back to store
                    var upd = trx.put(newData);
                    upd.onsuccess = (e) => {
                        resolve(`[updateDB] ${dbDef.dbName}, updated ${key} `);
                    }
                } else {
                    resolve(`[updateDB] ${dbDef.dbStore}, key: ${key} not found`);
                }
            } 
            trx.onerror = (e) => {
                reject(e);
            }
        });
    }

    // REMOVE UM ITEM DO BANCO
    var delDB = (dbDef, key) => {
        return new Promise((resolve, reject) => {
            var trx = dbDef.dbCon.transaction([dbDef.dbStore], "readwrite").objectStore(dbDef.dbStore);
            req = trx.delete(key);
            console.log(`[delDB] ${dbDef.dbName}, attempted to delete ${key} `);
            // Delete operation returns no confirmation
            req.onsuccess = () => {
                resolve();
            }
            trx.onerror = (e) => {
                reject(e);
            }
        });
    }

    var delDBAll = (dbDef) => {
        return new Promise((resolve, reject) => {
            var trx = dbDef.dbCon.transaction([dbDef.dbStore], "readwrite").objectStore(dbDef.dbStore);
            req = trx.clear();
            console.log(`[delDB] ${dbDef.dbName}, attempted to delete `);
            // Delete operation returns no confirmation
            req.onsuccess = () => {
                resolve();
            }
            trx.onerror = (e) => {
                reject(e);
            }
        });
    }
    
// Usar em combinação com lodash
