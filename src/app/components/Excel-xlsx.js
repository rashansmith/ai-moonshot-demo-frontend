'use client'

import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import Dropzone from 'react-dropzone';

const ExcelUploader = () => {
  const [tablesData, setTablesData] = useState([]);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const buffer = e.target.result;
      const workbook = read(buffer, { type: 'array' });

      const extractedTables = [];
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        const tableData = {
          name: sheetName,
          rows: jsonData,
        };

        extractedTables.push(tableData);
      });

      setTablesData(extractedTables);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col ">
      <div className="h-1/2 overflow-y-auto">
        <Dropzone onDrop={handleDrop} accept={['.xlsx']}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-400 rounded"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                Drag and drop an Excel file here, or click to select a file.
              </p>
            </div>
          )}
        </Dropzone>
      </div>

      <div className="h-1/2 overflow-y-auto overflow-x-auto">
  {tablesData.map((tableData, index) => (
    <div key={index} className="mt-8">
      <h2 className="text-sm font-semibold mb-2">{tableData.name}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-auto border border-gray-300 text-xs">
          <thead className="bg-gray-100">
            <tr>
              {tableData.rows[0].map((header, headerIndex) => (
                <th
                  key={headerIndex}
                  className="py-1 px-2 border-b border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-1 px-2 border-b border-gray-300 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ExcelUploader;
