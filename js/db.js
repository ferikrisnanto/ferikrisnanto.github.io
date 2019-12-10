var dbPromise = idb.open("perpustakaan", 2, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("buku")) {
      var peopleOS = upgradeDb.createObjectStore("buku", { keyPath: "id" });
      peopleOS.createIndex("name", "name", { unique: false });
    }
});

function saveForLater(article) {
    // dbPromise.get(article)

    dbPromise.then(function(db) {
        var tx = db.transaction('buku', 'readwrite');
        var store = tx.objectStore('buku');
        
        store.put(article); 
        return tx.complete;
        
    }).then(function() {
        console.log('Buku berhasil disimpan.');
    }).catch(function() {
        console.log('Buku gagal disimpan.')
    })
}

function getAllsave() {
    return new Promise(function(resolve, reject) {
        dbPromise.then(function(db) {
            var tx = db.transaction('buku', 'readonly');
            var store = tx.objectStore('buku');
            return store.getAll();

        }).then(function(items) {
            console.log('Data yang diambil: ', items);
            resolve(items);
        });
    });
}

function hapusArtikel(id) {
    dbPromise.then(function(db) {
        let tx = db.transaction('buku', 'readwrite');
        let store = tx.objectStore('buku');
        store.delete(id);
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
        $("#artikel-"+id).remove();
    });
}
  