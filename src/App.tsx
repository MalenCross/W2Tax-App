import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { calculateTotalTax } from "./TaxInfo";
export type FilingStatus = "single" | "married";

const lookup: { [key: string]: string } = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

function game(p1: string, p2: string) {
  let p2Lose = lookup[p2];

  if (p1 === p2) return "Tie";
  if (p1 == p2Lose) return "Player 1 Wins";
  else return "Player 2 Wins";
}

export default function App() {
  const [income, setIncome] = useState(Number);
  const [retirement, setRetirement] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [credits, setCredits] = useState(0);
  const [p1, setP1] = useState("rock");
  const [p2, setP2] = useState("rock");

  let gameResults = game(p1, p2);

  const results = calculateTotalTax(
    income,
    maritalStatus as FilingStatus,
    credits,
    retirement
  );

  return (
    <>
    <br />
      <select
        name="p1"
        id="p1"
        value={p1}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setP1(event.target.value);
        }}
      >
        <option value="rock">Rock</option>
        <option value="paper">Paper</option>
        <option value="scissors">Scissors</option>
      </select>
      <span></span>
      <select
        name="p2"
        id="p2"
        value={p2}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setP2(event.target.value);
        }}
      >
        <option value="rock">Rock</option>
        <option value="paper">Paper</option>
        <option value="scissors">Scissors</option>
      </select>

<br />
      <h2> {gameResults}</h2>
      <h1>W2 Tax Calculator</h1>
      <h2> </h2>
      <form>
        <div>
          <label htmlFor="income">Net Income</label>
          <br />
          <input
            type="number"
            placeholder="0"
            step={5000}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIncome(Number(event.target.value));
            }}
            value={income}
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
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Results</h2>
        <p>Income Tax : {!results.incomeTax ? 0 : results.incomeTax}</p>
        <p>FICA Tax :{!results.ficaTax ? 0 : results.ficaTax} </p>
        <p> Total Tax : {results.totalTax} </p>
        <p>Taxes After Credits : {results.taxAfterCredits} </p>
        <p>Take Home Pay : {results.takeHomePay} </p>
      </div>
    </>
  );
}
