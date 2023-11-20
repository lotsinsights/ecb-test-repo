import { observer } from "mobx-react-lite";
import { USER_ROLES } from "./shared/functions/CONSTANTS";
import PrimeReact from 'primereact/api';
import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./shared/components/loading/Loading";
import SnackbarManager from "./shared/components/snackbar/SnackbarManager";
import { AppContext, useAppContext } from "./shared/functions/Context";
import Dashboard from "./logged-in/dashboard/Dashboard";
import useNetwork from "./shared/hooks/useNetwork";
import { MainApp } from "./shared/models/App";
import routes from "./logged-in/Routes/projectmanagement.route";
import FeedbackRoutes from "./logged-in/Routes/feedback.route";
import DepartmentalPerformanceReviews from "./logged-in/departmental-performance-reviews/DepartmentalPerformanceReviews";
import DivisionPerformanceReviews from "./logged-in/division-performance-reviews/DivisionPerformanceReviews";

const IndividualScorecard = React.lazy(() => import("./logged-in/execution-scorecard/IndividualScorecard"));
const People = React.lazy(() => import("./logged-in/execution-team/People"));
const AdminSettings = React.lazy(() => import("./logged-in/admin-settings/AdminSettings"));
const Reports = React.lazy(() => import("./logged-in/reports/Reports"));
const EmployeeScorecard = React.lazy(() => import("./logged-in/execution-supervision/EmployeeScorecard"));
const PeopleView = React.lazy(() => import("./logged-in/execution-team-view/PeopleView"));
const EmployeeScorecardView = React.lazy(() => import("./logged-in/execution-supervision-view/EmployeeScorecardView"));
const PrivateRoute = React.lazy(() => import("./shared/functions/PrivateRoute"));
const LoggedOut = React.lazy(() => import("./logged-out/LoggedOut"));
const CompanyScorecards = React.lazy(() => import("./logged-in/company-scorecards/CompanyScorecards"));
const CompanyScorecard = React.lazy(() => import("./logged-in/company-scorecard/CompanyScorecard"));
const CompanyScorecardObjective = React.lazy(() => import("./logged-in/company-scorecard-objective/CompanyScorecardObjective"));
const PerformanceReviews = React.lazy(() => import("./logged-in/performance-reviews/PerformanceReviews"));
const Drive = React.lazy(() => import("./logged-in/drive/Drive"));
const IndividualScorecardDraftObjective = React.lazy(() => import("./logged-in/execution-scorecard-objective-draft/IndividualScorecardDraftObjective"));
const StrategyThemes = React.lazy(() => import("./logged-in/strategy-themes/StrategyThemes"));
const ReportPersonalDevelopmentPlan = React.lazy(() => import("./logged-in/report-personal-development-plan/ReportPersonalDevelopmentPlan"));
const IndividualScorecardTeamLoad = React.lazy(() => import("./logged-in/execution-team-edit/IndividualScorecardTeamLoad"));
const IndividualScorecardTeamObjective = React.lazy(() => import("./logged-in/execution-team-edit/execution-scorecard-objective-draft/IndividualScorecardTeamObjective"));
const CompanyStrategicMap = React.lazy(() => import("./logged-in/company-scorecard/strategic-map/CompanyStrategicMap"));
const CompanyScorecardReviewView = React.lazy(() => import("./logged-in/company-scorecard-reviews-view/CompanyScorecardReviewView"));
const CompanyScorecardReviews = React.lazy(() => import("./logged-in/company-scorecard-reviews/CompanyScorecardReviews"));
const LoggedIn = lazy(() => import("./logged-in/LoggedIn"));

PrimeReact.ripple = true;

const PrivateLoggedIn = () => (
  <PrivateRoute>
    <Suspense fallback={<Loading fullHeight={true} />}>
      <LoggedIn />
    </Suspense>
  </PrivateRoute>
);

const HR_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>

          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/my" element={<IndividualScorecard />} />
          <Route path="scorecards/my/:id" element={<IndividualScorecardDraftObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />


          {/* allow loading of other peoples scorecards start*/}
          <Route path="scorecards/people" element={<People />} />
          <Route path="scorecards/people/:uid" element={<IndividualScorecardTeamLoad />} />
          <Route path="scorecards/people/:uid/:objectiveId" element={<IndividualScorecardTeamObjective />} />
          {/*allow loading of other peoples scorecards end */}

          <Route path="scorecards/reviews" element={<PerformanceReviews />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="reports/kpis" element={<Reports />} />
          <Route path="reports/development-plan" element={<ReportPersonalDevelopmentPlan />} />
          <Route path="admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const EXECUTIVE_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>

          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="scorecards/people" element={<People />} />
          <Route path="scorecards/people/:uid" element={<PeopleView />} />
          <Route path="scorecards/reviews" element={<PerformanceReviews />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="reports/kpis" element={<Reports />} />
          <Route path="reports/development-plan" element={<ReportPersonalDevelopmentPlan />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const ADMIN_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/my" element={<IndividualScorecard />} />
          <Route path="scorecards/my/:id" element={<IndividualScorecardDraftObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="scorecards/people" element={<People />} />
          <Route path="scorecards/people/:uid" element={<PeopleView />} />
          <Route path="scorecards/reviews" element={<PerformanceReviews />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="reports/kpis" element={<Reports />} />
          <Route path="reports/development-plan" element={<ReportPersonalDevelopmentPlan />} />
          <Route path="admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const GENERAL_MANAGER_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/my" element={<IndividualScorecard />} />
          <Route path="scorecards/my/:id" element={<IndividualScorecardDraftObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="scorecards/reviews" element={<DepartmentalPerformanceReviews />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="reports/kpis" element={<Reports />} />
          <Route path="reports/development-plan" element={<ReportPersonalDevelopmentPlan />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const MANAGER_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/my" element={<IndividualScorecard />} />
          <Route path="scorecards/my/:id" element={<IndividualScorecardDraftObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="scorecards/reviews" element={<DivisionPerformanceReviews/>} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="reports/kpis" element={<Reports />} />
          <Route path="reports/development-plan" element={<ReportPersonalDevelopmentPlan />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const EMPLOYEE_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/my" element={<IndividualScorecard />} />
          <Route path="scorecards/my/:id" element={<IndividualScorecardDraftObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>

        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const GUEST_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company" element={<CompanyScorecards />} />
          <Route path="strategy/company/:fyid" element={<CompanyScorecard />} />
          <Route path="strategy/company/:fyid/:objectiveId" element={<CompanyScorecardObjective />} />
          <Route path="scorecards/my" element={<IndividualScorecard />} />
          <Route path="scorecards/my/:id" element={<IndividualScorecardDraftObjective />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>

        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const BORAD_MEMBER_USER_ROUTES = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* PROJECT MANAGEMENT */}
          {routes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {/* Feedback */}
          {FeedbackRoutes.map((route: any, key: any) => {
            return (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/strategy-map" element={<CompanyStrategicMap />} />
          <Route path="strategy/themes" element={<StrategyThemes />} />
          <Route path="strategy/company-review" element={<CompanyScorecardReviews />} />
          <Route path="strategy/company-review/:fyid" element={<CompanyScorecardReviewView />} />
          <Route path="scorecards/supervision" element={<EmployeeScorecard />} />
          <Route path="scorecards/supervision/:uid" element={<EmployeeScorecardView />} />
          <Route path="drive" element={<Drive />} />
          <Route path="drive/:id" element={<Drive />} />
          <Route path="reports/kpis" element={<Reports />} />
          <Route path="reports/development-plan" element={<ReportPersonalDevelopmentPlan />} />
          <Route path="*" element={<Navigate to="home/dashboard" />} />
        </Route>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const MainRoutes = observer(() => {

  const { store } = useAppContext();
  const role = store.auth.role;

  useNetwork();

  if (role === USER_ROLES.HR_USER) return <HR_USER_ROUTES />;
  else if (role === USER_ROLES.EXECUTIVE_USER) return <EXECUTIVE_USER_ROUTES />;
  else if (role === USER_ROLES.ADMIN_USER) return <ADMIN_USER_ROUTES />;
  else if (role === USER_ROLES.GENERAL_MANAGER) return <GENERAL_MANAGER_USER_ROUTES />;
  else if (role === USER_ROLES.MANAGER_USER) return <MANAGER_USER_ROUTES />;
  else if (role === USER_ROLES.BOARD_MEMBER_USER) return <BORAD_MEMBER_USER_ROUTES />;
  if (role === USER_ROLES.EMPLOYEE_USER) return <EMPLOYEE_USER_ROUTES />;
  return <GUEST_USER_ROUTES />;
});

const App = () => {
  const app = new MainApp();
  const { store, api, ui } = app;

  return (
    <div className="app">
      <AppContext.Provider value={{ store, api, ui }}>
        <MainRoutes />
        <SnackbarManager />
      </AppContext.Provider>
    </div>
  );
};
export default App;

// FtU27ErLx4YadxFziDyzChQEplJ3 levi uid to be removed from ecb database