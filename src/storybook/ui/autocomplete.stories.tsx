import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Autocomplete } from "@/components/ui/autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "UI/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    emptyMessage: { control: "text" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    showSearchIcon: { control: "boolean" },
    debounceMs: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={fruits}
          placeholder="Search fruits..."
        />
      </div>
    );
  },
};

export const WithPreselectedValue: Story = {
  render: (args) => {
    const [value, setValue] = useState("banana");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={fruits}
          placeholder="Search fruits..."
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={[]}
          placeholder="Search fruits..."
          isLoading={true}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={fruits}
          placeholder="Search fruits..."
          disabled={true}
        />
      </div>
    );
  },
};

export const WithoutSearchIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={fruits}
          placeholder="Search fruits..."
          showSearchIcon={false}
        />
      </div>
    );
  },
};

export const NotClearable: Story = {
  render: (args) => {
    const [value, setValue] = useState("apple");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={fruits}
          placeholder="Search fruits..."
          clearable={false}
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={[]}
          placeholder="Search fruits..."
          emptyMessage="No fruits found."
        />
      </div>
    );
  },
};

export const WithAsyncSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(fruits);

    const handleSearch = (query: string) => {
      setIsLoading(true);
      // Simulate async search
      setTimeout(() => {
        const filtered = fruits.filter((fruit) =>
          fruit.label.toLowerCase().includes(query.toLowerCase()),
        );
        setOptions(filtered);
        setIsLoading(false);
      }, 500);
    };

    return (
      <div className="w-[300px]">
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          options={options}
          onSearch={handleSearch}
          placeholder="Search fruits..."
          isLoading={isLoading}
          debounceMs={300}
        />
      </div>
    );
  },
};
