import { Fragment, ReactChild } from 'react';

import  Header  from './Header';
import  Footer  from './Footer';

function Layout({children} : {children: ReactChild}) {
  return (
    <Fragment>
      <Header />
      <main style={{minHeight: "80vh"}} className="bg-slate-800">{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
