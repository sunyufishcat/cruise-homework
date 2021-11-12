import * as React from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import './Page.scss';

const Page = (props: any) => {
  return (
    <>
      <Header />
      <section className="wrapper">
        <div className="left-side">
          <Menu />
        </div>
        <div className="right-side">

        </div>
      </section>
    </>

  )
}

export default Page;
