import { useState, useEffect } from 'react';
import { staticPageUrl } from '../../api/staticPage.api';
// import styles from "./AboutUs.module.css";

const StaticPage = ({endpoint}) => {
  const [pageContent, setPageContent] = useState("");

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await staticPageUrl(endpoint); // Assuming this returns the URL
      // console.log("API Response:", response);
      // Fetch HTML content from the URL
      const htmlResponse = await fetch(response.data.filePath);
      const htmlContent = await htmlResponse.text();
      // console.log("HTML content ::>", htmlContent)
      setPageContent(htmlContent);
    } catch (error) {
      console.error("Error fetching page content:", error);
    }
  };

  return (
      <div className='mt-3 mb-3'
        dangerouslySetInnerHTML={{ __html: pageContent }}
      />
  );
};

export default StaticPage;
