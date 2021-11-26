import Head from 'next/head'
import HomePage from 'components/HomePage'
import ButtonLink from 'components/ButtonLink'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
      <ButtonLink name="Project" link="/project"/>
      <ButtonLink name="Task" link="/todo"/>
      <ButtonLink name="Sign up" link="/signup"/>
      <ButtonLink name="Log in" link="/login"/>
    </div>
  )
}

export default Home
