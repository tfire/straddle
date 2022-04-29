import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import ConnectWalletModal from "../components/connectWalletModal";

import {useState} from "react";
import { Flex, Spacer, Stack, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <>
    <Text
              fontWeight="bold"
              mb={-2}
              fontSize="15.5px"
              textAlign="center"
            >
              DELTA NEUTRAL TRADING AS A SERVICE
            </Text>

            <Text textAlign="center">
              Straddle Finance is a web3 hedge fund.
            </Text>

            <Text variant="medium">
              The fund deploys directionally independent yield and farming
              strategies, both on-chain and with institutional CEX accounts.
            </Text>

            <Text variant="medium">
              Liquidity providers to the treasury are rewarded in{" "}
              <b>biweekly USDC dividends</b>, with the following optional
              locking schedule:
            </Text>

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
            <Text variant="medium">
              The dividends a participant receives are calculated like this:{" "}
            </Text>
            <code>
              {" "}
              (Net Share) * (Treasury Returns) * (Staked Amount / Total Staked){" "}
            </code>
            <br></br>
            <p></p>
            <Text variant="medium">
              This schedule is designed to enable the growth of the treasury
              while encouraging long term engagement from reward earners.
            </Text>
            <Text variant="medium">
              The $STRAD token <b>does not have a reflection tax</b>, and has a
              fixed supply at 10,000,000.
            </Text></>
  )
}

export default Home
