import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SidebarMenu, MenuItem } from "./SidebarMenu";
import { useState } from "react";
import {
  HomeIcon,
  UserIcon,
  CogIcon,
  DocumentTextIcon,
  FolderIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  BellIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const meta: Meta<typeof SidebarMenu> = {
  title: "Components/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A nested sidebar menu component with sliding animations, accordion-style submenus, and backdrop click to close.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the sidebar is open",
    },
    width: {
      control: { type: "text" },
      description: "Width of the sidebar",
    },
    showBackdrop: {
      control: { type: "boolean" },
      description: "Whether to show backdrop",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu data
const singleLevelItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    id: "profile",
    label: "Profile",
    icon: <UserIcon />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <CogIcon />,
  },
  {
    id: "documents",
    label: "Documents",
    icon: <DocumentTextIcon />,
  },
];

const twoLevelItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <ChartBarIcon />,
  },
  {
    id: "products",
    label: "Products",
    icon: <ShoppingCartIcon />,
    children: [
      {
        id: "electronics",
        label: "Electronics",
      },
      {
        id: "clothing",
        label: "Clothing",
      },
      {
        id: "books",
        label: "Books",
      },
    ],
  },
  {
    id: "files",
    label: "Files",
    icon: <FolderIcon />,
    children: [
      {
        id: "recent",
        label: "Recent Files",
      },
      {
        id: "shared",
        label: "Shared with Me",
      },
      {
        id: "trash",
        label: "Trash",
      },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <BellIcon />,
  },
];

const threeLevelItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    id: "content",
    label: "Content Management",
    icon: <DocumentTextIcon />,
    children: [
      {
        id: "articles",
        label: "Articles",
        children: [
          {
            id: "published",
            label: "Published",
          },
          {
            id: "drafts",
            label: "Drafts",
          },
          {
            id: "archived",
            label: "Archived",
          },
        ],
      },
      {
        id: "media",
        label: "Media Library",
        children: [
          {
            id: "images",
            label: "Images",
          },
          {
            id: "videos",
            label: "Videos",
          },
          {
            id: "documents",
            label: "Documents",
          },
        ],
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <ChartBarIcon />,
    children: [
      {
        id: "reports",
        label: "Reports",
      },
      {
        id: "insights",
        label: "Insights",
      },
    ],
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: <HeartIcon />,
  },
];

// Stories
export const SingleLevel: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: MenuItem) => {
      console.log("Menu item clicked:", item);
    };

    return (
      <div style={{ minHeight: "400px", position: "relative" }}>
        <div className="p-8">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Open Single Level Menu
          </button>
        </div>

        <SidebarMenu
          {...args}
          isOpen={isOpen}
          items={singleLevelItems}
          onClose={() => setIsOpen(false)}
          onItemClick={handleItemClick}
        />
      </div>
    );
  },
  args: {
    width: "320px",
    showBackdrop: true,
  },
};

export const TwoLevels: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: MenuItem) => {
      console.log("Menu item clicked:", item);
    };

    return (
      <div style={{ minHeight: "400px", position: "relative" }}>
        <div className="p-8">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Open Two Level Menu
          </button>
        </div>

        <SidebarMenu
          {...args}
          isOpen={isOpen}
          items={twoLevelItems}
          onClose={() => setIsOpen(false)}
          onItemClick={handleItemClick}
        />
      </div>
    );
  },
  args: {
    width: "320px",
    showBackdrop: true,
  },
};

export const ThreeLevels: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: MenuItem) => {
      console.log("Menu item clicked:", item);
    };

    return (
      <div style={{ minHeight: "400px", position: "relative" }}>
        <div className="p-8">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Open Three Level Menu
          </button>
        </div>

        <SidebarMenu
          {...args}
          isOpen={isOpen}
          items={threeLevelItems}
          onClose={() => setIsOpen(false)}
          onItemClick={handleItemClick}
        />
      </div>
    );
  },
  args: {
    width: "320px",
    showBackdrop: true,
  },
};

export const WideMenu: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: MenuItem) => {
      console.log("Menu item clicked:", item);
    };

    return (
      <div style={{ minHeight: "400px", position: "relative" }}>
        <div className="p-8">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Open Wide Menu
          </button>
        </div>

        <SidebarMenu
          {...args}
          isOpen={isOpen}
          items={twoLevelItems}
          onClose={() => setIsOpen(false)}
          onItemClick={handleItemClick}
        />
      </div>
    );
  },
  args: {
    width: "400px",
    showBackdrop: true,
  },
};

export const NoBackdrop: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: MenuItem) => {
      console.log("Menu item clicked:", item);
    };

    return (
      <div style={{ minHeight: "400px", position: "relative" }}>
        <div className="p-8">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Open Menu (No Backdrop)
          </button>
        </div>

        <SidebarMenu
          {...args}
          isOpen={isOpen}
          items={singleLevelItems}
          onClose={() => setIsOpen(false)}
          onItemClick={handleItemClick}
        />
      </div>
    );
  },
  args: {
    width: "320px",
    showBackdrop: false,
  },
};
