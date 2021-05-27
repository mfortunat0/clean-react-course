import React, { memo } from "react";
import Styles from "./login-header-styles.scss";
import Logo from "@/presentation/components/logo/logo";

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <h1>4Dev - Enquetes para programadores</h1>
      <Logo />
    </header>
  );
};

export default memo(LoginHeader);
