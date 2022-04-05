import {useState, useEffect} from 'react';

import { Button2 } from "../styles/components";

export default function Staking() {

  const [balance, setBalance] = useState<number>(420.69);
  const [userLocks, setUserLocks] = useState<any>();
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);

const handleTierSelect = (tier) => {
setSelectedTier(tier);
}

const handleAmount = (event) => {
  setSelectedAmount(event);
};

const handleAmountToMax = () => {
  setSelectedAmount(balance);
}

  return (
    <div className="application-view">
    <h1>STAKING</h1>

    <br></br>

    <div className="left-right-parent-container">
      <div className="left-right-container-left">
        <p>Amount: </p>
        <input
          value={selectedAmount}
          onChange={(event) => handleAmount(event)}
          onBlur={(event) => handleAmount(event)}>
        </input>
        <Button2 id="max-button" onClick={handleAmountToMax}>MAX</Button2>
      </div>
      <div className="left-right-container-right">
        <p>Lock Term: </p>
        <div id="straddle-lock-selector-div">
        <button onClick={() => handleTierSelect(0)} className={selectedTier == 0 ? "toggledButton" : "button2"}>0</button>
                <button onClick={() => handleTierSelect(1)} className={selectedTier == 1 ? "toggledButton" : "button2"}>3</button>
                <button onClick={() => handleTierSelect(2)} className={selectedTier == 2 ? "toggledButton" : "button2"}>6</button>
                <button onClick={() => handleTierSelect(3)} className={selectedTier == 3 ? "toggledButton" : "button2"}>9</button>
                <button onClick={() => handleTierSelect(4)} className={selectedTier == 4 ? "toggledButton" : "button2"}>12</button>
          <p>months</p>
          <a>?</a>
        </div>
        <Button2 onClick={() => console.log(selectedTier, selectedAmount)}>CREATE</Button2>
      </div>
    </div>
    <div id="staking-view-available-balance-div" className="left-right-parent-container">
      <div className="left-right-container-left">
        <p>Wallet Balance: {balance} <b>STRAD</b></p>
      </div>
    </div>

    <br></br>
    <br></br>

    <h4>HISTORY</h4>
    <div>
      <p>You have no past or present deposits.</p>
      {/* TODO: want to put a table in here that displays all the user's locks, past and present */}
    </div>
  </div>
  )
}
