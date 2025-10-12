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
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIQE2YI1X_6odqLB4cEG9KDYO0O3YRwfg",
  authDomain: "wma-loginsignup-project.firebaseapp.com",
  projectId: "wma-loginsignup-project",
  storageBucket: "wma-loginsignup-project.appspot.com",
  messagingSenderId: "484491310617",
  appId: "1:484491310617:web:af7733cd49c7cafc16dc88",
  measurementId: "G-0CMFR093LC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.querySelector('#signup-form input[type="text"]').value.trim();
  const email = document.querySelector('#signup-form input[type="email"]').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirm = document.getElementById('confirm-password').value.trim();

  if (!name || !email || !password || !confirm) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  if (password.length < 6) {
    alert("🔒 Password must be at least 6 characters long!");
    return;
  }

  if (password !== confirm) {
    alert('⚠️ Passwords do not match!');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert(`🎉 Account created successfully! Welcome, ${name}!`);
      console.log("User:", userCredential.user);
      window.location.href = "../loginSignUp/index.html";
    })
    .catch((error) => {
      console.error("Firebase Signup Error:", error);

      let errorMessage = "❌ Something went wrong. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "📧 This email is already registered. Try logging in instead.";
          break;
        case "auth/invalid-email":
          errorMessage = "📩 Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "💪 Password is too weak. Try a stronger one!";
          break;
        case "auth/network-request-failed":
          errorMessage = "🌐 Network error! Please check your internet connection.";
          break;
      }

      alert(errorMessage);
    });
});
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.querySelector('#login-form input[type="email"]').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // 🔹 Field validation
  if (!email || !password) {
    alert("⚠️ Please enter both email and password!");
    return;
  }

  if (password.length < 6) {
    alert("🔐 Password must be at least 6 characters long!");
    return;
  }

  // 🔹 Firebase Login
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('✅ Login successful! Welcome back!');
      console.log("User:", userCredential.user);
      window.location.href = "../studentRegisteretion/index.html";
    })
    .catch((error) => {
      console.error("Firebase Login Error:", error);

      let errorMessage = "❌ Something went wrong. Please try again.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "📧 The email address is not valid. Please check again.";
          break;
        case "auth/user-not-found":
          errorMessage = "🙁 No account found with this email. Please sign up first.";
          break;
        case "auth/wrong-password":
          errorMessage = "🔐 Incorrect password. Try again!";
          break;
        case "auth/too-many-requests":
          errorMessage = "🚫 Too many failed attempts. Please wait a few minutes before trying again.";
          break;
        case "auth/network-request-failed":
          errorMessage = "🌐 Network error! Please check your internet connection.";
          break;
      }

      alert(errorMessage);
    });
});

// Google Authentication
const googleBtn = document.getElementById("googleLogin");
const provider = new firebase.auth.GoogleAuthProvider();
googleBtn.addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("✅ Google Sign-in successful:", user);
      alert("Welcome " + user.displayName + "!");
      window.location.href = "../studentRegisteretion/index.html";
    })
    .catch((error) => {
      console.error("❌ Google Sign-in error:", error);
      alert("Error: " + error.message);
    });
});