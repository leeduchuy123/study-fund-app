import {useState} from 'react'

//change history.jsx to a function
export function saveHistory(spend, title) {
    if (!title || isNaN(spend) || spend <= 0) return;

    const spends = JSON.parse(localStorage.getItem("spends") || "[]");
    const entry = `${title} - ${spend} VNĐ`;

    spends.push(entry);

    // Keep only the last 50 entries
    while(spends.length > 50) {
        spends.shift(); // remove oldest entry (front of array)
    }
    localStorage.setItem("spends", JSON.stringify(spends));
}