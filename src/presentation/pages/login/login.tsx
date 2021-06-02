import React, { useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, FormStatus, Input } from "@/presentation/components/";
import Context from "@/presentation/context/form/form-context";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export default function Login({ validation, authentication }: Props) {
  const [state, setState] = useState({
    isLoading: false,
    emailError: "",
    passwordError: "",
    mainError: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (state.isLoading || state.emailError || state.passwordError) {
      return;
    }
    setState({
      ...state,
      isLoading: true,
    });
    await authentication.auth({ email: state.email, password: state.password });
  };

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
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
