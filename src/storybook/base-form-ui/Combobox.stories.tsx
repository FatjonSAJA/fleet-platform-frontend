import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { Combobox } from "@/components/forms/shared/Combobox";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof Combobox> = {
  title: "Forms/Base/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    searchPlaceholder: { control: "text" },
    emptyMessage: { control: "text" },
    disabled: { control: "boolean" },
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
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const Default: Story = {
  args: {
    label: "Framework",
    values: frameworks,
    placeholder: "Select framework...",
  },
};

export const WithoutSearch: Story = {
  args: {
    label: "Framework",
    values: frameworks,
    placeholder: "Select framework...",
    enableSearch: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Framework",
    values: frameworks,
    placeholder: "Select framework...",
    disabled: true,
  },
};
