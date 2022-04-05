import { Button } from "../styles/components";

export default function Rewards() {

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
  )
}
