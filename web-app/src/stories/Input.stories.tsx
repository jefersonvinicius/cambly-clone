import React from 'react';
import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from '../components/Input';
import { FaEye } from 'react-icons/fa';

export default {
  component: Input,
  title: 'Components/Input',
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Email',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Email',
  placeholder: 'Email',
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  label: 'Email',
  placeholder: 'Email',
  rightIcon: <FaEye />,
};
