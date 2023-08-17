const signupButton = document.getElementById('signup-link');
      const loginButton = document.getElementById('login-link');
  
      signupButton.addEventListener('click', () => {
          signupButton.classList.add('clicked');
          loginButton.classList.remove('clicked');
      });
  
      loginButton.addEventListener('click', () => {
          loginButton.classList.add('clicked');
          signupButton.classList.remove('clicked');
      });
  
      const authForm = document.getElementById('auth-form');
      const authUsername = document.getElementById('auth-username');
      const authEmail = document.getElementById('auth-email');
      const authPassword = document.getElementById('auth-password');
      const authConfirmPassword = document.getElementById('auth-confirm-password');
      const authSubmit = document.getElementById('auth-submit');
      const signupLink = document.getElementById('signup-link');
      const loginLink = document.getElementById('login-link');
  
      const toggleForms = (activeForm) => {
          authForm.classList.remove('active');
          activeForm.classList.add('active');
      };
  
      signupLink.addEventListener('click', () => {
          toggleForms(authForm);
          authEmail.style.display = 'block';
          authConfirmPassword.style.display = 'block';
          authSubmit.textContent = 'Sign Up';
          authUsername.setAttribute('placeholder', 'Username');
          authEmail.setAttribute('placeholder', 'Email');
          authPassword.setAttribute('placeholder', 'Password');
          authConfirmPassword.setAttribute('placeholder', 'Confirm Password');
          authEmail.setAttribute('required', 'required'); 
          authConfirmPassword.setAttribute('required', 'required'); 
      });
  
      loginLink.addEventListener('click', () => {
          toggleForms(authForm);
          authEmail.style.display = 'none';
          authConfirmPassword.style.display = 'none';
          authSubmit.textContent = 'Login';
          authUsername.setAttribute('placeholder', 'Username / Email');
          authEmail.removeAttribute('required'); 
          authConfirmPassword.removeAttribute('required'); 
      });
  
      authForm.addEventListener('submit', async (e) => {
          e.preventDefault();
  
          const username = authUsername.value;
          const email = authEmail.value;
          const password = authPassword.value;
  
          if (!username || !password) {
              alert('Please fill in the required fields.');
              return;
          }
  
          if (authSubmit.textContent === 'Sign Up') {
              const confirmPassword = authConfirmPassword.value;
  
              if (!email || !confirmPassword) {
                  alert('Please fill in the required fields.');
                  return;
              }
  
              if (password !== confirmPassword) {
                  alert('Passwords do not match.');
                  return;
              }
  
              try {
                  const newUser = {
                      username: username,
                      email: email,
                      password: password,
                  };
  
                  const signupResponse = await fetch('http://localhost:3000/users', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newUser),
                  });
  
                  if (signupResponse.ok) {
                      alert('User registered successfully!');
                      authForm.reset();
                  } else {
                      alert('An error occurred. Please try again.');
                  }
              } catch (error) {
                  console.error('Error:', error);
              }
          } else {
              try {
                  const response = await fetch('http://localhost:3000/users'); 
                  const users = await response.json();
  
                  const foundUser = users.find(user => (
                      user.username === username ||
                      user.email === username
                  ));
  
                  if (foundUser && foundUser.password === password) {
                      alert('Login successful!');
                      authForm.reset();
                  } else {
                      alert('User not found or incorrect password.');
                  }
              } catch (error) {
                  console.error('Error:', error);
              }
          }
      });