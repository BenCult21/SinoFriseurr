"use client";

import { useState } from "react";
import { TEAM, type TeamMember } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import TeamCard from "@/components/team/TeamCard";
import TeamDetailOverlay from "@/components/team/TeamDetailOverlay";

export default function TeamSection() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="bg-paper px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Team"
          title="Die Menschen hinter Sino"
          align="center"
          description="Lernen Sie das Team kennen, das Sie im Salon empfängt."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} onOpen={() => setSelected(member)} index={i} />
          ))}
        </div>
      </div>

      <TeamDetailOverlay member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
