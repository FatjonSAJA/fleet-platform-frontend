import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { AutocompleteField } from "@/components/forms/shared/AutocompleteField";
import type { AutocompleteOption } from "@/components/ui/autocomplete";
import {
  fieldContext,
  formContext,
} from "@/hooks/forms/base/base.form-components";

const meta: Meta<typeof AutocompleteField> = {
  title: "Forms/Base/AutocompleteField",
  component: AutocompleteField,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    emptyMessage: { control: "text" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    showSearchIcon: { control: "boolean" },
    debounceMs: { control: "number" },
    isLoading: { control: "boolean" },
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
type Story = StoryObj<typeof AutocompleteField>;

const countries: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
];

export const Default: Story = {
  args: {
    options: countries,
    placeholder: "Search countries...",
  },
};

export const WithEmptyMessage: Story = {
  args: {
    options: [],
    placeholder: "Search countries...",
    emptyMessage: "No countries found matching your search.",
  },
};

export const Disabled: Story = {
  args: {
    options: countries,
    placeholder: "Search countries...",
    disabled: true,
  },
};

export const NotClearable: Story = {
  args: {
    options: countries,
    placeholder: "Search countries...",
    clearable: false,
  },
};

export const WithoutSearchIcon: Story = {
  args: {
    options: countries,
    placeholder: "Search countries...",
    showSearchIcon: false,
  },
};

export const Loading: Story = {
  args: {
    options: [],
    placeholder: "Search countries...",
    isLoading: true,
  },
};

export const WithAsyncSearch: Story = {
  render: function AsyncSearchStory() {
    const [options, setOptions] = useState<AutocompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = countries.filter((country) =>
          country.label.toLowerCase().includes(query.toLowerCase()),
        );
        setOptions(filtered);
        setIsLoading(false);
      }, 500);
    };

    const form = useForm({
      defaultValues: {
        asyncField: "",
      },
      onSubmit: async ({ value }) => {
        console.log(value);
      },
    });

    return (
      <formContext.Provider value={form}>
        <form.Field name="asyncField">
          {(field) => (
            <fieldContext.Provider value={field}>
              <div className="w-[300px]">
                <AutocompleteField
                  options={options}
                  placeholder="Search countries..."
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  debounceMs={300}
                />
              </div>
            </fieldContext.Provider>
          )}
        </form.Field>
      </formContext.Provider>
    );
  },
};

export const CustomDebounce: Story = {
  args: {
    options: countries,
    placeholder: "Search with 1s debounce...",
    debounceMs: 1000,
  },
};
