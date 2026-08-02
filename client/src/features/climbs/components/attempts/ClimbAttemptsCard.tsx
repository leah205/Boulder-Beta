import ContentSpinner from "@/components/spinner/ContentSpinner";
import AttemptsHeader from "./AttemptsHeader";
import ClimbAttemptsList from "./ClimbAttemptsList";
import type { AttemptWithVideoResponse } from "@shared/types";
import ErrorMessage from "@/components/error/ErrorMessage";

function AttemptsCardLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full py-3 px-3">{children}</div>;
}

type AttemptsCardProps = {
  pending: boolean;
  error: Error | null;
  data?: AttemptWithVideoResponse[];
};

export default function ClimbAttemptsCard({
  pending,
  error,
  data,
}: AttemptsCardProps) {
  if (pending) {
    return (
      <AttemptsCardLayout>
        <AttemptsHeader></AttemptsHeader>
        <ContentSpinner></ContentSpinner>
      </AttemptsCardLayout>
    );
  }

  if (error) {
    return (
      <AttemptsCardLayout>
        <AttemptsHeader></AttemptsHeader>
        <ErrorMessage error={error}></ErrorMessage>
      </AttemptsCardLayout>
    );
  }

  if (!data || !data.length) {
    return (
      <AttemptsCardLayout>
        <AttemptsHeader></AttemptsHeader>
        <p>Log First Attempt!</p>
      </AttemptsCardLayout>
    );
  }

  return (
    <AttemptsCardLayout>
      <AttemptsHeader></AttemptsHeader>
      <ClimbAttemptsList data={data}></ClimbAttemptsList>
    </AttemptsCardLayout>
  );
}
