import { Home, TicketManagement, Setting, TicketControl } from "../pages";
import { Routes, Route } from "react-router-dom";
export interface IRouterProps {}
const Router: React.FunctionComponent<IRouterProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quan-ly-ve" element={<TicketManagement />} />
      <Route path="/doi-soat-ve" element={<TicketControl />} />
      <Route path="/cai-dat" element={<Setting />} />
    </Routes>
  );
};
export default Router;
