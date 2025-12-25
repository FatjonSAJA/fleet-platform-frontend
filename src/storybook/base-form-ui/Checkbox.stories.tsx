import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { Checkbox } from "@/components/forms/shared/Checkbox";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Base/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: false,
        },
        onSubmit: async ({ value }) => {
          console.log(value);
        },
      });

      return (
        <formContext.Provider value={form}>
          <form.Field name="testField">
            {(field) => (
              <fieldContext.Provider value={field}>
                <Story />
              </fieldContext.Provider>
            )}
          </form.Field>
        </formContext.Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Subscribe to newsletter",
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: true,
        },
        onSubmit: async ({ value }) => {
          console.log(value);
        },
      });

      return (
        <formContext.Provider value={form}>
          <form.Field name="testField">
            {(field) => (
              <fieldContext.Provider value={field}>
                <Story />
              </fieldContext.Provider>
            )}
          </form.Field>
        </formContext.Provider>
      );
    },
  ],
};
