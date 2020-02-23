import React from "react";

export const Input = ({values, onChange}) => {
  const output = (event) => {
    const key = event.target.name;
    const value = parseFloat(event.target.value) || event.target.value;
    onChange({...values, [key]: value});
  }

return <div>
      <form>
          <div>
            <label>Capital</label>
            <input type="number" name="capital" value={values.capital} onChange={output}/>
          </div>
          <div>
            <label>Years</label>
            <input type="number" name="years" value={values.years} onChange={output}/>
          </div>
          <div>
            <label>Monthly savings</label>
            <input type="number" name="monthlySavings" value={values.monthlySavings} onChange={output}/>
          </div>
          <div>
            <label>Appreciation</label>
            <input type="number" name="appreciation" value={values.appreciation} onChange={output}/>
          </div>
      </form>
  </div>
}
