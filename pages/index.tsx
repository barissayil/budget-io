import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { findDOMNode } from 'react-dom';

const spendingList = [
  {
    id: 0,
    date: new Date(),
    amount: 10,
    category: 'food',
  },
  {
    id: 1,
    date: new Date(),
    amount: 5,
    category: 'health',
  },
  {
    id: 2,
    date: new Date(),
    amount: 1000,
    category: 'rent',
  },
];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Budget IO</title>
        <meta name="description" content="Budget information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {
            spendingList.map((spending) => <li key={spending.id}>{`${spending.date.toLocaleDateString()}: ${spending.amount}€ on ${spending.category}`}</li>)
          }
        </ul>
      </main>
    </div>
  )
}

export default Home
