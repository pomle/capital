import React from "react";

const Money = ({value}) => {
    return value.toLocaleString();
}

export const Output = ({values, onChange}) => {
    let capital = values.capital;
    const monthlySavings = values.monthlySavings;
    const months = values.years * 12;
    const yearlyAppreciation = values.appreciation;

    const events = [];

    for (let month = 0; month < months; month++) {
        capital += monthlySavings;
        if (month > 0 && month % 12 == 0) {
            const increase = capital * yearlyAppreciation;
            events.push(<span>Month {month}, add {yearlyAppreciation * 100}% (<Money value={increase}/>)</span>);
            capital += increase;
        }
        events.push(<span>Save <Money value={monthlySavings}/>: <Money value={capital}/></span>);
    }

    return <div>
    <ul>
        {events.map((event, index) => {
            return <li>{event}</li>;
        })}
    </ul>
  </div>
}
