import {useState, useEffect} from 'react';
import './FocusedDebt.css'

function FocusedDebt() {
    const[focusedDebt, setFocusedDebt] = useState("");
    const[submittedDebt, setSubmittedDebt] = useState("");

    //Load the Focused Debt
    useEffect(() => {
        const storedDebt = localStorage.getItem('focusedDebt');
        if(storedDebt) {
            setFocusedDebt(storedDebt);
        }
    }, []);
    //Save the focused Debt to localStorage
    useEffect(() => {
        localStorage.setItem('focusedDebt', focusedDebt);
    }, [focusedDebt]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!submittedDebt.trim()) {
            alert("Please enter the name of the debt that you are focusing on");
            return;
        }

        setFocusedDebt(submittedDebt.trim());

        setSubmittedDebt("");
    }

    return (
        <>
            <div>
                {/* Warning line */}
                {focusedDebt && (
                    <div className="warning-text">
                        Focusing on paying **{focusedDebt}**
                    </div>
                )}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    {/* tracks what user is typing */}
                    <input
                        type="text"
                        placeholder="The debt that is focusing"
                        value={submittedDebt}
                        onChange={(e) => setSubmittedDebt(e.target.value)}
                        className="form-input"
                    />

                    <button type='submit' className='focused-debt'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default FocusedDebt