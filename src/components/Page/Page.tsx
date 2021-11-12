import * as React from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import History from '../History/History';
import './Page.scss';

const Page = (props: any) => {
  return (
    <>
      <Header />
      <section className="wrapper">
        <div className="left-side">
          <Menu />
          <History />
        </div>
        <div className="right-side">

        </div>
      </section>
    </>

  )
}

export default Page;
