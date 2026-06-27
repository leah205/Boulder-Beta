import { useState } from "react";
import Form from "@/components/Form";
import InputField from "@/components/InputField";
import type { Climb } from "@shared/types";

export default function LogClimbPage() {
  const [formData, setFormData] = useState<Partial<Climb>>({});

  return (
    <>
      <Form>
        <ul></ul>
        <InputField
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          name="grade"
          type="text"
          label="Grade"
        ></InputField>

        <InputField
          value={formData.attempts}
          onChange={(e) =>
            setFormData({ ...formData, attempts: e.target.value })
          }
          name="attempts"
          type="text"
          label="Number of attempts"
        ></InputField>

        <InputField
          value={formData.sent}
          onChange={(e) => setFormData({ ...formData, sent: e.target.value })}
          name="sent"
          type="checkbox"
          label="Sent"
        ></InputField>

        {formData.sent && (
          <InputField
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            name="rating"
            type="text"
            label="rating"
          ></InputField>
        )}
      </Form>
    </>
  );
}
