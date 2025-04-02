/** @format */

"use client";

import { generateFakeWatches } from "@/utils/FakeData";
import { useEntities } from "@/context/EntityContext";
import { Button } from "@/components/ui/button";

export default function GenerateFakeButton() {
  const { addEntity } = useEntities();

  const handleGenerate = () => {
    const fakeEntities = generateFakeWatches(20); // 👈 generate 20 at once
    fakeEntities.forEach((entity) => addEntity(entity)); // 👈 add each individually
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Button onClick={handleGenerate} className='bg-green-600 text-black'>
        Generate Watches
      </Button>
    </div>
  );
}
