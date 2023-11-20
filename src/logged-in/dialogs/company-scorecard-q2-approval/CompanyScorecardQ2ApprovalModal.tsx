import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useAppContext } from "../../../shared/functions/Context";
import { hideModalFromId } from "../../../shared/functions/ModalShow";
import { IScorecardMetadata } from "../../../shared/models/ScorecardMetadata";
import MODAL_NAMES from "../ModalName";

interface IProps {
  agreement: IScorecardMetadata;
}
const CompanyScorecardQ2ApprovalModal = observer((props: IProps) => {
  const { agreement } = props;
  const { api, ui } = useAppContext();
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const $agreement: IScorecardMetadata = { ...agreement };
    $agreement.quarter2Review.comments = comment;
    $agreement.quarter2Review.status = "approved";
    $agreement.quarter4Review.status = "in-progress";
    await update($agreement);
    setLoading(false);
    onCancel();
  };

  const update = async (agreement: IScorecardMetadata) => {
    try {
      await api.companyScorecardMetadata.update(agreement);
      ui.snackbar.load({
        id: Date.now(),
        message: "Approved Scorecard.",
        type: "success",
      });
    } catch (error) {
      ui.snackbar.load({
        id: Date.now(),
        message: "Error! Failed to approved Scorecard.",
        type: "danger",
      });
    }
  };

  const onCancel = () => {
    hideModalFromId(MODAL_NAMES.EXECUTION.COMPANY_Q2_APPROVAL_MODAL);
  };

  return (
    <div className="scorecard-approval-modal uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button
        className="uk-modal-close-default"
        type="button"
        data-uk-close ></button>
      <h3 className="uk-modal-title">Quarter 2 Review Approval</h3>
      <div className="dialog-content uk-position-relative">
        <div
          className="uk-alert-primary uk-padding-small uk-margin"
          data-uk-alert >
          <p>The Quarter 2 will be locked after approval.</p>
        </div>
        <form
          className="uk-form-stacked uk-grid-small"
          data-uk-grid
          onSubmit={handleSubmit}
        >
          <div className="uk-width-1-1">
            <label className="uk-form-label" htmlFor="kpi-appraisal">
              Feedback (optional)
            </label>
            <div className="uk-form-controls">
              <textarea
                className="uk-textarea uk-form-small"
                id="kpi-appraisal"
                rows={3}
                placeholder="Appraisals"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-width-1-1 uk-text-right">
            <button
              className="btn-text uk-margin-right"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              Approve {loading && <div data-uk-spinner="ratio: .5"></div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CompanyScorecardQ2ApprovalModal;
