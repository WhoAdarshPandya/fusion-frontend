import "./ChatDetails.css";

export const ChatDetails = ({
  DayAndDate,
}: {
  DayAndDate: string;
}): JSX.Element => {
  return (
    <div className="conversation-start">
      <span>{DayAndDate}</span>
    </div>
  );
};
