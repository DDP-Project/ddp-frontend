import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ITabInfo } from "./detail-with-tabs.i";

interface IProps {
  tabsInfo: ITabInfo[];
}

const DetailWithTabTmp: React.FC<IProps> = (props: IProps) => {
  const generateTabs = (tabsInfo: ITabInfo[]) => {
    if (!tabsInfo?.length) return "";

    return tabsInfo.map((tab, index) => {
      return (
        <TabsTrigger
          key={tab.id + index}
          className="text-[20px] font-normal p-0 m-0 outline-none data-[state=active]:font-bold data-[state=active]:bg-none data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:shadow-none"
          value={tab.id}
        >
          {tab.tabName.charAt(0).toUpperCase() + tab.tabName.slice(1)}
        </TabsTrigger>
      );
    });
  };

  const generateTabsContent = (tabsInfo: ITabInfo[]) => {
    if (!tabsInfo?.length) return "";

    return tabsInfo.map((e, index) => {
      return (
        <TabsContent
          key={e.id + "content" + index}
          value={e.id}
          className="h-auto p-0 m-0"
        >
          {e.tabContent}
        </TabsContent>
      );
    });
  };

  return (
    <div className="mt-4 mb-8">
      <div className="pt-3 pb-7">
        <Breadcrumb className="pb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Themes</DropdownMenuItem>
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1>
          Edit Location : 1-NSM-Configure-Organisation08,
          1-NSM-Configure-Organisation08-location01
        </h1>
      </div>
      <div className="px-11 py-10 border border-gray-200 rounded">
        <Tabs
          defaultValue={props?.tabsInfo[0]?.id || ""}
          className="flex gap-x-5"
        >
          <TabsList className="w-[210px] flex flex-col bg-white justify-normal items-start h-[100%] p-0 gap-4">
            {generateTabs(props.tabsInfo)}
          </TabsList>
          <div className="flex-1">{generateTabsContent(props.tabsInfo)}</div>
        </Tabs>
        <div className="flex flex-col gap-3 pt-16">
          <Separator />
          <div className="flex justify-end items-center gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailWithTabTmp;
