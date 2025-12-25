import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { NumberField } from "@/components/forms/shared/NumberField";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof NumberField> = {
  title: "Forms/Base/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: 0,
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
                <div className="w-[300px]">
                  <Story />
                </div>
              </fieldContext.Provider>
            )}
          </form.Field>
        </formContext.Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  args: {
    label: "Age",
    placeholder: "Enter your age",
  },
};

export const MinMax: Story = {
  args: {
    label: "Rating (1-10)",
    placeholder: "Rate us",
    min: 1,
    max: 10,
  },
};
