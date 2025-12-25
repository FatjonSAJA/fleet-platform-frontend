import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorMessages } from "@/components/forms/shared/ErrorMessages";

const meta: Meta<typeof ErrorMessages> = {
  title: "Forms/Base/ErrorMessages",
  component: ErrorMessages,
  tags: ["autodocs"],
  argTypes: {
    errors: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessages>;

export const Default: Story = {
  args: {
    errors: ["This field is required", "Must be at least 8 characters"],
  },
};

export const SingleError: Story = {
  args: {
    errors: ["Invalid email address"],
  },
};

export const ObjectErrors: Story = {
  args: {
    errors: [{ message: "Password is too weak" }, { message: "Try again" }],
  },
};
