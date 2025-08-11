import {useState, useEffect} from 'react'
import "./HistoryToggle.css"

export default function HistoryToggle() {
    const [showHistory, setShowHistory] = useState(false);
    const [spends, setSpends] = useState([]);

    //Load spends from localStorage
    useEffect(() => {
        if (showHistory) {
            const stored = JSON.parse(localStorage.getItem("spends") || "[]");
            //Get last 10 spends
            const last10 = stored.slice(-10).reverse(); //newest first
            setSpends(last10);
        }
    }, [showHistory]);

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