import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Field> = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Username</FieldLabel>
      <FieldContent>
        <Input placeholder="Enter your username" />
        <FieldDescription>This is your public display name.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input placeholder="Enter your email" />
        <FieldError errors={[{ message: "Invalid email address" }]} />
      </FieldContent>
    </Field>
  ),
};

export const CheckboxField: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <Field {...args}>
      <Checkbox />
      <FieldContent>
        <FieldLabel>Accept terms and conditions</FieldLabel>
        <FieldDescription>
          You agree to our Terms of Service and Privacy Policy.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <Switch />
          <FieldContent>
            <FieldLabel>Email Notifications</FieldLabel>
            <FieldDescription>
              Receive emails about your account activity.
            </FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Switch />
          <FieldContent>
            <FieldLabel>SMS Notifications</FieldLabel>
            <FieldDescription>
              Receive SMS messages about your account activity.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
