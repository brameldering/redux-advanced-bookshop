import MainHeader from "./MainHeader";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const isUpdating = props.isUpdating;
  console.log("--- Layout ---");
  console.log("isUpdating: " + isUpdating);

  return (
    <div className={`${classes.cursorsetting} ${isUpdating && classes.wait}`}>
      <MainHeader />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
