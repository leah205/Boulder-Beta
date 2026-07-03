import { useState } from "react";
import Form from "@/components/Form";
import InputField from "@/components/InputField";
import type { Climb } from "@shared/types";
import Button from "@/components/Button";
import { useClimbLog } from "@/features/climbs/useLogClimb";
import ValidationError from "@/components/ValidationError";
import Spinner from "@/components/Spinner";
import FormField from "@/components/FormField";

function get_grades() {
  return new Array(15).fill("V").map((ele, index) => ele + index);
}

function get_ratings() {
  const ratings = Array(5)
    .fill(null)
    .map((_, i) => `${i + 1}/5`);
  console.log(ratings);
  return ratings;
}

interface FormProps = {
    onSubmit
}

export default function LogClimbPage() {
  const [formData, setFormData] = useState<Partial<Climb>>({});
  const { logClimb, isPending, errors } = useClimbLog();
  function handleSubmit() {
    logClimb(formData);
  }

  return (
    <>
      {isPending && <Spinner></Spinner>}

      <Form>
        <ul>
          {errors &&
            errors.map((error) => {
              return <ValidationError key={error}>{error}</ValidationError>;
            })}
        </ul>

        <FormField name="grade" label="Grade: ">
          <select
            name="grade"
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            value={formData.grade || "V0"}
          >
            {get_grades().map((grade) => {
              return <option value={grade}>{grade}</option>;
            })}
          </select>
        </FormField>

        <FormField name="attempt_num" label="Attempts">
          <InputField
            value={formData.attempt_num}
            onChange={(e) =>
              setFormData({ ...formData, attempt_num: Number(e.target.value) })
            }
            name="attempt_num"
            type="number"
          ></InputField>
        </FormField>

        <FormField name="sent" label="Sent">
          <input
            checked={formData.sent}
            type="checkbox"
            onChange={(e) => {
              setFormData({
                ...formData,
                sent: e.target.checked,
              });
            }}
            name="sent"
          ></input>
        </FormField>

        {formData.sent && (
          <FormField name="rating" label="Rating">
            <select
              name="rating"
              className="block"
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value[0]) })
              }
              value={`${formData.rating}/5` || "1/5"}
            >
              {get_ratings().map((rating) => {
                return <option value={rating}>{rating}</option>;
              })}
            </select>
          </FormField>
        )}
        <Button type="submit" className="" onClick={handleSubmit}>
          Save Climb
        </Button>
      </Form>
    </>
  );
}
