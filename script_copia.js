  var firebase = window.firebase;
  
  const firebaseConfig = {
    apiKey: "AIzaSyDFh33xVgGcskauxGqknWHxcJ_sMDthyGs",
    authDomain: "design-3409a.firebaseapp.com",
    databaseURL: "https://design-3409a-default-rtdb.firebaseio.com",
    projectId: "design-3409a",
    storageBucket: "design-3409a.appspot.com",
    messagingSenderId: "93525909961",
    appId: "1:93525909961:web:b60eac24ba8e4185090818"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

    // Referencia a la base de datos
    var database = firebase.database();

    // Obtener referencia a los datos específicos
    var humedad_maxRef = database.ref("cafeto/humedad_max");
    var humedad_minRef = database.ref("cafeto/humedad_min");
    var temperatura_maxRef = database.ref("cafeto/temperatura_max");
    var temperatura_minRef = database.ref("cafeto/temperatura_min");
    var temperatura_estadoRef = database.ref("sensores/sensor de temperatura");
    var humedad_estadoRef = database.ref("sensores/sensor de humedad");
  
    // Escuchar cambios en los datos y actualizar la página
    humedad_maxRef.on("value", function(snapshot) {
      document.getElementById("humedad_max").textContent = snapshot.val();
    });
  
    humedad_minRef.on("value", function(snapshot) {
      document.getElementById("humedad_min").textContent = snapshot.val();
    });
  
    temperatura_maxRef.on("value", function(snapshot) {
      document.getElementById("temperatura_max").textContent = snapshot.val();  
    });
  
    temperatura_minRef.on("value", function(snapshot) {
      document.getElementById("temperatura_min").textContent = snapshot.val();
    });

    temperatura_estadoRef.on("value", function(snapshot) {
      var temperatura = snapshot.val();
      
      // Obtener referencia a los datos de temperatura máxima y mínima desde la base de datos
    temperatura_maxRef.once("value", function(maxSnapshot) {
        var temperatura_max = maxSnapshot.val();
        
        // Obtener referencia a los datos de temperatura mínima desde la base de datos
        temperatura_minRef.once("value", function(minSnapshot) {
          var temperatura_min = minSnapshot.val();
          
          var temperatura_estado = document.getElementById("temperatura_estado");
      
          if (temperatura >= temperatura_min && temperatura <= temperatura_max) {
            temperatura_estado.textContent = "su temperatura está dentro del rango de valores.";
          } else if (temperatura < temperatura_min) {
            temperatura_estado.textContent = "la temperatura es menor a la mínima.";
          } else {
            temperatura_estado.textContent = "la temperatura es mayor a la máxima.";
          }
        });
      });
    });

    humedad_estadoRef.on("value", function(snapshot) {
      var humedad = snapshot.val();
      
      // Obtener referencia a los datos de humedad máxima y mínima desde la base de datos
      humedad_maxRef.once("value", function(maxSnapshot) {
        var humedad_max = maxSnapshot.val();
        
        // Obtener referencia a los datos de humedad mínima desde la base de datos
        humedad_minRef.once("value", function(minSnapshot) {
          var humedad_min = minSnapshot.val();
          
          var humedad_estado = document.getElementById("humedad_estado");
      
          if (humedad >= humedad_min && humedad <= humedad_max) {
            humedad_estado.textContent = "su humedad está dentro del rango de valores.";
          } else if (humedad < humedad_min) {
            humedad_estado.textContent = "la humedad es menor a la mínima.";
          } else {
            humedad_estado.textContent = "la humedad es mayor a la máxima.";
          }
        });
      });
    });