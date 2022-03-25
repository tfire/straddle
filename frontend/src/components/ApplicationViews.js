import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

import { Button, Button2 } from "./index";


export class StakingView extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      balance: 420.69,
      userLocks: undefined,
      selectedTier: 0,
      selectedAmount: 0,
    }

    this.handleTierSelect = this.handleTierSelect.bind(this);
    this.populateInputWithMax = this.setSelectedAmountToMax.bind(this);
    this.state = this.initialState;
  }

  handleTierSelect(tier) {
    this.setState({
      selectedTier: tier,
    });
  }

  setSelectedAmount(event) {
    this.setState({
      selectedAmount: event.currentTarget.value
    });

    console.log("yo");
    console.log(this.state.selectedAmount);
  }

  setSelectedAmountToMax() {
    this.setState({
      selectedAmount: this.state.balance,
    });
  }

  render() {
    return (
      <div className="application-view">
        <h1>STAKING</h1>

        <br></br>

        <div className="left-right-parent-container">
          <div className="left-right-container-left">
            <p>Amount: </p>
            <input 
              value={this.state.selectedAmount} 
              onChange={(event) => this.setSelectedAmount(event)}
              onBlur={(event) => this.setSelectedAmount(event)}>
            </input>
            <Button2 id="max-button" onClick={this.populateInputWithMax}>MAX</Button2>
          </div>
          <div className="left-right-container-right">
            <p>Lock Term: </p>
            <div id="straddle-lock-selector-div">
              <button onClick={() => this.handleTierSelect(0)} className={this.state.selectedTier == 0 ? "toggledButton" : "button2"}>0</button>
              <button onClick={() => this.handleTierSelect(1)} className={this.state.selectedTier == 1 ? "toggledButton" : "button2"}>3</button>
              <button onClick={() => this.handleTierSelect(2)} className={this.state.selectedTier == 2 ? "toggledButton" : "button2"}>6</button>
              <button onClick={() => this.handleTierSelect(3)} className={this.state.selectedTier == 3 ? "toggledButton" : "button2"}>9</button>
              <button onClick={() => this.handleTierSelect(4)} className={this.state.selectedTier == 4 ? "toggledButton" : "button2"}>12</button>
              <p>months</p>
              <a>?</a>
            </div>
            <Button2 onClick={() => console.log(this.term_selected)}>CREATE</Button2>
          </div>
        </div>
        <div id="staking-view-available-balance-div" className="left-right-parent-container">
          <div className="left-right-container-left">
            <p>Wallet Balance: {this.state.balance} <b>STRAD</b></p>
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
    );
  }
}

export class RewardsView extends React.Component {
  render() {
    return (
      <div className="application-view">
        <h1>
          REWARDS
        </h1>
        <br></br>

        <div id="rewards-view-container">
            <div>
                <b>BALANCE</b>
                <p>42,069 USDC</p>
                <Button>Claim</Button>
            </div>
            <div >
                <b>PAST</b>
                <p>42,069 USDC</p>
            </div>
        </div>
      </div>
    );
  }
}

export class TreasuryView extends React.Component {
  render() {
    return (
      <div className="application-view">
        <h1>
          TREASURY
        </h1>
        <br></br>
        <p>Under development... 🔨</p>
        {/* <div className="charts">
          <PieChart
            data={[
              { title: 'One', value: 10, color: '#ffe6e6' },
              { title: 'Two', value: 15, color: '#ccccff' },
              { title: 'Three', value: 20, color: '#e6e6e6' },
            ]}
          />
        </div> */}
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export class HomeView extends React.Component {
    render() {
      return (
        <div className="application-view">
          <h1>DELTA NEUTRAL TRADING AS A SERVICE</h1>
  
          <p>Straddle Finance is a web3 hedge fund.</p>
  
          <p>The fund deploys directionally independent yield and farming strategies, both on-chain and with institutional CEX accounts.</p>
  
          <p>Liquidity providers to the treasury are rewarded in <b>biweekly USDC dividends</b>, with the following optional locking schedule:</p>
  
          <table>
            <tr>
              <th>$STRAD Lock Term</th>
              <th>Base Share</th>
              <th>Boost</th>
              <th>Net Share</th>
            </tr>
            <tr>
              <td>NO LOCK</td>
              <td>50%</td>
              <td>0%</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>3 MONTHS</td>
              <td>50%</td>
              <td>10%</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>6 MONTHS</td>
              <td>50%</td>
              <td>20%</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>9 MONTHS</td>
              <td>50%</td>
              <td>30%</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>12 MONTHS</td>
              <td>50%</td>
              <td>40%</td>
              <td>90%</td>
            </tr>
          </table>
          <br></br>
          <p>The dividends a participant receives are calculated like this: </p>
          <code> (Net Share) * (Treasury Returns) * (Staked Amount / Total Staked) </code>
          <br></br>
          <p></p>
          <p>This schedule is designed to enable the growth of the treasury while encouraging long term engagement from reward earners.</p>
          <p>The $STRAD token <b>does not have a reflection tax</b>, and has a fixed supply at 10,000,000.</p>
        </div>
      );
    }
  }

export class AboutView extends React.Component {
    render() {
      return (
        <div className="application-view">
          <h1>About the team</h1>
        </div>
      );
    }
  }

