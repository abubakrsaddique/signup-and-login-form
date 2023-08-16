document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const signupUsername = document.getElementById('signup-username').value;
      const signupEmail = document.getElementById('signup-email').value;
      const signupPassword = document.getElementById('signup-password').value;
      const signupConfirmPassword = document.getElementById('signup-confirm-password').value;
      
      if (signupPassword.length < 6) {
        alert('Password should be at least 6 characters long.');
        return;
      }
      
      if (signupPassword !== signupConfirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      try {
        const usersResponse = await fetch('http://localhost:3000/users');
        const users = await usersResponse.json();
        
        const existingUserByUsername = users.find(user => user.username === signupUsername);
        if (existingUserByUsername) {
          alert('Username already exists. Please choose a different username.');
          return;
        }
        
        const existingUserByEmail = users.find(user => user.email === signupEmail);
        if (existingUserByEmail) {
          alert('Email already exists. Please use a different email.');
          return;
        }
        
        const newUser = {
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
        };
        
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
      
        if (response.ok) {
          alert('User registered successfully!');
          signupForm.reset();
        } else {
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    //login code
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const loginCredential = document.getElementById('login-credential').value;
const loginPassword = document.getElementById('login-password').value;

try {
  const response = await fetch('http://localhost:3000/users');
  const users = await response.json();

  const foundUser = users.find(user => {
    return (
      user.username === loginCredential ||
      user.email === loginCredential ||
      user.phone === loginCredential
    );
  });

  if (foundUser && foundUser.password === loginPassword) {
    alert('Login successful!');
    // Clear the login form fields
    document.getElementById('login-credential').value = '';
    document.getElementById('login-password').value = '';
  } else {
    alert('User not found or incorrect password.');
  }
} catch (error) {
  console.error('Error:', error);
}
});
  });