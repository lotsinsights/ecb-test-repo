import { observer } from "mobx-react-lite";
import { useState, useCallback, useEffect } from "react";
import { LoadingEllipsis } from "../../shared/components/loading/Loading";
import { useAppContext } from "../../shared/functions/Context";
import useTitle from "../../shared/hooks/useTitle";
import EmptyError from "../admin-settings/EmptyError";
import FYPlan from "./FYPlan";
import useBackButton from "../../shared/hooks/useBack";
import ErrorBoundary from "../../shared/components/error-boundary/ErrorBoundary";

const CompanyScorecards = observer(() => {
  const { api, store } = useAppContext();
  const [loading, setLoading] = useState(false);
  useTitle("Company Scorecards");
  useBackButton();

  // load scorecard batch from db
  const loadAll = useCallback(async () => {
    setLoading(true); // start loading
    try {
      await api.scorecard.getAll();
    } catch (error) { }
    setLoading(false); // stop loading
  }, [api.scorecard]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <ErrorBoundary>
      <div className="company-plan-page uk-section uk-section-small">
        <div className="uk-container uk-container-xlarge">
          {!loading &&
            store.scorecard.all.map((batch) => (
              <div key={batch.asJson.id} className="uk-margin">
                <FYPlan scorecardBatch={batch.asJson} />
              </div>
            ))}

          {/* Empty & not loading */}
          {!store.scorecard.all.length && !loading && (
            <EmptyError errorMessage="No scorecard found" />
          )}

          {/* Loading */}
          {loading && <LoadingEllipsis />}
        </div>
      </div>
    </ErrorBoundary>
  );
});

export default CompanyScorecards;
