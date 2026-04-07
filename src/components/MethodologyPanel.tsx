export function MethodologyPanel() {
  return (
    <section className="panel">
      <div className="panel-header">Notes</div>
      <div className="panel-body">
        <ul className="notes-list compact-notes">
          <li>
            This is a directional ROI model based on observed evaluation outcomes, not a guarantee
            of realized savings.
          </li>
          <li>
            Best Observed Opportunity is used as the comparison basis for estimating recoverable
            time and value.
          </li>
          <li>
            Results are sensitive to the task mix, weekly AI usage, and hourly wage assumptions
            entered above.
          </li>
          <li>
            The model estimates productivity upside from improved prompt-persona alignment, not
            total business value from AI adoption.
          </li>
        </ul>
      </div>
    </section>
  );
}
