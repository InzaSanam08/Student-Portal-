import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDIQE2YI1X_6odqLB4cEG9KDYO0O3YRwfg",
  authDomain: "wma-loginsignup-project.firebaseapp.com",
  projectId: "wma-loginsignup-project",
  storageBucket: "wma-loginsignup-project.appspot.com",
  messagingSenderId: "484491310617",
  appId: "1:484491310617:web:af7733cd49c7cafc16dc88",
  measurementId: "G-0CMFR093LC"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Button
const saveBtn = document.getElementById("saveBtn");
let currentUser = null;

// ✅ Track login user
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("✅ Current User UID:", user.uid);
  } else {
    alert("You must login first!");
    window.location.href = "index.html"; // ← agar yeh page ek folder andar hai
  }
});

// ✅ Save profile

saveBtn.addEventListener("click", async () => {
  const name = document.getElementById("fullName").value;
  const timings = document.getElementById("classTimings").value;
  const campus = document.getElementById("campus").value;
  const teacher = document.getElementById("teacher").value;
  const course = document.getElementById("course").value;

  if (!name || !timings || !campus || !teacher || !course) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  if (!currentUser) {
    alert("User not logged in!");
    return;
  }

  try {
    await setDoc(doc(db, "students", currentUser.uid), {
      name,
      timings,
      campus,
      teacher,
      course,
      email: currentUser.email
    });

    console.log("✅ Data saved successfully to Firestore!");
    alert("✅ Profile Saved Successfully!");
    window.location.href = "portal.html";
  } catch (error) {
    console.error("❌ Error saving profile:", error);
    alert("Error: " + error.message);
  }
});
