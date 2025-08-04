import {useState} from "react";
import './App.css'


function Spend ({fund, setFund}) {
    const[spend, setSpend] = useState(0);
    const[title, setTitle] = useState('');
    const[isSubmitting, setIsSubmitting] =useState(false);

    const handleSpend = (e) => {
        e.preventDefault();

        if(!title.trim() || isNaN(spend) || spend <=0 ) {
            alert("Please enter a valid title and positive amount.");
            return;
        }

        if(spend > fund) {
            alert("Not enough money.");
            return;
        }

        if(isSubmitting) return;

        setIsSubmitting(true);

        setFund(prev => prev - spend);

        //Clear form
        setTitle('');
        setSpend(0);
        setIsSubmitting(false);
    };


    return (
        <div className="spend-box">
            <h2 className="subtitle">🎁 Reward Yourself</h2>
            <form onSubmit={handleSpend} className="spend-form">
                <input
                    type='text'
                    placeholder='Award title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
                <input
                    type='number'
                    placeholder='Amount'
                    value={spend}
                    onChange={(e) => setSpend(e.target.value)}
                    className="form-input"
                    min="0"
                />
                <button type='submit' className="study-button" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Spend