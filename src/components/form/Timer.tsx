type TimerProps = {
  typeTimer: string;
  step: number;
  handleChangeTime: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string | number
  ) => void;
};
const Timer = ({ typeTimer, step, handleChangeTime }: TimerProps) => {
  return (
    <input
      type="time"
      step={step}
      onChange={(e) => handleChangeTime(e, typeTimer)}
    />
  );
};

export default Timer;
