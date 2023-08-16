document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // ... Signup code ...
      const username = document.getElementById('signup-username').value;
const email = document.getElementById('signup-email').value;
const phone = document.getElementById('signup-phone').value;
const password = document.getElementById('signup-password').value;
const age = document.getElementById('signup-age').value;
const address = document.getElementById('signup-address').value;

const newUser = {
  username,
  email,
  phone,
  password,
  age,
  address,
};

try {
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

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // ... Login code ...
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