import { useState } from "react";
import Form from "@/components/Form";

import Button from "@/components/Button";
import { useClimbLog } from "@/features/climbs/useLogClimb";
import Spinner from "@/components/Spinner";
import FormField from "@/components/FormField";
import ErrorWrapper from "@/components/ErrorWrapper";

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
  const [color, setColor] = useState<string>("black");
  const [picture, setPicture] = useState<File | null>(null);
  const { logClimb, isPending, errors } = useClimbLog();
  function handleSubmit() {
    logClimb({
      grade: grade,
      picture: picture,
      color: color,
    });
  }

  function handleGradeChange(input: string) {
    let newGrade = null;
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
              return <ErrorWrapper key={error}>{error}</ErrorWrapper>;
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

        <FormField name="picture" label="Photo">
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              if (e.target.files) {
                setPicture(e.target.files[0]);
              } else setPicture(null);
            }}
          />
        </FormField>

        <FormField name="color" label="Color">
          <input
            type="color"
            name="color"
            className="block"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          ></input>
        </FormField>

        <Button type="submit" className="" onClick={handleSubmit}>
          Save Climb
        </Button>
      </Form>
    </>
  );
}
