import DetailWithTabTmp from "../../templates/detail-with-tabs";
import { ITabInfo } from "../../templates/detail-with-tabs.i";

export default function Home() {
  const tabsInfo: ITabInfo[] = [
    {
      id: "general",
      tabName: "general",
      tabContent: <h1>general</h1>,
    },
    {
      id: "CIT",
      tabName: "CIT",
      tabContent: <h1>CIT</h1>,
    },
    {
      id: "Location",
      tabName: "Location",
      tabContent: <h1>Location</h1>,
    },
  ];
  return <DetailWithTabTmp tabsInfo={tabsInfo} />;
}
