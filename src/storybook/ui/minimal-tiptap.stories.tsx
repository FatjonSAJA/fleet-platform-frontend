import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { MinimalTiptap } from "@/components/ui/minimal-tiptap";

const meta: Meta<typeof MinimalTiptap> = {
  title: "UI/MinimalTiptap",
  component: MinimalTiptap,
  tags: ["autodocs"],
  argTypes: {
    editable: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MinimalTiptap>;

export const Default: Story = {
  args: {
    placeholder: "Start typing...",
    editable: true,
  },
};

export const WithInitialContent: Story = {
  args: {
    content:
      "<h1>Welcome to Tiptap</h1><p>This is a <strong>rich text editor</strong> with <em>formatting</em> capabilities.</p><ul><li>Bullet points</li><li>And more!</li></ul>",
    placeholder: "Start typing...",
    editable: true,
  },
};

export const ReadOnly: Story = {
  args: {
    content:
      "<h2>Read-only content</h2><p>This editor is in <strong>read-only mode</strong>. You cannot edit this content.</p>",
    editable: false,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="editor">Description</Label>
      <MinimalTiptap {...args} />
    </div>
  ),
  args: {
    placeholder: "Enter a description...",
    editable: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [content, setContent] = useState(
      "<p>Edit this content and see the HTML output below.</p>",
    );

    return (
      <div className="grid w-full gap-4">
        <div>
          <Label htmlFor="editor">Editor</Label>
          <MinimalTiptap
            content={content}
            onChange={setContent}
            placeholder="Start typing..."
          />
        </div>
        <div>
          <Label>HTML Output</Label>
          <pre className="p-4 bg-muted rounded-lg overflow-auto text-sm">
            <code>{content}</code>
          </pre>
        </div>
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Write your story here...",
    editable: true,
  },
};
