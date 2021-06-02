import faker from "faker";
import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from "./login";
import { ValidationStub, AuthenticationSpy } from "@/presentation/test/";

type SutType = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutType => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );
  return {
    sut,
    authenticationSpy,
  };
};

describe("Login Component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId("email-status") as HTMLButtonElement;
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = sut.getByTestId(
      "password-status"
    ) as HTMLButtonElement;
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show email error if  Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
  });
  test("Should show password error if  Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });
  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo");
    expect(emailStatus.textContent).toBe("🟢");
  });
  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo");
    expect(passwordStatus.textContent).toBe("🟢");
  });
  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show load spinner on submit", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: password },
    });
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: email },
    });
    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
