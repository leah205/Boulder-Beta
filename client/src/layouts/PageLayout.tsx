import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div>
      <Button type="button" onClick={() => navigate(-1)}>
        Back
      </Button>
      {children}
    </div>
  );
}
