import { Outlet } from "react-router-dom";
import HeaderTest from "../header-test";
import FooterTest from "../footer-test";

function LayoutTest() {
  return (
    <div>
      <HeaderTest />
      <Outlet />
      <FooterTest />
    </div>
  );
}

export default LayoutTest;
