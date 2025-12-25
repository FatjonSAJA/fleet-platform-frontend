import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
  render: (args) => {
    const id = useId();
    return (
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id={id} />
          <Label htmlFor={id} {...args} />
        </div>
      </div>
    );
  },
};
