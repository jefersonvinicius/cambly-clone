import { act, fireEvent, render } from "@testing-library/react";
import { User } from "models/User";
import UserCard, { UserCardProps, UserCardStatuses } from ".";

const user = new User({
  name: "Jeferson",
  email: "jeferson@gmail.com",
  bio: "An great tutor",
  image: "any_image.png",
});

const userWithoutImage = new User({
  name: "Jeferson",
  email: "jeferson@gmail.com",
});

describe("UserCard", () => {
  it("should display the user name", () => {
    const { getByText } = createSut({ user });
    expect(getByText("Jeferson")).toBeInTheDocument();
  });

  it("should display image when available", () => {
    const { elements } = createSut({ user });
    expect(elements.image.src).toMatch(/any_image.png/);
    expect(elements.image.alt).toBe("Avatar do Jeferson");
  });

  it("should display placeholder when image is unavailable", () => {
    const { elements } = createSut({ user: userWithoutImage });
    expect(elements.image.src).toMatch(/assets\/placeholder-avatar.png/);
  });

  it("should display bio text when available", () => {
    const { getByText } = createSut({ user });
    expect(getByText(/an great tutor/i)).toBeInTheDocument();
  });

  it("should display call button and online indicator only when the status is online", () => {
    const { elements, routines } = createSut();
    expect(elements.onlineIndicator()).not.toBeInTheDocument();
    expect(elements.callButton()).not.toBeInTheDocument();
    routines.rerenderToOnlineStatus();
    expect(elements.onlineIndicator()).toBeInTheDocument();
    expect(elements.callButton()).toBeInTheDocument();
  });

  it("should calls correct event as click on buttons", () => {
    const { elements, routines, spies } = createSut({
      status: UserCardStatuses.Online,
    });

    routines.clickOn(elements.callButton()!);
    expect(spies.onCallClickSpy).toHaveBeenCalledTimes(1);

    routines.clickOn(elements.profileButton());
    expect(spies.onProfileClickSpy).toHaveBeenCalledTimes(1);
  });
});

function createSut(props?: Partial<UserCardProps>) {
  const onCallClickSpy = jest.fn();
  const onProfileClickSpy = jest.fn();

  const defaultProps = {
    onCallClick: onCallClickSpy,
    onProfileClick: onProfileClickSpy,
    status: UserCardStatuses.Offline,
    user: user,
  };

  const utils = render(<UserCard {...defaultProps} {...props} />);

  const image = utils.getByTestId("user-image") as HTMLImageElement;
  const onlineIndicator = () => utils.queryByTestId("online-indicator");
  const callButton = () => utils.queryByTestId("call-button");
  const profileButton = () => utils.getByTestId("profile-button");

  const elements = { image, onlineIndicator, callButton, profileButton };
  const routines = {
    rerenderToOnlineStatus,
    clickOn,
  };

  const spies = {
    onCallClickSpy,
    onProfileClickSpy,
  };

  return { elements, routines, spies, ...utils };

  function rerenderToOnlineStatus() {
    utils.rerender(
      <UserCard {...defaultProps} {...props} status={UserCardStatuses.Online} />
    );
  }

  function clickOn(element: HTMLElement) {
    act(() => {
      fireEvent.click(element);
    });
  }
}
