import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A smart Input component with password visibility toggle and clearable functionality.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "number", "email"],
      description: "The type of input field",
    },
    clearable: {
      control: { type: "boolean" },
      description: "Whether the input can be cleared with an X button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Text Input Stories
export const Text: Story = {
  args: {
    placeholder: "Enter text here",
    type: "text",
  },
};

export const TextClearable: Story = {
  args: {
    placeholder: "Enter text here",
    type: "text",
    clearable: true,
    defaultValue: "Sample text",
  },
};

// Password Input Stories
export const Password: Story = {
  args: {
    placeholder: "Enter your password",
    type: "password",
  },
};

export const PasswordClearable: Story = {
  args: {
    placeholder: "Enter your password",
    type: "password",
    clearable: true,
    defaultValue: "password123",
  },
};

// Number Input Stories
export const Number: Story = {
  args: {
    placeholder: "Enter a number",
    type: "number",
  },
};

export const NumberClearable: Story = {
  args: {
    placeholder: "Enter a number",
    type: "number",
    clearable: true,
    defaultValue: "42",
  },
};

// Email Input Stories
export const Email: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
  },
};

export const EmailClearable: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
    clearable: true,
    defaultValue: "user@example.com",
  },
};

// Disabled States
export const Disabled: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
    defaultValue: "Cannot edit this",
  },
};

export const DisabledPassword: Story = {
  args: {
    placeholder: "This password field is disabled",
    type: "password",
    disabled: true,
    defaultValue: "password123",
  },
};
