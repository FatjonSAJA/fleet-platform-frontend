import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "date", "file"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Email",
  },
};

export const File: Story = {
  args: {
    type: "file",
  },
  render: (args) => {
    const id = useId();
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>Picture</Label>
        <Input id={id} {...args} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled",
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const id = useId();
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>Email</Label>
        <Input id={id} type="email" placeholder="Email" {...args} />
      </div>
    );
  },
};

export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};
