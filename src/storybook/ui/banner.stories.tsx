import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/banner";

const meta: Meta<typeof Banner> = {
  title: "UI/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    visible: {
      control: "boolean",
    },
    inset: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: (args) => (
    <Banner {...args}>
      <BannerIcon icon={Info} />
      <BannerTitle>This is a default banner message.</BannerTitle>
      <BannerClose />
    </Banner>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Banner {...args}>
      <BannerIcon icon={AlertTriangle} />
      <BannerTitle>This is a warning banner with an action button.</BannerTitle>
      <BannerAction>Fix Issue</BannerAction>
      <BannerClose />
    </Banner>
  ),
};

export const Success: Story = {
  render: (args) => (
    <Banner {...args} className="bg-green-600 text-white">
      <BannerIcon icon={CheckCircle} className="bg-white/20 text-white" />
      <BannerTitle>Operation completed successfully.</BannerTitle>
      <BannerClose className="hover:bg-white/20 hover:text-white" />
    </Banner>
  ),
};

export const Inset: Story = {
  args: {
    inset: true,
  },
  render: (args) => (
    <div className="p-4 border rounded-lg">
      <Banner {...args}>
        <BannerIcon icon={Info} />
        <BannerTitle>This is an inset banner inside a container.</BannerTitle>
        <BannerClose />
      </Banner>
      <div className="mt-4">
        <p>Some content below the banner.</p>
      </div>
    </div>
  ),
};
