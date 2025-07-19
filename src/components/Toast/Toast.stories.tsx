import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from "./Toast";
import { useState } from "react";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toast notification component that appears at the bottom right with auto-dismiss and smooth transitions.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info"],
      description: "The type of toast notification",
    },
    duration: {
      control: { type: "number" },
      description:
        "Duration in milliseconds before auto-dismiss (0 = no auto-dismiss)",
    },
    showCloseButton: {
      control: { type: "boolean" },
      description: "Whether to show a manual close button",
    },
    title: {
      control: { type: "text" },
      description: "The title/heading of the toast",
    },
    message: {
      control: { type: "text" },
      description: "The main message content",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Toast Stories
export const Success: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "success",
    title: "Success!",
    message: "Your action was completed successfully.",
    duration: 5000,
    showCloseButton: true,
  },
};

export const Error: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "error",
    title: "Error!",
    message: "Something went wrong. Please try again.",
    duration: 5000,
    showCloseButton: true,
  },
};

export const Warning: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "warning",
    title: "Warning!",
    message: "Please review your input before proceeding.",
    duration: 5000,
    showCloseButton: true,
  },
};

export const Info: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "info",
    title: "Information",
    message: "Here is some useful information for you.",
    duration: 5000,
    showCloseButton: true,
  },
};

// Duration Variations
export const ShortDuration: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "success",
    title: "Quick Success",
    message: "This toast will disappear in 2 seconds.",
    duration: 2000,
    showCloseButton: true,
  },
};

export const LongDuration: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "info",
    title: "Long Duration",
    message: "This toast will stay visible for 10 seconds.",
    duration: 10000,
    showCloseButton: true,
  },
};

export const NoAutoDismiss: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "warning",
    title: "Manual Dismiss Only",
    message: "This toast will not auto-dismiss. You must close it manually.",
    duration: 0,
    showCloseButton: true,
  },
};

// Close Button Variations
export const NoCloseButton: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "success",
    title: "Auto-dismiss Only",
    message: "This toast has no close button and will auto-dismiss.",
    duration: 5000,
    showCloseButton: false,
  },
};

// Message Only (No Title)
export const MessageOnly: Story = {
  render: (args) => (
    <div style={{ minHeight: "150px" }}>
      <Toast {...args} />
    </div>
  ),
  args: {
    type: "info",
    message: "This is a simple message without a title.",
    duration: 5000,
    showCloseButton: true,
  },
};

// Interactive Toast Demo
const InteractiveToastDemo = () => {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      type: "success" | "error" | "warning" | "info";
      title: string;
      message: string;
      duration: number;
      showCloseButton: boolean;
    }>
  >([]);

  const addToast = (
    type: "success" | "error" | "warning" | "info",
    duration: number = 5000
  ) => {
    const id = Date.now();
    const newToast = {
      id,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      message: `This is a ${type} notification that will ${
        duration > 0
          ? `auto-dismiss in ${duration / 1000}s`
          : "stay until manually closed"
      }.`,
      duration,
      showCloseButton: true,
    };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addToast("success", 3000)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Success (3s)
        </button>
        <button
          onClick={() => addToast("error", 5000)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Error (5s)
        </button>
        <button
          onClick={() => addToast("warning", 7000)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Warning (7s)
        </button>
        <button
          onClick={() => addToast("info", 0)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Info (Manual)
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Click the buttons above to show different types of toasts. They will
        appear at the bottom right of the screen.
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            showCloseButton={toast.showCloseButton}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: (args) => (
    <div style={{ minHeight: "300px" }}>
      <InteractiveToastDemo {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing different toast types with various durations. Click the buttons to see toasts in action.",
      },
    },
  },
};
