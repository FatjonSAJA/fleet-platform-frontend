import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Rating, RatingButton } from "@/components/ui/rating";

const meta: Meta<typeof Rating> = {
  title: "UI/Rating",
  component: Rating,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return (
      <Rating value={value} onValueChange={setValue} {...args}>
        <RatingButton />
        <RatingButton />
        <RatingButton />
        <RatingButton />
        <RatingButton />
      </Rating>
    );
  },
};

export const ReadOnly: Story = {
  render: (args) => (
    <Rating value={4} readOnly {...args}>
      <RatingButton />
      <RatingButton />
      <RatingButton />
      <RatingButton />
      <RatingButton />
    </Rating>
  ),
};
