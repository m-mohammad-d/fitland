import { PasswordStrength } from "@/utils/passwordStrength";

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
}

export const PasswordStrengthMeter = ({
  strength,
}: PasswordStrengthMeterProps) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1 text-xs">
        <span>میزان امنیت رمز:</span>
        <span
          className={`font-medium ${
            strength.score >= 4
              ? "text-success-500"
              : strength.score >= 2
              ? "text-warn-500"
              : "text-error-500"
          }`}
        >
          {strength.message}
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${
            strength.score >= 4
              ? "bg-success-500"
              : strength.score >= 2
              ? "bg-warn-500"
              : "bg-error-500"
          }`}
          style={{
            width: `${(strength.score / 6) * 100}%`,
          }}
        ></div>
      </div>
      <p className="text-xs text-neutral-500 mt-1">
        (پیشنهاد می‌شود از رمزهای قوی‌تر استفاده کنید)
      </p>
    </div>
  );
};
