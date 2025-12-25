import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { TextArea } from "@/components/forms/shared/TextArea";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof TextArea> = {
  title: "Forms/Base/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    rows: { control: "number" },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          testField: "",
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
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Description",
    rows: 3,
  },
};

export const LongText: Story = {
  args: {
    label: "Bio",
    rows: 6,
  },
};
