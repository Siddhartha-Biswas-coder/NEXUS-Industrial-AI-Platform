import React from "react";
import UploadZone from "./UploadZone";
import type { useDocuments } from "../hooks/useDocuments";

export type UploadSectionProps = ReturnType<typeof useDocuments>;

export const UploadSection: React.FC<UploadSectionProps> = (props) => {
  return (
    <section className="w-full">
      <UploadZone {...props} />
    </section>
  );
};

export default UploadSection;
