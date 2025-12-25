import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { TimePicker } from "@/components/forms/shared/TimePicker";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof TimePicker> = {
  title: "Forms/Base/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: "10:30:00",
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
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    label: "Time",
  },
};
