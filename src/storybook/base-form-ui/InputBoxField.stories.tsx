import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { InputBoxField } from "@/components/forms/shared/InputBoxField";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof InputBoxField> = {
  title: "Forms/Base/InputBoxField",
  component: InputBoxField,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    type: { control: "text" },
    className: { control: "text" },
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
type Story = StoryObj<typeof InputBoxField>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
  },
};

export const Email: Story = {
  args: {
    placeholder: "Enter email",
    type: "email",
  },
};
export const NumberInput: Story = {
  args: {
    placeholder: "Enter number",
    type: "number",
  },
};

export const FileInput: Story = {
  args: {
    placeholder: "Enter number",
    type: "file",
  },
};

export const ColorInput: Story = {
  args: {
    placeholder: "Enter number",
    type: "color",
  },
};
