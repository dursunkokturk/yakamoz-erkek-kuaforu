const STATUS_LABELS = {
  pending: "Onay Bekliyor",
  approved: "Onaylandı",
  completed: "Tamamlandı",
  cancelled: "İptal Edildi",
};

export function Badge({ status, children }) {
  const label = children ?? STATUS_LABELS[status] ?? status;
  return <span className={`ui-badge ui-badge--${status}`}>{label}</span>;
}
