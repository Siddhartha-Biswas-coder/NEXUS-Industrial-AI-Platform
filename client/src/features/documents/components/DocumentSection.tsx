import React from "react";
import DocumentList from "./DocumentList";
import type { useDocuments } from "../hooks/useDocuments";

export type DocumentSectionProps = ReturnType<typeof useDocuments>;

export const DocumentSection: React.FC<DocumentSectionProps> = (props) => {
  return (
    <section className="w-full">
      <DocumentList {...props} />
    </section>
  );
};

export default DocumentSection;
