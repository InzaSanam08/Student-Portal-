     // Tab switching functionality
        document.getElementById('login-tab').addEventListener('click', function() {
            showLoginForm();
        });

        document.getElementById('signup-tab').addEventListener('click', function() {
            showSignupForm();
        });

        document.getElementById('go-to-signup').addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });

        document.getElementById('go-to-login').addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });

        function showLoginForm() {
            document.getElementById('login-form').classList.add('active');
            document.getElementById('signup-form').classList.remove('active');
            document.getElementById('login-tab').classList.add('active');
            document.getElementById('signup-tab').classList.remove('active');
        }

        function showSignupForm() {
            document.getElementById('signup-form').classList.add('active');
            document.getElementById('login-form').classList.remove('active');
            document.getElementById('signup-tab').classList.add('active');
            document.getElementById('login-tab').classList.remove('active');
        }

        // Password visibility toggle
        document.querySelectorAll('.password-toggle').forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const inputId = this.id.replace('-toggle', '');
                const input = document.getElementById(inputId);
                const icon = this;
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });

        // Form submission
        document.querySelectorAll('button').forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const form = this.closest('.form');
                
                if (form.id === 'login-form') {
                    alert('Login successful! Redirecting to dashboard...');
                } else {
                    alert('Account created successfully! Please check your email for verification.');
                }
            });
        });