import { Story } from "@storybook/react";
import Button, { ButtonProps } from "components/Button";

export default {
  component: Button,
  title: "Components/Button",
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ButtonWithChildrenAsText = Template.bind({});
ButtonWithChildrenAsText.args = {
  children: "Label",
};
