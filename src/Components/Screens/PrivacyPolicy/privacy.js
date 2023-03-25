import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import React, { useState } from "react";
import pdf from "./privacy.pdf";
import Header from "../../Header/Header";
import Loader from "../../Loader";
const PrivacyPolicy = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  function onDocumentLoadSuccess({ numPages }) {
    setLoading(false);
    setNumPages(numPages);
    setPageNumber(1);
  }
  function LoadingProgress() {
    return <Loader />;
  }
  return (
    <>
      <Header />

      <center>
        <div>
          <Document
            file={pdf}
            onLoadProgress={LoadingProgress}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width="1000"
              />
            ))}
          </Document>
        </div>
      </center>
    </>
  );
};

export default PrivacyPolicy;
