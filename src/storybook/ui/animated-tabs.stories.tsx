import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const meta: Meta<typeof Tabs> = {
  title: "UI/AnimatedTabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContents>
        <TabsContent value="tab1">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                This is the account tab content with smooth animations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab2">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                This is the password tab content with smooth transitions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab3">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your settings here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                This is the settings tab content with animated blur effects.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </TabsContents>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Current tab:</span>
          <code className="px-2 py-1 bg-muted rounded text-sm">
            {activeTab}
          </code>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContents>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    View your dashboard overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Overview content with controlled state management.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>View detailed analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Analytics data and charts would go here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and view reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Report generation and history.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Notification settings and preferences.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Home</TabsTrigger>
        <TabsTrigger value="tab2">Products</TabsTrigger>
        <TabsTrigger value="tab3">Services</TabsTrigger>
        <TabsTrigger value="tab4">About</TabsTrigger>
        <TabsTrigger value="tab5">Contact</TabsTrigger>
        <TabsTrigger value="tab6">Blog</TabsTrigger>
      </TabsList>
      <TabsContents>
        <TabsContent value="tab1">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Home</h3>
            <p className="text-sm text-muted-foreground">
              Welcome to the home page with smooth sliding animations.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Products</h3>
            <p className="text-sm text-muted-foreground">
              Browse our product catalog.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Services</h3>
            <p className="text-sm text-muted-foreground">
              Explore our services and offerings.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground">
              Learn more about our company.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab5">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Get in touch with us.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Blog</h3>
            <p className="text-sm text-muted-foreground">
              Read our latest articles and updates.
            </p>
          </div>
        </TabsContent>
      </TabsContents>
    </Tabs>
  ),
};

export const CustomTransition: Story = {
  render: () => (
    <Tabs defaultValue="fast">
      <TabsList
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 40,
        }}
      >
        <TabsTrigger value="fast">Fast</TabsTrigger>
        <TabsTrigger value="smooth">Smooth</TabsTrigger>
        <TabsTrigger value="bouncy">Bouncy</TabsTrigger>
      </TabsList>
      <TabsContents
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        <TabsContent value="fast">
          <Card>
            <CardHeader>
              <CardTitle>Fast Transition</CardTitle>
              <CardDescription>Quick and snappy animations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This tab uses custom spring transitions for a faster feel.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="smooth">
          <Card>
            <CardHeader>
              <CardTitle>Smooth Transition</CardTitle>
              <CardDescription>Silky smooth animations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This tab demonstrates smooth, fluid transitions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bouncy">
          <Card>
            <CardHeader>
              <CardTitle>Bouncy Transition</CardTitle>
              <CardDescription>Playful bouncy animations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This tab has a more playful, bouncy animation style.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </TabsContents>
    </Tabs>
  ),
};

export const SimpleContent: Story = {
  render: () => (
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContents>
        <TabsContent value="one">
          <div className="p-6 border rounded-lg bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <h3 className="text-lg font-semibold mb-2">Tab One</h3>
            <p className="text-sm">Simple content with gradient background.</p>
          </div>
        </TabsContent>
        <TabsContent value="two">
          <div className="p-6 border rounded-lg bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <h3 className="text-lg font-semibold mb-2">Tab Two</h3>
            <p className="text-sm">Notice the smooth blur transition effect.</p>
          </div>
        </TabsContent>
        <TabsContent value="three">
          <div className="p-6 border rounded-lg bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <h3 className="text-lg font-semibold mb-2">Tab Three</h3>
            <p className="text-sm">
              Each tab slides in with motion animations.
            </p>
          </div>
        </TabsContent>
      </TabsContents>
    </Tabs>
  ),
};
