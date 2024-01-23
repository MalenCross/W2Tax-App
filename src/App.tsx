import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { calculateTotalTax } from "./TaxInfo";
export type FilingStatus = "single" | "married";

export default function App() {
  const [income, setIncome] = useState(0);
  const [retirement, setRetirement] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [credits, setCredits] = useState(0);

  const results = calculateTotalTax(
    income,
    maritalStatus as FilingStatus,
    credits,
    retirement
  );

  return (
    <>
      <h1>W2 Tax Calculator</h1>
      <h2> </h2>
      <form>
        <div>
          <label htmlFor="income">Net Income</label>
          <br />
          <input
            step={5000}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIncome(Number(event.target.value));
              console.log(event.target.value);
            }}
            value={income}
            type="number"
            name="income"
            id="income"
          ></input>
        </div>
        <div>
          <label htmlFor="retirement">Retirement</label>
          <br />
          <input
            type="number"
            name="retirement"
            id="retirement"
            value={retirement}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRetirement(Number(event.target.value));
              console.log(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="maritalStatus">Marital Status</label>
          <br></br>
          <select
            id="maritalStatus"
            aria-label="Default select example"
            value={maritalStatus}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setMaritalStatus(event.target.value);
            }}
          >
            <option>Open this select menu</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        <div>
          <label htmlFor="credits">Credits</label>
          <br />
          <input
            type="number"
            name="credits"
            id="credits"
            value={credits}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCredits(Number(event.target.value));
            }}
          ></input>
        </div>
      </form>
      <div>
        <h2>Results</h2>
        <p>Income Tax : {results.incomeTax}</p>
        <p>FICA Tax :{results.ficaTax} </p>
        <p> Total Tax : {results.totalTax} </p>
        <p>Taxes After Credits : {results.taxAfterCredits} </p>
        <p>Take Home Pay : {results.takeHomePay} </p>
      </div>
    </>
  );
}
