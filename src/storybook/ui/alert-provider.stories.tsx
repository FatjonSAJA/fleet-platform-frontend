import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Heart, Trash2, Zap } from "lucide-react";
import { AlertProvider } from "@/components/ui/alert-provider";
import { Button } from "@/components/ui/button";
import { alert, showAlert } from "@/lib/alert";

const meta: Meta<typeof AlertProvider> = {
  title: "UI/AlertProvider",
  component: AlertProvider,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <AlertProvider />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AlertProvider>;

export const ErrorAlert: Story = {
  render: () => (
    <Button
      onClick={() =>
        alert.error("Error!", "You are not allowed to visit this page")
      }
    >
      Show Error Alert
    </Button>
  ),
};

export const WarningAlert: Story = {
  render: () => (
    <Button
      onClick={() =>
        alert.warning("Uh Oh!", "Something went wrong, but you can continue")
      }
    >
      Show Warning Alert
    </Button>
  ),
};

export const SuccessAlert: Story = {
  render: () => (
    <Button
      onClick={() =>
        alert.success("Success!", "Your changes have been saved successfully")
      }
    >
      Show Success Alert
    </Button>
  ),
};

export const InfoAlert: Story = {
  render: () => (
    <Button
      onClick={() =>
        alert.info("Information", "Here's some useful information for you")
      }
    >
      Show Info Alert
    </Button>
  ),
};

export const TimerAlert: Story = {
  render: () => (
    <Button
      onClick={() =>
        showAlert({
          title: "Auto-closing Alert",
          children: "This alert will close automatically in 3 seconds",
          type: "warning",
          timer: 3000,
        })
      }
    >
      Show Timer Alert (3s)
    </Button>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Button
      onClick={() =>
        showAlert({
          title: "Are you sure?",
          children: "This action cannot be undone",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
          onConfirm: () => {
            alert.success("Deleted!", "The item has been deleted");
          },
          onCancel: () => {
            alert.info("Cancelled", "The item is safe");
          },
        })
      }
    >
      Show Confirmation Dialog
    </Button>
  ),
};

export const CustomButtonClass: Story = {
  render: () => (
    <Button
      onClick={() =>
        showAlert({
          title: "Custom Button",
          children: "This alert has a custom confirm button styling",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "bg-[#DD6B55] hover:bg-[#DD6B55]/90",
          confirmButtonText: "Yes, I am sure!",
          cancelButtonText: "No, cancel it!",
        })
      }
    >
      Show Custom Styled Alert
    </Button>
  ),
};

export const ReactNodeContent: Story = {
  render: () => (
    <Button
      onClick={() =>
        showAlert({
          title: "Rich Content",
          children: (
            <span>
              This is <strong>bold</strong> and this is <em>italic</em>
              <br />
              <br />
              You can use React components!
            </span>
          ),
          type: "info",
        })
      }
    >
      Show Rich Content Alert
    </Button>
  ),
};

export const ConvenienceMethod: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button onClick={() => alert.error("Error!", "Something went wrong")}>
        Error
      </Button>
      <Button
        onClick={() => alert.warning("Warning!", "Please be careful")}
        variant="outline"
      >
        Warning
      </Button>
      <Button
        onClick={() => alert.success("Success!", "Operation completed")}
        variant="outline"
      >
        Success
      </Button>
      <Button
        onClick={() => alert.info("Info", "Here's some information")}
        variant="outline"
      >
        Info
      </Button>
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          showAlert({
            title: "Delete Item",
            children: "This will permanently remove the item",
            icon: Trash2,
            iconColor: "text-red-500",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
          })
        }
        variant="destructive"
      >
        Trash Icon
      </Button>
      <Button
        onClick={() =>
          showAlert({
            title: "New Notification",
            children: "You have 5 new messages",
            icon: Bell,
            iconColor: "text-blue-500",
          })
        }
        variant="outline"
      >
        Bell Icon
      </Button>
      <Button
        onClick={() =>
          showAlert({
            title: "Power Boost!",
            children: "Your account has been upgraded",
            icon: Zap,
            iconColor: "text-yellow-500",
          })
        }
        variant="outline"
      >
        Zap Icon
      </Button>
      <Button
        onClick={() =>
          showAlert({
            title: "Thank You!",
            children: "We appreciate your support",
            icon: Heart,
            iconColor: "text-pink-500",
          })
        }
        variant="outline"
      >
        Heart Icon
      </Button>
    </div>
  ),
};
