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
  const gradeOptions = new Array(15).fill("V").map((ele, index) => ele + index);
  gradeOptions.unshift("N/A");
  return gradeOptions;
}

function get_ratings() {
  const ratings = Array(5)
    .fill(null)
    .map((_, i) => `${i + 1}/5`);
  console.log(ratings);
  return ratings;
}

export default function LogClimbPage() {
  const [grade, setGrade] = useState<string | null>(null);

  const [picture, setPicture] = useState<File | null>(null);
  const { logClimb, isPending, errors } = useClimbLog();
  function handleSubmit() {
    logClimb({
      grade: grade,
      picture: picture,
    });
  }

  function handleGradeChange(input: string) {
    let newGrade = undefined;
    if (newGrade != "N/A") {
      newGrade = input;
    }
    setGrade(newGrade);
  }

  return (
    <>
      {isPending && <Spinner></Spinner>}

      <Form enctype="multipart/form-data">
        <ul>
          {errors &&
            errors.map((error) => {
              return <ValidationError key={error}>{error}</ValidationError>;
            })}
        </ul>

        <FormField name="grade" label="Grade: ">
          <select
            name="grade"
            onChange={(e) => handleGradeChange(e.target.value)}
            value={grade || "N/A"}
          >
            {get_grades().map((grade) => {
              return <option value={grade}>{grade}</option>;
            })}
          </select>
        </FormField>
        <label htmlFor="picture">Take a picture of the climb:</label>

        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            if (e.target.files) {
              setPicture(e.target.files[0]);
            }
            setPicture(null);
          }}
        />

        {/* {formData.sent && (
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
        )} */}
        <Button type="submit" className="" onClick={handleSubmit}>
          Save Climb
        </Button>
      </Form>
    </>
  );
}
