import {useState, useEffect} from 'react'
import "./HistoryToggle.css"
import {doc, getDoc} from "firebase/firestore";
import { db } from "../firebase.js"

export default function HistoryToggle() {
    const [showHistory, setShowHistory] = useState(false);
    const [spends, setSpends] = useState([]);

    //Load spends from firestore
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyRef = doc(db, "funds", "history");
                const docSnap = await getDoc(historyRef);

                if(docSnap.exists()) {
                    const data = docSnap.data();
                    const entries = data.entries || [];

                    //Get last 10 spends, newest first
                    const last10 = entries.slice(-10).reverse();
                    setSpends(last10);
                } else {
                    setSpends([])
                }
            } catch (error) {
                console.error("Error fetching history: ", error);
                setSpends([]);
            }
        };
        if(showHistory) {
            fetchHistory();
        }
    }, [showHistory])

    return (
        <div className="history-toggle-container">
            <button
                className="history-toggle-button"
                onClick={() => setShowHistory(!showHistory)}
            >
                History {showHistory ? "▲" : "▼"}
            </button>

            {showHistory && (
                <ul className="history-list">
                    {spends.length==0 && <li>No history yet.</li>}
                    {spends.map((item, index) => (
                        <li key={index} className="history-item">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}