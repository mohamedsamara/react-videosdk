import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import Meeting from "../../views/Meeting/pages/Container";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/meeting/:id" element={<Meeting />} />
        <Route path="*" element={<Navigate to="/meeting" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
