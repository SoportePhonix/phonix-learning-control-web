type CircularProgressProps = {
  value: number;
};

export function CircularProgress({ value }: CircularProgressProps) {
  const size = 63;
  const stroke = 5;
  const center = size / 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // 🔑 compensación visual
  const visualValue = value * 0.95;

  const offset = circumference - (visualValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-[10px] w-[127px] h-[100px]">
      <svg width={size} height={size}>
        {/* fondo */}
        <circle cx={center} cy={center} r={radius} stroke="#D1D5DB" strokeWidth={stroke} fill="none" />

        {/* progreso */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#00B3C6"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />

        {/* número */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#1F2A37"
          className="text-[32px] font-light leading-none"
        >
          {value}
        </text>
      </svg>

      <span className="text-[18px] font-semibold leading-none text-[#4B5563]">Progreso total</span>
    </div>
  );
}
