import { api } from "services/api";
import { createAxiosErrorWith, createAxiosResponseWith } from "utils/tests";
import { AccountNotFound, AuthService } from ".";

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

    it("should return AccountNotFound error when response is 404 http status code", async () => {
      axiosPostSpy.mockRejectedValue(notFound());
      const promise = AuthService.logIn(loginPayloadSample());
      await expect(promise).rejects.toThrow(new AccountNotFound());
    });
  });
});

function successResponseSample() {
  return createAxiosResponseWith({
    data: { accessToken: "any", user: { id: "id", name: "Any" } },
  });
}

function notFound() {
  return createAxiosErrorWith({
    statusCode: 404,
  });
}

function loginPayloadSample() {
  return {
    email: "any@gmail.com",
    password: "any",
  };
}
