import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "@/components/ui/slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className="w-[60%]"
      {...args}
    />
  ),
};

export const Range: Story = {
  render: (args) => (
    <Slider
      defaultValue={[25, 75]}
      max={100}
      step={1}
      className="w-[60%]"
      {...args}
    />
  ),
};
