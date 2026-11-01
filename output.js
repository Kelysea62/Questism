const modifier = (text) => {
  const previousIssue = state.Questism && state.Questism.lastReportIssue;
  const result = Questism.output(text);
  // Creator-only diagnostic switch. Logs stay out of story, cards and evidence.
  if (typeof QUESTISM_DEBUG_REPORTS !== 'undefined' && QUESTISM_DEBUG_REPORTS === true && state.Questism && state.Questism.lastReportIssue !== previousIssue) {
    try { console.log('QUESTISM_REJECTED_OUTPUT ' + JSON.stringify(String(text).slice(0, 18000))); } catch (_) {}
  }
  return result;
};
modifier(text)
