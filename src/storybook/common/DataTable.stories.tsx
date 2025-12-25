import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  Download,
  Filter,
  Mail,
  Phone,
  Plus,
  Settings,
  Star,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { AvatarNameCell } from "@/components/common/DataTable/table-cells/AvatarNameCell";
import { CurrencyCell } from "@/components/common/DataTable/table-cells/CurrencyCell";
import { DateCell } from "@/components/common/DataTable/table-cells/DateCell";
import { DotTextCell } from "@/components/common/DataTable/table-cells/DotTextCell";
import { IconButtonCell } from "@/components/common/DataTable/table-cells/IconButtonCell";
import { IconTextCell } from "@/components/common/DataTable/table-cells/IconTextCell";
import { ImageCell } from "@/components/common/DataTable/table-cells/ImageCell";
import { LinkCell } from "@/components/common/DataTable/table-cells/LinkCell";
import { MultiIconCell } from "@/components/common/DataTable/table-cells/MultiIconCell";
import { StatusBadgeCell } from "@/components/common/DataTable/table-cells/StatusBadgeCell";
import { TruncatedTextCell } from "@/components/common/DataTable/table-cells/TruncatedTextCell";
import { SortableHeader } from "@/components/common/DataTable/table-parts/SortableHeader";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof DataTable> = {
  title: "Common/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: () => <Story />,
      });

      const memoryHistory = createMemoryHistory({
        initialEntries: ["/"],
      });

      const router = createRouter({
        routeTree: rootRoute,
        history: memoryHistory,
      });

      return <RouterProvider router={router} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

interface Customer {
  id: string;
  name: string;
  logo?: string;
  status: "active" | "inactive";
  revenue: number;
  employees: number;
  joinDate: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    status: "inactive",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "pending",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "6",
    name: "David Miller",
    email: "david@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "7",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "8",
    name: "Frank Wilson",
    email: "frank@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: "9",
    name: "Grace Taylor",
    email: "grace@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "10",
    name: "Henry Anderson",
    email: "henry@example.com",
    role: "User",
    status: "pending",
  },
  {
    id: "11",
    name: "Iris Martinez",
    email: "iris@example.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "12",
    name: "Jack Thomas",
    email: "jack@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "13",
    name: "Katie Moore",
    email: "katie@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: "14",
    name: "Liam Jackson",
    email: "liam@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "15",
    name: "Mia White",
    email: "mia@example.com",
    role: "User",
    status: "active",
  },
];

const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corporation",
    status: "active",
    revenue: 125000,
    employees: 450,
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "TechStart Inc",
    status: "active",
    revenue: 89000,
    employees: 120,
    joinDate: "2023-06-20",
  },
  {
    id: "3",
    name: "Global Industries",
    status: "inactive",
    revenue: 250000,
    employees: 1200,
    joinDate: "2022-03-10",
  },
  {
    id: "4",
    name: "Digital Solutions",
    status: "active",
    revenue: 156000,
    employees: 340,
    joinDate: "2023-09-05",
  },
];

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Widget",
    description: "A high-quality widget with advanced features",
    price: 49.99,
    stock: 120,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Basic Gadget",
    description: "An affordable entry-level gadget for everyday use",
    price: 19.99,
    stock: 450,
    category: "Accessories",
  },
  {
    id: "3",
    name: "Pro Tool",
    description:
      "Professional-grade tool designed for expert users and demanding applications",
    price: 299.99,
    stock: 45,
    category: "Tools",
  },
];

const basicColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader column={column}>Role</SortableHeader>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadgeCell
        status={row.original.status}
        variantMap={{
          active: "default",
          inactive: "secondary",
          pending: "outline",
        }}
      />
    ),
  },
];

export const Basic: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      pagination
      pageSize={5}
    />
  ),
};

export const WithSearch: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      searchable
      searchColumn="name"
      searchPlaceholder="Search by name..."
      pagination
      pageSize={5}
    />
  ),
};

const cellShowcaseColumns: ColumnDef<Customer>[] = [
  {
    id: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <ImageCell
        src={row.original.logo}
        alt={row.original.name}
        fallback={<Building2 className="h-5 w-5 text-muted-foreground" />}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Customer</SortableHeader>
    ),
    cell: ({ row }) => (
      <AvatarNameCell
        name={row.original.name}
        subtitle={`${row.original.employees} employees`}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <DotTextCell
        text={row.original.status}
        color={
          row.original.status === "active" ? "bg-green-500" : "bg-gray-400"
        }
      />
    ),
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <SortableHeader column={column}>Revenue</SortableHeader>
    ),
    cell: ({ row }) => <CurrencyCell amount={row.original.revenue} />,
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => <DateCell date={row.original.joinDate} format="long" />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <MultiIconCell
        icons={[
          {
            icon: Star,
            active: true,
            tooltip: "Favorite",
            onClick: () => console.log("Favorite", row.original.id),
          },
          {
            icon: Mail,
            tooltip: "Email",
            onClick: () => console.log("Email", row.original.id),
          },
          {
            icon: Phone,
            tooltip: "Call",
            onClick: () => console.log("Call", row.original.id),
          },
        ]}
      />
    ),
    enableSorting: false,
  },
];

export const AllCellTypes: Story = {
  render: () => (
    <DataTable
      columns={cellShowcaseColumns}
      data={sampleCustomers}
      pagination
      pageSize={5}
    />
  ),
};

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Product</SortableHeader>
    ),
    cell: ({ row }) => (
      <LinkCell
        href={`/products/${row.original.id}`}
        text={row.original.name}
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <TruncatedTextCell text={row.original.description} maxLength={40} />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <SortableHeader column={column}>Price</SortableHeader>
    ),
    cell: ({ row }) => <CurrencyCell amount={row.original.price} />,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <SortableHeader column={column}>Stock</SortableHeader>
    ),
    cell: ({ row }) => (
      <IconTextCell
        icon={row.original.stock > 100 ? Star : UserIcon}
        text={`${row.original.stock} units`}
      />
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    header: "Manage",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <IconButtonCell
          icon={Settings}
          onClick={() => console.log("Edit", row.original.id)}
          label="Edit product"
        />
        <IconButtonCell
          icon={Trash2}
          onClick={() => console.log("Delete", row.original.id)}
          label="Delete product"
          variant="ghost"
          className="text-destructive hover:text-destructive"
        />
      </div>
    ),
    enableSorting: false,
  },
];

export const WithLinks: Story = {
  render: () => (
    <DataTable
      columns={productColumns}
      data={sampleProducts}
      searchable
      searchColumn="name"
      searchPlaceholder="Search products..."
      pagination
      pageSize={5}
    />
  ),
};

export const WithRowClick: Story = {
  render: () => {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div>
        {clicked && (
          <div className="mb-4 rounded-md bg-muted p-4">
            <p className="text-sm">
              Last clicked: <strong>{clicked}</strong>
            </p>
          </div>
        )}
        <DataTable
          columns={basicColumns}
          data={sampleUsers}
          onRowClick={(user) => setClicked(user.name)}
          pagination
          pageSize={5}
        />
      </div>
    );
  },
};

export const CustomPageSizes: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      pagination
      pageSize={2}
      pageSizeOptions={[2, 3, 5, 10]}
      showPageSizeSelector
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={[]}
      searchable
      searchColumn="name"
      emptyMessage="No users found. Try adjusting your search or add a new user."
    />
  ),
};

export const NoPagination: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      pagination={false}
      searchable
      searchColumn="name"
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      className="border-2 border-primary"
      headerClassName="bg-primary/10"
      rowClassName={(user) =>
        user.status === "inactive" ? "opacity-50" : "hover:bg-accent/50"
      }
      pagination
      pageSize={5}
    />
  ),
};

export const ServerSide: Story = {
  render: () => {
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });

    const currentPageData = sampleUsers.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize,
    );

    return (
      <div>
        <div className="mb-4 rounded-md bg-muted p-4">
          <p className="text-sm font-medium mb-2">Server State:</p>
          <pre className="text-xs">
            {JSON.stringify({ sorting, pagination }, null, 2)}
          </pre>
        </div>
        <DataTable
          columns={basicColumns}
          data={currentPageData}
          manualPagination
          manualSorting
          pageSize={pagination.pageSize}
          pageCount={Math.ceil(sampleUsers.length / pagination.pageSize)}
          onPaginationChange={setPagination}
          onSortingChange={() => setSorting([])}
          pagination
        />
      </div>
    );
  },
};

export const WithActionsBar: Story = {
  render: () => {
    const handleAddNew = () => {
      console.log("Navigate to: /customers/new");
    };

    const handleExport = () => {
      console.log("Exporting customer data...");
    };

    const handleFilter = () => {
      console.log("Open filters panel");
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your customer database
          </p>
        </div>

        <DataTable
          columns={cellShowcaseColumns}
          data={sampleCustomers}
          searchable
          searchColumn="name"
          searchPlaceholder="Search customers..."
          pagination
          pageSize={5}
          showPageSizeSelector
          toolbarActions={
            <>
              <Button size="sm" onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </>
          }
        />
      </div>
    );
  },
};

export const ServerSideWithSearch: Story = {
  render: () => {
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });

    const currentPageData = sampleUsers.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize,
    );

    return (
      <div>
        <div className="mb-4 rounded-md bg-muted p-4">
          <p className="text-sm font-medium mb-2">Server State:</p>
          <pre className="text-xs">
            {JSON.stringify({ sorting, pagination }, null, 2)}
          </pre>
        </div>

        <DataTable
          columns={basicColumns}
          data={currentPageData}
          searchable
          searchColumn="name"
          searchPlaceholder="Search on current page..."
          manualPagination
          manualSorting
          pageSize={pagination.pageSize}
          pageCount={Math.ceil(sampleUsers.length / pagination.pageSize)}
          onPaginationChange={setPagination}
          onSortingChange={() => setSorting([])}
          pagination
        />
      </div>
    );
  },
};
