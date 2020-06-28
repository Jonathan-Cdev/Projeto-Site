let outDB,

    cNome,
    cMatricula,
    cModelo,
    cMarca,
    cMemoria,
    cQuantidade,
    cCapacidade,
    cModeloDaFonte,
    cProcessador,
    cVelocidadeDoProcessador,
    cCadastro,
    db;

const dbName = 'myWeatherDB',
    storeName = 'location';

// function to create database
const createDB = () => {
    if (window.indexedDB) {
        const request = window.indexedDB.open(dbName, 3);

        request.onerror = (event) => {
            console.log('Error request', event);
            outDB.innerHTML = 'Error request';
        }

        request.onsuccess = (event) => {
            db = request.result;
            console.log('Successed request', event, db);
            outDB.innerHTML = 'Successed request';
        }

        request.onupgradeneeded = (event) => {
            outDB.innerHTML = 'Upgraded request';

            //saving the database
            let db = event.target.result;

            //
            let objectStore = db.createObjectStore(storeName, {
                keyPath: 'id',
                autoIncrement: true
            });

            // creating a index it can repeat if we pass the value unique as false
            objectStore.createIndex('lat', 'lat', {
                unique: false
            });

            // creating a second index the objectStore can have more than one
            objectStore.createIndex('log', 'log', {
                unique: false
            });

            console.log('Upgraded request', event)
        }

    } else {
        console.log('You don\'t have support');
        outDB.innerHTML = 'Upgraded request';
    }
}

const addData = (event) => {
    event.preventDefault();

    const transactionAdd = db.transaction([storeName], 'readwrite');
    const objectStore = transactionAdd.objectStore(storeName);

    const newLocation = {
        lat: inputLat.value,
        log: inputLog.value,
        city: inputCity.value
    }

    const request = objectStore.add(newLocation);

    transactionAdd.oncomplete = (event) => {
        console.log('transaction completed', event);
    }

    transactionAdd.onerror = (event) => {
        console.log('transaction failed', event);
    }
}

}
const addData = (event) => {
    event.preventDefault();
    const transactionAdd = db.transaction([storeName], 'readwrite');
    const objectStore = transactionAdd.objectStore(storeName);

    const newLocation = {
        nome = cNome.value,
        matricula = cMatricula.value,
        modelo = cModelo.value,
        marca = cMarca.value,
        memoria = cMemoria.value,
        quantidade = cQuantidade.value,
        capacidade = cCapacidade.value,
        modeloDaFonte = cModeloDaFonte.value,
        processador = cProcessador.value,
        VelocidadeDoProcessador = cVelocidadeDoProcessador.value,
        cadastro = cCadastro.value

    }
    const request = objectStore.add(newLocation);

    transactionAdd.oncomplete = (event) => {
        console.log('transaction completed', event);
    }

    transactionAdd.onerror = (event) => {
        console.log('transaction failed', event);
    }
}


// execute script when the DOM is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    outDB = document.getElementById('output-db');
    cNome = document.getElementById('cNome');
    cMatricula = document.getElementById('cMatricula');
    cModelo = document.getElementById('cModelo');
    cMarca = document.getElementById('cMarca');
    cMemoria = document.getElementById('cMemoria');
    cQuantidade = document.getElementById('cQuantidade');
    cCapacidade = document.getElementById('cCapacidade');
    cModeloDaFonte = document.getElementById('cModeloDaFonte');
    cProcessador = document.getElementById('cProcessador');
    cVelocidadeDoProcessador = document.getElementById('cVelocidadeDoProcessador');
    cCadastro = document.getElementById('cCadastro');

    locationForm.onsubmit = addData;

    createDB();
});