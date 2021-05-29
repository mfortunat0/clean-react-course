import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Login from "./login";

type SutType = {
  sut: RenderResult;
};

const makeSut = (): SutType => {
  const sut = render(<Login />);
  return {
    sut,
  };
};

describe("Login Component", () => {
  test("Should start with initial state", () => {
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId("email-status") as HTMLButtonElement;
    expect(emailStatus.title).toBe("Campo obrigatorio");
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = sut.getByTestId(
      "password-status"
    ) as HTMLButtonElement;
    expect(passwordStatus.title).toBe("Campo obrigatorio");
    expect(passwordStatus.textContent).toBe("🔴");
  });
});
