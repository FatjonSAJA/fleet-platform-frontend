import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectSeparator,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => (
    <MultiSelect>
      <MultiSelectTrigger className="w-[250px]">
        <MultiSelectValue placeholder="Select frameworks" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup heading="Frameworks">
          <MultiSelectItem value="react">React</MultiSelectItem>
          <MultiSelectItem value="angular">Angular</MultiSelectItem>
          <MultiSelectItem value="vue">Vue</MultiSelectItem>
          <MultiSelectItem value="svelte">Svelte</MultiSelectItem>
          <MultiSelectItem value="ember">Ember</MultiSelectItem>
        </MultiSelectGroup>
        <MultiSelectSeparator />
        <MultiSelectGroup heading="Others">
          <MultiSelectItem value="jquery">jQuery</MultiSelectItem>
          <MultiSelectItem value="backbone">Backbone</MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  ),
};

export const WithPreselectedValues: Story = {
  render: () => (
    <MultiSelect defaultValues={["react", "vue"]}>
      <MultiSelectTrigger className="w-[250px]">
        <MultiSelectValue placeholder="Select frameworks" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup heading="Frameworks">
          <MultiSelectItem value="react">React</MultiSelectItem>
          <MultiSelectItem value="angular">Angular</MultiSelectItem>
          <MultiSelectItem value="vue">Vue</MultiSelectItem>
          <MultiSelectItem value="svelte">Svelte</MultiSelectItem>
          <MultiSelectItem value="ember">Ember</MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  ),
};
