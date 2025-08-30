import { useState, useEffect } from 'react'
import './App.css'
import Spend from "./Spend.jsx";
import FocusedDebt from "./FocusedDebt/FocusedDebt.jsx";
import Fine from "./Fine/Fine.jsx";
import HistoryToggle from "./History/HistoryToggle.jsx"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js"

function App() {
    const fundDocRef = doc(db, "funds", "mainFund");

    const [fund, setFund] = useState(undefined);

    // Fetch from Firestore → update fetchFund
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(fundDocRef);
                if (docSnap.exists()) {
                    setFund(docSnap.data().amount);
                } else {
                    await setDoc(fundDocRef, { amount: 0 });
                    setFund(0);
                }
            } catch (error) {
                console.error("Error fetching fund:", error);
            }
        };
        fetchData();
    }, []);

    //Save fund to Firestore whenever it changes
    useEffect(() => {
        const saveFund = async () => {
            try {
                await setDoc(fundDocRef, {amount: fund});
            } catch (error) {
                console.error("Error saving fund to Firestore: ", error);
            }
        };
        saveFund();
    }, [fund]);

    const handClick = () => {
        setFund(prev => prev + 5000);
    }

  return (
      <>
          <div className="app-container">
              <div className="main-box">
                  <div className="fund-box">
                      <h1 className="title">📚 Study Fund</h1>
                      <p className="fund-display">
                          Current Fund:
                          <span className={`fund-amount ${fund < 0 ? 'negative':'positive'}`}>
                            {fund} VND
                          </span>
                      </p>
                      <button className="study-button" onClick={handClick}>I Studied! +5,000</button>
                      <Fine fund={fund} setFund={setFund} />
                  </div>

                  <Spend fund={fund} setFund={setFund} />
                  <FocusedDebt />
              </div>
          </div>

          <HistoryToggle />
      </>
  );
}

export default App
