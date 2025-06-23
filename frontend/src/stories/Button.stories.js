import React from 'react';
import { Button } from '../components/UI';
import { Add as AddIcon } from '@mui/icons-material';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'contained',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'contained',
  color: 'secondary',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Add Item',
  startIcon: <AddIcon />,
  variant: 'contained',
  color: 'primary',
}; 