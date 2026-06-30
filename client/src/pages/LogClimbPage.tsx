import { useState } from "react";
import Form from "@/components/Form";
import InputField from "@/components/InputField";
import type { Climb } from "@shared/types";
import Button from "@/components/Button";
import { useClimbLog } from "@/features/climbs/useLogClimb";
import ValidationError from "@/components/ValidationError";

export default function LogClimbPage() {
  const [formData, setFormData] = useState<Partial<Climb>>({});
  const { logClimb, isPending, errors } = useClimbLog();
  function handleSubmit() {
    logClimb(formData);
  }

  return (
    <>
      {isPending && <p>loading...</p>}
      <ul>
        {errors &&
          errors.map((error) => {
            return <ValidationError key={error}>{error}</ValidationError>;
          })}
      </ul>
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
          value={formData.attempt_num}
          onChange={(e) =>
            setFormData({ ...formData, attempt_num: Number(e.target.value) })
          }
          name="attempts"
          type="number"
          label="Attempts"
        ></InputField>

        <InputField
          value={formData.sent}
          onChange={(e) =>
            setFormData({
              ...formData,
              sent: e.target.value == "on" ? true : false,
            })
          }
          name="sent"
          type="checkbox"
          label="Sent"
        ></InputField>

        {formData.sent && (
          <InputField
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: Number(e.target.value) })
            }
            name="rating"
            type="number"
            label="rating"
          ></InputField>
        )}
        <Button type="submit" className="" onClick={handleSubmit}>
          Log Climb
        </Button>
      </Form>
    </>
  );
}
