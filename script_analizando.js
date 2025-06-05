var eleccion = localStorage.getItem('eleccion');
// Obtener la referencia al elemento de progreso
var progress = document.querySelector('.progress');
var overlay = document.getElementById('overlay');
var closeBtn = document.querySelector('.close');

// Definir la duración de la carga en milisegundos
var duration = 5000; // 5 segundos

// Definir el intervalo de actualización del progreso
var interval = 50; // 50 milisegundos

// Calcular el incremento de progreso en cada intervalo
var increment = (interval / duration) * 100;

// Inicializar el progreso en 0
var currentProgress = 0;

// Función para actualizar el progreso
function updateProgress() {
  // Incrementar el progreso actual
  if(currentProgress < 100){
    currentProgress += increment;
  }
  else
  {
    currentProgress = 100;
  }
  

  // Actualizar el estilo de la barra de progreso
  progress.style.width = currentProgress + '%';

  // Verificar si el progreso alcanzó el 100%
  if (currentProgress >= 100) {
    // Mostrar la ventana emergente
    overlay.style.display = 'flex';
  }
}

// Asignar el evento click al botón de cerrar
closeBtn.addEventListener('click', function() {
  // Redireccionar a otra página
  window.location.href = 'recomendaciones.html';
});

// Ejecutar la función de actualización de progreso en intervalos
var progressInterval = setInterval(updateProgress, interval);



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
  var humedad_maxRef = database.ref(eleccion + "/humedad_max");
  var humedad_minRef = database.ref(eleccion + "/humedad_min");
  var temperatura_maxRef = database.ref(eleccion + "/temperatura_max");
  var temperatura_minRef = database.ref(eleccion + "/temperatura_min");
  var temperatura_estadoRef = database.ref("sensores/sensor de temperatura");
  var humedad_estadoRef = database.ref("sensores/sensor de humedad");


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
          temperatura_estado.textContent = "la temperatura de tu " + eleccion + " es optima";
        } else if (temperatura < temperatura_min) {
          temperatura_estado.textContent = "la temperatura de tu " + eleccion + " es muy baja! trata de cambiar su ubicacion a un lugar con mas sol";
        } else {
          temperatura_estado.textContent = "la temperatura de tu " + eleccion + " es demasiado alta! prueba cambiar su ubicacion a  en un lugar mas fresco";
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
          humedad_estado.textContent = "tu "+ eleccion +" esta con la cantidad de riego optimo.";
        } else if (humedad < humedad_min) {
          humedad_estado.textContent = "Se detectó humedad baja, deberias regar tu" + eleccion;
        } else {
          humedad_estado.textContent =  "La humedad es muy alta, puedes dejar de regar tu "+ eleccion +", por ahora.";
        }
      });
    });
  });