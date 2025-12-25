import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { DatePicker } from "@/components/forms/shared/DatePicker";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/Base/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: undefined,
        },
        onSubmit: async ({ value }) => {
          console.log(value);
        },
      });

      return (
        <formContext.Provider value={form}>
          <form.Field name={"testField" as never}>
            {(field) => (
              <fieldContext.Provider value={field as never}>
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
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date",
  },
};
