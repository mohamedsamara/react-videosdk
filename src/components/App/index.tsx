import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import JoinMeeting from "../../views/Meeting/pages/JoinMeeting";
import NewMeeting from "../../views/Meeting/pages/NewMeeting";
import Modals from "../Modals";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/meeting" element={<NewMeeting />} />
          <Route path="/meeting/:id" element={<JoinMeeting />} />
          <Route path="*" element={<Navigate to="/meeting" replace />} />
        </Routes>
        <Modals />
      </Router>
    </>
  );
};

export default App;
