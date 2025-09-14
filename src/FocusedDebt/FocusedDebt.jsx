import {useState, useEffect} from 'react';
import {doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../firebase.js"
import './FocusedDebt.css'

function FocusedDebt() {
    const docRef = doc(db, "funds", "debt");
    const[focusedDebt, setFocusedDebt] = useState(undefined);
    const[submittedDebt, setSubmittedDebt] = useState("");

    //Load the Focused Debt
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFocusedDebt(docSnap.data().focusedDebt);
                } else {
                    await setDoc(docRef, {focusedDebt: ""});
                    setFocusedDebt("");
                }
            } catch (error) {
                console.error("Error fetching focusedDebt: ", error);
            }
        };
        fetchData();
    }, []);

    //Save the focused Debt to localStorage
    useEffect(() => {
        const saveFocusedDebt = async () => {
            try {
                await setDoc(docRef, {focusedDebt: focusedDebt});
            } catch (error) {
                console.error("Error saving focused Debt to Firestore: ", error);
            }
        };
        saveFocusedDebt();
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