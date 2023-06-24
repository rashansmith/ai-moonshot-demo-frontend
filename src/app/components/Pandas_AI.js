'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function YourComponent({ data }) {
    const [dataFrame, setDataFrame] = useState(null);
    let [loading, setLoading] = useState(true);
    // const [data, setData] = useState([]);
    const [htmlTable, setHtmlTable] = useState('');
    
    // useEffect(() => {
    //     const fetchProjectData = async () => {

    //         if (sendRequest && prompt) {
    //             try {
    //                 const response = await axios.post('http://localhost:5000/', {
    //                     table_name: tableName,
    //                     prompt: ` ${prompt} `
    //                 });

    //                 console.log(typeof response.data)
    //                 console.log(response)
    //                 setData(data)
            

    //             } catch (error) {
    //                 console.error('Error:', error);
    //             }
    //         }
    //     };

    //     fetchProjectData();
    // }, [sendRequest]);

    const formatValue = (value) => {
        return JSON.stringify(value)
    };

    const getImage = (value) => {
        //console.log(JSON.stringify(value.image))
        const new_value = value.image
        const imageUrl = `data:image/png,base64,${new_value}`;
        console.log(imageUrl)
        return imageUrl
    }



    // Render the data
    return (
        <div>
        {typeof data === 'number' || typeof data === 'string' ? (
              <div>{data}</div>
        ) : (
            <div>
                {typeof data === 'object' && !data.image  ? (
                    Object.keys(data).map(key => (
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
                                        height={5000}/>
                                </div>
                            ) :
                                <p>Loading results...</p> 
                             }
                        </div>
                )}
          </div>

        )}
        </div>
  );
}
