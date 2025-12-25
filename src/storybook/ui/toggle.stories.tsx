import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    "aria-label": "Toggle bold",
    children: <Bold className="h-4 w-4" />,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

export const WithText: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <Italic className="mr-2 h-4 w-4" />
        Italic
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: <Bold className="h-4 w-4" />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: <Bold className="h-4 w-4" />,
  },
};
