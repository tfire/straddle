import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import ConnectWalletModal from "../components/connectWalletModal";

import {useState} from "react";

const Home: NextPage = () => {

  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Straddle</title>
        <meta name="description" content="ETH App" />
        <link rel="icon" href="/favicon0.ico" />
      </Head>

      {openModal ? <ConnectWalletModal closeModal={closeModal} openModal={openModal} /> : null}

      <div className="application-view">
        <button onClick={() => setOpenModal(true)}>Connect Wallet</button>

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
    </div>
  )
}

export default Home
