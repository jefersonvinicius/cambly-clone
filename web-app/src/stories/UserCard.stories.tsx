import { Story } from "@storybook/react";
import UserCard, { UserCardProps, UserCardStatuses } from "components/UserCard";
import { createUser } from "./fixtures";

export default {
  component: UserCard,
  title: "Components/UserCard",
};

const Template: Story<UserCardProps> = (args) => <UserCard {...args} />;

export const UserCardOnline = Template.bind({});
UserCardOnline.args = {
  status: UserCardStatuses.Online,
  user: createUser(),
};
