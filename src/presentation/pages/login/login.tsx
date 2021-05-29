import React, { useState } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, FormStatus, Input } from "@/presentation/components/";
import Context from "@/presentation/context/form/form-context";

export default function Login() {
  const [state] = useState({
    isLoading: false,
  });
  const [errorState] = useState({
    email: "Campo obrigatorio",
    password: "Campo obrigatorio",
    main: "",
  });

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}
