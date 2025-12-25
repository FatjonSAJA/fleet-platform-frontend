import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
    },
    showOutsideDays: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date)}
        className="rounded-md border"
      />
    );
  },
};

export const Range: Story = {
  render: (args) => {
    const [date, setDate] = useState<
      | {
          from: Date | undefined;
          to?: Date | undefined;
        }
      | undefined
    >({
      from: new Date(),
      to: addDays(new Date(), 5),
    });
    return (
      <Calendar
        {...args}
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 4),
    ]);
    return (
      <Calendar
        {...args}
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    );
  },
};
