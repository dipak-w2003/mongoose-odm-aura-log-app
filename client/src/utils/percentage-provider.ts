export const normalPercentageProvider = ({ total = 0, perOf = 0 }: { total: number, perOf: number }): number => {
  let PERCENT: number;
  if (total <= 0) {
    PERCENT = 0;
  } else {
    PERCENT = Math.round((perOf / total) * 100);

    // Optional: ensure a tiny visible floor if any progress exists
    if (PERCENT > 0 && PERCENT < 5) PERCENT = 5;
  }

  // Safety clamp
  if (PERCENT < 0) PERCENT = 0;
  if (PERCENT > 100) PERCENT = 100;
  return PERCENT;
}