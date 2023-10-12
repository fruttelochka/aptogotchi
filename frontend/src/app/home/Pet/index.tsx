"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Actions, PetAction } from "./Actions";
import { PetDetails } from "./Details";
import { PetImage, bodies, ears, faces } from "./Image";
import { Summary } from "./Summary";

export interface Pet {
  name: string;
  health_points: number;
  happiness: number;
  parts: number[];
}

interface PetProps {
  pet: Pet;
  setPet: Dispatch<SetStateAction<Pet | undefined>>;
}

export function Pet({ pet, setPet }: PetProps) {
  const [selectedAction, setSelectedAction] = useState<PetAction>("feed");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPet((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          health_points: Math.max(0, prev.health_points - 1),
        };
      });

      return () => clearInterval(interval);
    }, 1000 * 60);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPet((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          happiness: Math.max(0, prev.happiness - 1),
        };
      });

      return () => clearInterval(interval);
    }, 1000 * 60);
  }, []);

  return (
    <div className="flex flex-row self-center gap-12 m-8">
      <div className="flex flex-col gap-4 w-[360px]">
        <PetImage
          pet={pet}
          selectedAction={selectedAction}
          petParts={{
            body: bodies[pet.parts[0]],
            ears: ears[pet.parts[1]],
            face: faces[pet.parts[2]],
          }}
          avatarStyle
        />
        <PetDetails pet={pet} setPet={setPet} />
      </div>
      <div className="flex flex-col gap-8 w-[680px] h-full">
        <Actions
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          setPet={setPet}
          pet={pet}
        />
        <Summary pet={pet} />
      </div>
    </div>
  );
}
