import StyledCard from "@components/styled-card";
import StyledButton from "../../components/styled-button";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

export default function ViewCustomLadders() {
  const router = useRouter();
  return (
    <>
      <StyledCard title={"Custom Ladders"}>
        <div>
          <div>
            <StyledButton
              text={"Create Ladder"}
              onClick={() => {
                router.push(`/poe/custom-ladders/${nanoid()}/edit`);
              }}
            />
          </div>
        </div>
      </StyledCard>
    </>
  );
}
