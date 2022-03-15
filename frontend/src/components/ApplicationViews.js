import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

import { ApplicationViewTile, Button } from "./index";



export class StakingView extends React.Component {
  render() {
    return (
      <div class="application-view">
        <h1>STAKING</h1>

        <br></br>

        <h1>Your locks:</h1>
      </div>
    );
  }
}

export class RewardsView extends React.Component {
  render() {
    return (
      <div class="application-view">
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
      <div class="application-view">
        <h1>
          TREASURY
        </h1>
        <br></br>
        <div class="charts">
          <PieChart
            data={[
              { title: 'One', value: 10, color: '#ffe6e6' },
              { title: 'Two', value: 15, color: '#ccccff' },
              { title: 'Three', value: 20, color: '#e6e6e6' },
            ]}
          />
        </div>
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
        <div class="application-view">
          <h1>DELTA NEUTRAL TRADING AS A SERVICE</h1>
  
          <p>Straddle Finance is a web3 hedge fund.</p>
  
          <p>The fund deploys directionally independent yield and farming strategies, both on-chain and with institutional CEX accounts.</p>
  
          <p>Liquidity providers to the treasury are rewarded in <b>biweekly USDC dividends</b>, with the following optional locking schedule:</p>
  
          <table>
            <tr>
              <th>Lock Term</th>
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
          <p>This schedule is designed to enable the growth of the treasury while encouraging long term engagement from reward earners.</p>
        </div>
      );
    }
  }

export class AboutView extends React.Component {
    render() {
      return (
        <div class="application-view">
          <h1>About the team</h1>
        </div>
      );
    }
  }

