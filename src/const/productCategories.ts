// productCategories.ts
export const productCategories = [
  { id: "memory", name: "Memory" },
  {
    id: "networking",
    name: "Networking",
    children: [
      {
        id: "bridges_routers",
        name: "Bridges & Routers",
        children: [
          { id: "routers", name: "Routers" },
        ],
      },
    ],
  },
];
