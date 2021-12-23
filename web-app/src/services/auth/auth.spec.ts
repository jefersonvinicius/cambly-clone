import { api } from "services/api";
import { createAxiosErrorWith, createAxiosResponseWith } from "utils/tests";
import { AccountNotFoundError, AuthService, InvalidCredentialsError } from ".";

describe("AuthService", () => {
  let axiosPostSpy = jest.spyOn(api, "post").mockImplementation();

  describe("logIn", () => {
    it("should return accessToken and user data when is logged in successfully", async () => {
      axiosPostSpy.mockResolvedValue(successResponseSample());
      const response = await AuthService.logIn(loginPayloadSample());

      expect(axiosPostSpy).toHaveBeenCalledWith("/login", {
        email: "any@gmail.com",
        password: "any",
      });
      expect(response).toMatchObject({
        accessToken: "any",
        user: {
          id: "id",
          name: "Any",
        },
      });
    });

    it("should throws the AccountNotFoundError when response is 404 http status code", async () => {
      axiosPostSpy.mockRejectedValue(notFoundResponse());
      const promise = AuthService.logIn(loginPayloadSample());
      await expect(promise).rejects.toThrow(new AccountNotFoundError());
    });

    it("should throws the InvalidCredentialsError when response is 401 http status code", async () => {
      axiosPostSpy.mockRejectedValue(unauthorizedResponse());
      const promise = AuthService.logIn(loginPayloadSample());
      await expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });

    it("should throw a error when response throw a error", async () => {
      axiosPostSpy.mockRejectedValue(new Error("Any error"));
      const promise = AuthService.logIn(loginPayloadSample());
      await expect(promise).rejects.toThrow(new Error("Any error"));
    });
  });
});

function successResponseSample() {
  return createAxiosResponseWith({
    data: { accessToken: "any", user: { id: "id", name: "Any" } },
  });
}

function notFoundResponse() {
  return createAxiosErrorWith({
    statusCode: 404,
  });
}

function unauthorizedResponse() {
  return createAxiosErrorWith({
    statusCode: 401,
  });
}

function loginPayloadSample() {
  return {
    email: "any@gmail.com",
    password: "any",
  };
}
