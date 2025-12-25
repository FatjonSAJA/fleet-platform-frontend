import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { Slider } from "@/components/forms/shared/Slider";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof Slider> = {
  title: "Forms/Base/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: 50,
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
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: "Volume",
  },
};
