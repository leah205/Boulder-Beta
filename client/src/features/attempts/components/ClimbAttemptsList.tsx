import type { Attempt } from "@shared/types";

type AttemptsListProps = {
  data: Attempt[];
};

export default function ClimbAttemptsList({ data }: AttemptsListProps) {
  const mappedData = data.map((d) => {
    const dateObj = d.uploadedAt;
    return {
      ...d,
      uploadDate:
        dateObj.getMonth() +
        "/" +
        dateObj.getDate() +
        "/" +
        dateObj.getFullYear(),
      uploadTime: dateObj.getHours() + ":" + dateObj.getMinutes(),
    };
  });

  return (
    <div>
      {mappedData.map((attempt) => {
        return (
          <>
            <div className="flex gap-3" key={attempt.id}>
              {attempt.send && <p className="text-green-400">Send </p>}
              {!attempt.send && <p className="text-red-400">Attempt</p>}
              <p>
                {String(attempt.uploadDate) + " " + String(attempt.uploadTime)}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}
