import { useEffect, useState, useMemo } from "react";
import Form from "@/components/form/Form";
import ClimbPic from "@/features/climbs/components/ClimbPic";
import Button from "@/components/Button";
import { useClimbLog } from "@/features/climbs/hooks/useLogClimb";
import Spinner from "@/components/spinner/Spinner";
import FormField from "@/components/form/FormField";
import ErrorWrapper from "@/components/error/ErrorWrapper";
import BoundingRect from "@/components/BoundingRect";
import type { CoorType } from "@/components/BoundingRect";

function get_grades() {
  const gradeOptions = new Array(15).fill("V").map((ele, index) => ele + index);
  gradeOptions.unshift("N/A");
  return gradeOptions;
}

// function get_ratings() {
//   const ratings = Array(5)
//     .fill(null)
//     .map((_, i) => `${i + 1}/5`);
//   ratings;
//   return ratings;
// }

export default function LogClimbPage() {
  const [grade, setGrade] = useState<string | null>(null);
  const [color, setColor] = useState<string>("#000000");
  const [picture, setPicture] = useState<File | null>(null);
  const [coors, setCoors] = useState<CoorType | null>(null);

  const pictureUrl = useMemo(
    () => (picture ? URL.createObjectURL(picture) : undefined),
    [picture],
  );

  const { logClimb, isPending, errors } = useClimbLog();
  function handleSubmit() {
    logClimb({
      grade: grade,
      picture: picture,
      color: color,
      topHeight: coors?.height,
      topLeftOffset: coors?.leftOffset,
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

        {picture && (
          // <img className="h-30" src={URL.createObjectURL(picture)}></img>
          <>
            <p>Indicate the top hold of the climb: </p>
            <ClimbPic picture={pictureUrl} color={color}>
              <BoundingRect coors={coors} setCoors={setCoors}></BoundingRect>
            </ClimbPic>
          </>
        )}

        <Button type="submit" className="" onClick={handleSubmit}>
          Save Climb
        </Button>
      </Form>
    </>
  );
}
