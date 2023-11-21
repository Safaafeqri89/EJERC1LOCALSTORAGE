// Cuando se carga la página utilizado el defer desde el javascript

  const tweetForm = document.getElementById('tweetForm'); // Formulario para enviar tweets
  const tweetInput = document.getElementById('tweetInput'); // Input del tweet
  const tweetList = document.getElementById('tweetList'); // Lista donde se muestran los tweets

  // funcion Obtener tweets almacenados en el Local Storage o inicializar un array vacío si no hay ninguno
  function almacenStorage() 
  {
    const guardarTweets = JSON.parse(localStorage.getItem('tweets')) || []; 
        return guardarTweets;
  }

  // Guardar tweets en el Local Storage
  function guardarStorage(tweets)
   {
        localStorage.setItem('tweets', JSON.stringify(tweets));
   }

  // Crear botón de eliminación para cada tweet
  function createDeleteButton(tweetId)
  {
        const Borrarbt = document.createElement('button');
      
        Borrarbt.textContent = 'x';
        Borrarbt.classList.add('delete-btn');
        Borrarbt.style.color = 'red';
        Borrarbt.style.marginLeft = '60px';
        Borrarbt.style.marginTop = '5px';
        Borrarbt.dataset.id = tweetId; // Establecer un identificador para el tweet
        return Borrarbt;
  }
  
  // Eliminar un tweet del array, actualizar Local Storage y mostrar la lista actualizada de tweets
  function deleteTweet(tweets, tweetId) 
  {
          tweets = tweets.filter(tweet => tweet.id !== tweetId); // Filtrar el tweet a eliminar
          guardarStorage(tweets); // Guardar los tweets actualizados
         mostrarTweets(tweets); // Mostrar los tweets actualizados
  }
  
  // Mostrar los tweets en la lista
  function mostrarTweets(tweets) 
  {
              tweetList.innerHTML = ''; // Limpiar la lista antes de mostrar los tweets
              
              // Por cada tweet en la lista, crear un elemento <li> con un botón de eliminar
              tweets.forEach(function(tweet) {
                const li = document.createElement('li');
                li.textContent = `${tweet.text} - ${tweet.createdAt}`;

                const Borrarbt= createDeleteButton(tweet.id);
                li.appendChild(Borrarbt);

                tweetList.appendChild(li); // Agregar el tweet a la lista
              });

              // Evento click en la lista para eliminar un tweet al hacer clic en el botón de eliminar
              tweetList.addEventListener('click', function(event) {
                if (event.target.matches('.delete-btn')) {
                  const tweetId = event.target.dataset.id;
                  deleteTweet(tweets, tweetId); // Eliminar el tweet seleccionado
                }
              });
  }
function manejarTweets() // Función para manejar la lógica de los tweets
 {
            let tweets = almacenStorage(); // Obtener tweets almacenados
            mostrarTweets(tweets); // Mostrar los tweets
            // Evento submit del formulario para enviar un nuevo tweet
            tweetForm.addEventListener('submit', function(event)
             {
              event.preventDefault(); // Evitar recargar la página al enviar el formulario
              const tweetText = tweetInput.value.trim();
              if (tweetText !== '') {
                const newTweet = {
                  id: generateUniqueId(), // Generar un ID único para el tweet
                  text: tweetText,
                  createdAt: new Date().toLocaleString()
                };
      tweets.push(newTweet); // Agregar el nuevo tweet al array
      guardarStorage(tweets); // Guardar los tweets actualizados
      tweetInput.value = ''; // Limpiar el campo de texto
      mostrarTweets(tweets); // Mostrar los tweets actualizados
    }
  });
}
  manejarTweets();// Llamar a la función para manejar los tweets
  function generateUniqueId()// Función para generar un ID único para los tweets
 {
  return Math.random().toString();
}
//El guion bajo puede ayudar a identificarlo fácilmente como un ID generado

function limpiarLocalStorage() 
{
  localStorage.clear();
  alert("LocalStorage ha sido limpiado");
}
// Obtener el botón por su ID
const limpiarBtn = document.getElementById('limpiarLocalStorageBtn');

// Agregar un evento al botón para llamar a la función limpiarLocalStorage
limpiarBtn.addEventListener('click', limpiarLocalStorage);





