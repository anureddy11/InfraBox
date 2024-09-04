import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage';
import Layout from './Layout';
import PopByCityPage from '../components/PopByCityPage';
import AllPoPsPage from '../components/AllPoPsPage';
import CreateNewPop from '../components/CreateNewPoP/CreateNewPop';
import RackDetailsPage from '../components/RackDetailsPage';
import AllRacksPage from '../components/AllRacksPage';
import AddServer from '../components/AddServerModal';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/all",
        element: <AllPoPsPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/pop/:city",
        element: <PopByCityPage />,
      },
      {
        path: "/pop/new",
        element: <CreateNewPop />,
      },
      {
        path: "/rack/:popName/:rackId",
        element: <RackDetailsPage />,
      },
      {
        path: "/racks",
        element: <AllRacksPage />,
      },
      {
        path: "/rack/:popName/:rackId/:slotId",
        element: <AddServer />,
      },


    ],
  },
]);
