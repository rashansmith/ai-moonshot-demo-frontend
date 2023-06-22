'use client'

import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';

const ExcelTable = () => {
  const [tablesData, setTablesData] = useState([]);

  useEffect(() => {
    const processWorkbook = async () => {
      const workbook = new ExcelJS.Workbook();

      try {
        // Load the workbook from a file
        await workbook.xlsx.readFile('static/moonshot_tracker_results.xlsx');
        // Load the workbook from the file using the public URL
        // const publicURL = process.env.PUBLIC_URL || '';
        // const filePath = `${publicURL}/moonshot_tracker_results.xlsx`;
        // await workbook.xlsx.readFile(filePath);

        const extractedTables = [];

        // Iterate through each sheet in the workbook
        workbook.eachSheet(sheet => {
          // Iterate through each table in the sheet
          sheet.eachTable(table => {
            const tableData = {
              name: table.name,
              rows: [],
            };

            // Iterate through each row in the table
            table.eachRow({ includeEmpty: true }, (row, rowNumber) => {
              const rowData = [];
              row.eachCell({ includeEmpty: true }, cell => {
                rowData.push(cell.value);
              });
              tableData.rows.push(rowData);
            });

            extractedTables.push(tableData);
          });
        });

        setTablesData(extractedTables);
      } catch (err) {
        console.error('Error reading the workbook:', err);
      }
    };

    processWorkbook();
  }, []);

  return (
    <div>
      {tablesData.map((tableData, index) => (
        <div key={index}>
          <h2>Table: {tableData.name}</h2>
          <table>
            <thead>
              <tr>
                {tableData.rows[0].map((header, headerIndex) => (
                  <th key={headerIndex}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExcelTable;
