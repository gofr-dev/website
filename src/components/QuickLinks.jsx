import React from 'react';
import { Helmet } from "react-helmet";

const QuickLinks = () => {
  return (
    <>
      <Helmet>
        <title>GoFr - An Opinionated Go Framework</title>
        <meta name="description" content="Accelerate microservice development with GoFr." />
        <meta property="og:title" content="GoFr - An Opinionated Go Framework" />
        <meta property="og:description" content="Accelerate microservice development with GoFr." />
        <meta property="og:image" content="https://gofr.dev/assets/logo.png" />
        <meta property="og:url" content="https://gofr.dev/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Existing JSX code below */}
    </>
  );
};

export default QuickLinks;
