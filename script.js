
const users = [
  { username: 'admin', password: 'password123' },
  { username: 'user', password: 'userpass' }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');


  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
  
    window.location.href = 'home.html';
  } else {
    
    errorMessage.textContent = 'Usuario o clave incorrecta';
  }
});
