import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SimpleHeader from "./SimpleHeader"

// The `links` prop should be an array of objects with `link` and `label` properties.
// Each object represents a link to be displayed in the header.
const links = [
  { link: '/', label: 'Home' },
  { link: '/posts', label: 'Posts' },
  { link: '/login', label: 'Login' },
];

const Layout = () => (
  <div>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
