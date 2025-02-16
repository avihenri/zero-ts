import * as TabsPrimitive from "@radix-ui/react-tabs";
import clsx from "clsx";

interface TabsProps {
  tabs: { label: string; value: string; content: React.ReactNode }[];
  defaultValue: string;
  tabActiveColor?: string;
}

export function Tabs({
    tabs,
    defaultValue,
    tabActiveColor = 'bg-primary-400',
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      className="w-full"
      data-testid="tabs"
    >
      <TabsPrimitive.List className="flex bg-grey-900 rounded-xl my-2">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={clsx(
              "flex-1 px-4 py-2 text-center rounded-xl transition bg-grey-950 font-semibold",
              `data-[state=active]:${tabActiveColor} data-[state=active]:text-gray-900`,
              "data-[state=inactive]:bg-grey-900 data-[state=inactive]:text-grey-400"
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className="mt-4"
          role="tabpanel"
          aria-labelledby={`tab-${tab.value}`}
          data-testid={`tab-${tab.value}`}
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
