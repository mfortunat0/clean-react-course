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

const simulateValidation = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId("submit");
  fireEvent.click(submitButton);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateStatusFormField = (
  sut: RenderResult,
  fieldname: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldname}-status`);
  expect(emailStatus.title).toBe(validationError || "Tudo certo");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
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

    simulateStatusFormField(sut, "email", validationError);
    simulateStatusFormField(sut, "password", validationError);
  });

  test("Should show email error if  Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusFormField(sut, "email", validationError);
  });

  test("Should show password error if  Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusFormField(sut, "password", validationError);
  });

  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusFormField(sut, "email");
  });
  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusFormField(sut, "password");
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
    simulateValidation(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidation(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test("Should call authentication only once", () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidation(sut);
    simulateValidation(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });
});
