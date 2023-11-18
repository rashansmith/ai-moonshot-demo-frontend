import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from "../styles/style.css"

export default function YourComponent({ data, loadingIcon }) {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProjectData = async () => {
  //     setLoading(true)
  //     if (data && data.tableName && data.prompt) {
  //       try {
  //         const response = await axios.post('/api/flask_pandas_ai', {
  //           table_name: data.tableName,
  //           prompt: ` ${data.prompt} `
  //         });

  //         console.log(typeof response.data);
  //         console.log(response);

  //       } catch (error) {
  //         console.error('Error:', error);
  //       } finally {
  //           setLoading(false); 
  //       }
  //     } 
  //   };
  //   fetchProjectData();
  // }, [data]);

  // Render the data
  return (
    <div>
         {loading && loadingIcon ? (
      <div className="loading-circle">
        <div className="spinner"></div>
      </div>
    ) : (
      <>
        {data && data !== "" ? (
          typeof data === 'number' || typeof data === 'string' ? (
            <pre>{data}</pre>
          ) : (
            <div>
              {typeof data === 'object' && !data.image ? (
                Object.keys(data).map((key) => (
                  <div key={key}>
                    <p className="pt-4 pb-2">
                      <strong>{key}:<br/></strong>
                    </p>
                    {Object.entries(data[key]).map(([k, v]) => (
                      <p key={k} className="pt-2 pb-2">
                        {k}: {v}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <div>
                  {data.image ? (
                    <div>
                      <img
                        src={`data:image/jpeg;base64,${data.image}`}
                        alt="Base64 Image"
                        width={500}
                        height={5000}
                      />
                    </div>
                  ) : null // Remove the "No image found." message
                  }
                </div>
              )}
            </div>
          )
        ) : (
          <div>Results not found</div>
        )}
      </>
    )}
  </div>
  );
}
