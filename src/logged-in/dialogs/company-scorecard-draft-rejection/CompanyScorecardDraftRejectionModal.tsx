import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useAppContext } from "../../../shared/functions/Context";
import { hideModalFromId } from "../../../shared/functions/ModalShow";
import { IScorecardMetadata } from "../../../shared/models/ScorecardMetadata";
import MODAL_NAMES from "../ModalName";

interface IProps {
  agreement: IScorecardMetadata;
}
const CompanyScorecardDraftRejectionModal = observer((props: IProps) => {
  const { agreement } = props;
  const { api, store, ui } = useAppContext();
  const [comments, setComments] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onUpdate = async (agreement: IScorecardMetadata) => {
    try {
      await api.companyScorecardMetadata.update(agreement);
      ui.snackbar.load({
        id: Date.now(),
        message: "Reverted Scorecard.",
        type: "success",
      });
    } catch (error) {
      ui.snackbar.load({
        id: Date.now(),
        message: "Error! Failed to revert the Scorecard.",
        type: "danger",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const me = store.auth.meJson;
    if (!me) return;
    setLoading(true);
    const $agreement: IScorecardMetadata = { ...agreement };
    $agreement.agreementDraft.comments = comments;
    $agreement.agreementDraft.status = "pending";
    await onUpdate($agreement);
    setLoading(false);
    onCancel();
  };

  const onCancel = () => {
    setComments("");
    hideModalFromId(MODAL_NAMES.EXECUTION.COMPANY_DRAFT_REJECTION_MODAL);
  };

  return (
    <div className="measure-modal uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button
        className="uk-modal-close-default"
        type="button"
        data-uk-close
      ></button>
      <h3 className="uk-modal-title">Revert Performance Scorecard</h3>
      <div className="dialog-content uk-position-relative">
        <div
          className="uk-alert-danger uk-padding-small uk-margin"
          data-uk-alert >
          <p>The performance scorecard will be reverted for ammendments</p>
        </div>
        <form
          className="uk-form-stacked uk-grid-small"
          data-uk-grid onSubmit={handleSubmit}>
          <div className="uk-width-1-1">
            <label className="uk-form-label" htmlFor="kpi-comments">
              Reasons / comments for reverting the performance scorecard draft.
            </label>
            <div className="uk-form-controls">
              <textarea
                className="uk-textarea uk-form-small"
                id="kpi-comments"
                rows={6}
                placeholder="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
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
              Revert {loading && <div data-uk-spinner="ratio: .5"></div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CompanyScorecardDraftRejectionModal;
