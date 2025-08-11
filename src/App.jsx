import { useState, useEffect } from 'react'
import './App.css'
import Spend from "./Spend.jsx";
import FocusedDebt from "./FocusedDebt/FocusedDebt.jsx";
import Fine from "./Fine/Fine.jsx";
import HistoryToggle from "./History/HistoryToggle.jsx"

function App() {
    const[fund, setFund] = useState(() => {
        const saved = localStorage.getItem('studyFund');
        return saved !== null ? Number(saved) : 0;
    });

    // Save fund to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('studyFund', fund);
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
                            {fund.toLocaleString()} VND
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
