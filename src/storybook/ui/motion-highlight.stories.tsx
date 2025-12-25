import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  MotionHighlight,
  MotionHighlightItem,
} from "@/components/ui/motion-highlight";

const meta: Meta<typeof MotionHighlight> = {
  title: "UI/MotionHighlight",
  component: MotionHighlight,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["children", "parent"],
    },
    hover: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MotionHighlight>;

export const ChildrenMode: Story = {
  args: {
    mode: "children",
    hover: true,
    className: "rounded-md",
  },
  render: (args) => (
    <div className="flex gap-2 p-4">
      <MotionHighlight {...args}>
        <div className="px-4 py-2 cursor-pointer">Item 1</div>
        <div className="px-4 py-2 cursor-pointer">Item 2</div>
        <div className="px-4 py-2 cursor-pointer">Item 3</div>
      </MotionHighlight>
    </div>
  ),
};

export const ParentMode: Story = {
  args: {
    mode: "parent",
    hover: true,
    className: "rounded-md",
  },
  render: (args) => (
    <div className="flex gap-2 p-4">
      <MotionHighlight {...args}>
        <MotionHighlightItem className="px-4 py-2 cursor-pointer">
          <div>Item 1</div>
        </MotionHighlightItem>
        <MotionHighlightItem className="px-4 py-2 cursor-pointer">
          <div>Item 2</div>
        </MotionHighlightItem>
        <MotionHighlightItem className="px-4 py-2 cursor-pointer">
          <div>Item 3</div>
        </MotionHighlightItem>
      </MotionHighlight>
    </div>
  ),
};

export const WithClickSelection: Story = {
  args: {
    mode: "children",
    hover: false,
    className: "rounded-md",
    defaultValue: "item-2",
  },
  render: (args) => (
    <div className="flex gap-2 p-4 border rounded-lg">
      <MotionHighlight {...args}>
        <div data-value="item-1" className="px-4 py-2 cursor-pointer">
          Item 1
        </div>
        <div data-value="item-2" className="px-4 py-2 cursor-pointer">
          Item 2
        </div>
        <div data-value="item-3" className="px-4 py-2 cursor-pointer">
          Item 3
        </div>
      </MotionHighlight>
    </div>
  ),
};
