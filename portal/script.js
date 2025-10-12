// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIQE2YI1X_6odqLB4cEG9KDYO0O3YRwfg",
  authDomain: "wma-loginsignup-project.firebaseapp.com",
  projectId: "wma-loginsignup-project",
  storageBucket: "wma-loginsignup-project.appspot.com",
  messagingSenderId: "484491310617",
  appId: "1:484491310617:web:af7733cd49c7cafc16dc88"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const body = document.querySelector('body');
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector(".toggle");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");
const logoutBtn = document.getElementById('logout-btn');
const editProfileBtn = document.getElementById('edit-profile-btn');

// Sidebar Toggle
if (toggle) {
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });
}

if (modeSwitch) {
  modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      modeText.innerText = "Light mode";
    } else {
      modeText.innerText = "Dark mode";
    }
  });
}

// Edit Profile
if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    alert("Edit profile functionality - would redirect to registration page");
  });
}

// Logout Function
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      auth.signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "../loginSignUp/index.html";
      }).catch((error) => {
        console.error("Logout error:", error);
        alert("Error logging out: " + error.message);
      });
    }
  });
}

// Formatting Functions
function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatTimings(timings) {
  const timingsMap = {
    morning: "Morning (9:00 AM - 11:00 AM)",
    afternoon: "Afternoon (11:00 AM - 1:00 PM)",
    evening: "Evening (6:00 PM - 8:00 PM)",
  };
  return timingsMap[timings] || timings || "Not set";
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function loadUserData(userId) {
  console.log("Loading data for user:", userId);

  db.collection("students").doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        console.log("User data found:", userData);
        updateDashboard(userData);
      } else {
        console.log("No user data found in Firestore");
        updateDashboardWithDefaults();
      }
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
      updateDashboardWithDefaults();
    });
}
function updateDashboard(userData) {
  const firstName = userData.name ? userData.name.split(" ")[0] : "Student";
  document.getElementById('greeting-text').textContent =
    `${getGreeting()}, ${firstName}!`;

  document.getElementById('text-student-name').textContent = userData.name || "Not set";
  document.getElementById('avatar-profile').textContent = getInitials(userData.name);
  document.getElementById('text-course').textContent = userData.course || "Not set";
  document.getElementById('text-course-detail').textContent = userData.course || "Not set";
  document.getElementById('text-teacher').textContent = userData.teacher || "Not set";
  document.getElementById('text-timings').textContent = formatTimings(userData.timings);
  document.getElementById('text-campus').textContent = userData.campus || "Not set";
  document.getElementById('text-email').textContent = userData.email || "Not set";
}

function updateDashboardWithDefaults() {
  const defaultData = {
    name: "Student Name",
    course: "Web & Mobile Application",
    teacher: "Minahil Irfan",
    timings: "morning",
    campus: "Malir Campus",
    email: "student@example.com"
  };
  updateDashboard(defaultData);
}

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.uid, user.email);
    loadUserData(user.uid);

    setTimeout(() => {
      const currentEmail = document.getElementById('text-email').textContent;
      if (currentEmail === "Not set" || currentEmail === "Loading...") {
        document.getElementById('text-email').textContent = user.email;
      }
    }, 1000);

  } else {
    console.log("User is signed out");
    alert("Please login first!");
    window.location.href = "../loginSignUp/index.html";
  }
});
