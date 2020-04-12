import React from "react";
import Scream from "./Scream";

export default function RecentScreams({ screams }) {
  return screams.length > 0 ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );
}
