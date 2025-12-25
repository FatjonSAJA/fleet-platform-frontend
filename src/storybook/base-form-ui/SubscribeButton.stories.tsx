import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { SubscribeButton } from "@/components/forms/shared/SubscribeButton";
import { formContext } from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof SubscribeButton> = {
  title: "Forms/Base/SubscribeButton",
  component: SubscribeButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: "",
        },
        onSubmit: async ({ value }) => {
          console.log(value);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
      });

      return (
        <formContext.Provider value={form}>
          <div className="w-[300px]">
            <Story />
          </div>
        </formContext.Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SubscribeButton>;

export const Default: Story = {
  args: {
    label: "Submit",
  },
};

export const Submitting: Story = {
  args: {
    label: "Submitting...",
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: "",
        },
        onSubmit: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        },
      });

      return (
        <formContext.Provider value={form}>
          <div className="w-[300px]">
            <p className="mb-2 text-sm text-gray-500">
              Click to see loading state
            </p>
            <Story />
          </div>
        </formContext.Provider>
      );
    },
  ],
};
