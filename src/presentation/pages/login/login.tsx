import React, { useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, FormStatus, Input } from "@/presentation/components/";
import Context from "@/presentation/context/form/form-context";
import { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation: Validation;
};

export default function Login({ validation }: Props) {
  const [state, setState] = useState({
    isLoading: false,
    emailError: "",
    passwordError: "Campo obrigatorio",
    mainError: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
    });
  }, [state.email]);

  useEffect(() => {
    validation.validate("password", state.password);
  }, [state.password]);

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
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
