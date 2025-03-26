export type PasswordStrength = {
  score: number;
  message: string;
};

export const calculatePasswordStrength = (pass: string): PasswordStrength => {
  let score = 0;

  // Complexity scoring
  if (pass.length >= 6) score += 1;
  if (pass.length >= 8) score += 1;
  if (/[A-Z]/.test(pass)) score += 1;
  if (/[a-z]/.test(pass)) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  // Determine strength level
  let message = "ضعیف";
  if (score >= 5) message = "خیلی قوی";
  else if (score >= 4) message = "قوی";
  else if (score >= 3) message = "متوسط";

  return {
    score: Math.min(score, 6),
    message,
  };
};
