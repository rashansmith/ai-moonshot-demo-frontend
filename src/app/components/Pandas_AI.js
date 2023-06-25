import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from "../styles/style.css"

export default function YourComponent({ data, loadingIcon }) {
  const [dataFrame, setDataFrame] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [loadingIcon, setLoadingIcon] = useState(false);
  const [htmlTable, setHtmlTable] = useState('');

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true)
      if (data && data.tableName && data.prompt) {
        try {
          const response = await axios.post('http://localhost:5000/', {
            table_name: data.tableName,
            prompt: ` ${data.prompt} `
          });

          console.log(typeof response.data);
          console.log(response);

        } catch (error) {
          console.error('Error:', error);
        } finally {
            setLoading(false); // Set loading state to false regardless of success or error
        }
      } 
    };
    fetchProjectData();
  }, [data]);

  const formatValue = (value) => {
    return JSON.stringify(value);
  };

  const getImage = (value) => {
    const new_value = value.image;
    const imageUrl = `data:image/png,base64,${new_value}`;
    console.log(imageUrl);
    return imageUrl;
  };

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
            <div>{data}</div>
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
