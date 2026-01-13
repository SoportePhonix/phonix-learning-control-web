type CircularProgressSmallProps = {
  value: number;
};

export function CircularProgressSmall({ value }: CircularProgressSmallProps) {
  const size = 40;
  const stroke = 4;
  const center = size / 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const visualValue = value * 0.95;
  const offset = circumference - (visualValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <svg width={size} height={size}>
        <circle cx={center} cy={center} r={radius} stroke="#D1D5DB" strokeWidth={stroke} fill="none" />

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

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#3A484C"
          className="text-[14px] font-medium"
        >
          {value}%
        </text>
      </svg>

      <span className="text-[12px] text-[#3A484C]">Progreso</span>
    </div>
  );
}
