import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebase.js"

//change history.jsx to a function
export async function saveHistory(spend, title) {
    const history = doc(db, "funds", "history");

    if (!title || isNaN(spend) || spend <= 0) return;

    const entry = `${title} - ${spend} VNĐ`;

    try {
        await updateDoc(history, {entries: arrayUnion(entry)});
    } catch (error) {
        console.error("Error saving history to Firestore: ", error);
    }
}