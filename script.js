  var firebase = window.firebase;
  
  var firebaseConfig = {
    apiKey: "AIzaSyCYagdImJD47b35VGPwkcroCbLXjSjg1cM",
    authDomain: "datos-72b35.firebaseapp.com",
    databaseURL: "https://datos-72b35-default-rtdb.firebaseio.com",
    projectId: "datos-72b35",
    storageBucket: "datos-72b35.appspot.com",
    messagingSenderId: "750890171003",
    appId: "1:750890171003:web:1a638bb03116a4fe9f40de"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

    // Referencia a la base de datos
    var database = firebase.database();

    // Obtener referencia a los datos específicos
    var calidadAireRef = database.ref("proyectofinal/Sensores/Calidad del aire");
    var conductividadRef = database.ref("proyectofinal/Sensores/Conductividad");
    var filtroCalidadAireRef = database.ref("proyectofinal/Sensores/Filtro de calidad del aire");
    var filtroConductividadRef = database.ref("proyectofinal/Sensores/Filtro de conductividad");
  
    // Escuchar cambios en los datos y actualizar la página
    calidadAireRef.on("value", function(snapshot) {
      document.getElementById("calidad-aire").textContent = snapshot.val();
    });
  
    conductividadRef.on("value", function(snapshot) {
      document.getElementById("conductividad").textContent = snapshot.val();
    });
  
    filtroCalidadAireRef.on("value", function(snapshot) {
      document.getElementById("filtro-calidad-aire").textContent = snapshot.val();
    });
  
    filtroConductividadRef.on("value", function(snapshot) {
      document.getElementById("filtro-conductividad").textContent = snapshot.val();
    });