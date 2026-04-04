import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const app = initializeApp({
  apiKey: "YOUR_KEY",
  databaseURL: "YOUR_DB_URL"
});

const db = getDatabase(app);

export function sendPose(pose) {
  set(ref(db, "players/p1"), pose);
}

export function listenPose(callback) {
  onValue(ref(db, "players/p1"), (snap) => {
    callback(snap.val());
  });
}
