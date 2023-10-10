import "./App.css";
import HomePage from "./components/ViewPage/HomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ManagementPage from "./components/Management/ManagementPage";
import AddEmpPage from "./components/Management/AddEmpPage";
import EditEmpPage from "./components/Management/EditEmpPage";
import AddNCCPage from "./components/Management/AddNCCPage";
import EditNCCPage from "./components/Management/EditNCCPage";
import AddKHPage from "./components/Management/AddKHPage";
import EditKHPage from "./components/Management/EditKHPage";
import AddSPPage from "./components/Management/AddSPPage";
import EditSPPage from "./components/Management/EditSPPage";
import ListNVPage from "./components/Management/ListNVPage";
import ListNCCPage from "./components/Management/ListNCCPage";
import ListKHPage from "./components/Management/ListKHPage";
import ListSPPage from "./components/Management/ListSPPage";

import "./css/pagingstyle.css";
import ListHoaDonNHPage from "./components/Management/ListHoaDonNHPage";
import AddHDNHPage from "./components/Management/AddHDNHPage";
import ListHoaDonBHPage from "./components/Management/ListHoaDonBHPage";
import AddHDBHPage from "./components/Management/AddHDBHPage";
import ListThongKePage from "./components/Management/ListThongKePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import ErrorPage from "./components/utils/ErrorPage";
import Guard from "./components/Management/Guard";
import EditPassEmpPage from "./components/Management/EditPassEmpPage";

function App() {
  return (
    <Routes>
      <Route index path="/" exact element={<HomePage></HomePage>} />
      <Route
        path="/management"
        element={
          <Guard condition={[1,2]}>
            <ManagementPage />
          </Guard>
        }
      />
      <Route
        path="/list-emp"
        exact
        element={
          <Guard condition={[1]}>
            <ListNVPage />
          </Guard>
        }
      />
      <Route
        path="/add-emp"
        element={
          <Guard condition={[1]}>
            <AddEmpPage />
          </Guard>
        }
      />
      <Route
        path="/editpss-emp/:id"
        element={
          <Guard condition={[1]}>
            <EditPassEmpPage/>
          </Guard>
        }
      />
      <Route
        path="/edit-emp/:id"
        element={
          <Guard condition={[1]}>
            <EditEmpPage />
          </Guard>
        }
      />

      <Route
        path="/list-ncc"
        element={
          <Guard condition={[1,2]}>
            <ListNCCPage />
          </Guard>
        }
      />
      <Route
        path="/add-ncc"
        element={
          <Guard condition={[1,2]}>
            <AddNCCPage />
          </Guard>
        }
      />
      <Route
        path="/edit-ncc/:id"
        element={
          <Guard condition={[1,2]}>
            <EditNCCPage />
          </Guard>
        }
      />

      <Route
        path="/list-kh"
        element={
          <Guard condition={[1,2]}>
            <ListKHPage />
          </Guard>
        }
      />
      <Route
        path="/add-kh"
        element={
          <Guard condition={[1,2]}>
            <AddKHPage />
          </Guard>
        }
      />
      <Route
        path="/edit-kh/:id"
        element={
          <Guard condition={[1,2]}>
            <EditKHPage />
          </Guard>
        }
      />

      <Route
        path="/list-sanpham"
        element={
          <Guard condition={[1,2]}>
            <ListSPPage />
          </Guard>
        }
      />
      <Route
        path="/add-sp"
        element={
          <Guard condition={[1,2]}>
            <AddSPPage />
          </Guard>
        }
      />
      <Route
        path="/edit-sp/:id"
        element={
          <Guard condition={[1,2]}>
            <EditSPPage />
          </Guard>
        }
      />

      <Route
        path="/list-hdnh"
        element={
          <Guard condition={[1,2]}>
            <ListHoaDonNHPage />
          </Guard>
        }
      />
      <Route
        path="/add-hdnh"
        element={
          <Guard condition={[1,2]}>
            <AddHDNHPage />
          </Guard>
        }
      />

      <Route
        path="/list-hdbh"
        element={
          <Guard condition={[1,2]}>
            <ListHoaDonBHPage />
          </Guard>
        }
      />
      <Route
        path="/add-hdbh"
        element={
          <Guard condition={[1,2]}>
            <AddHDBHPage />
          </Guard>
        }
      />

      <Route
        path="/list-tk"
        element={
          <Guard condition={[1]}>
            <ListThongKePage />
          </Guard>
        }
      />

      <Route path="/error" exact element={<ErrorPage></ErrorPage>} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
