import React from 'react';
import ExcelUploader from '../components/Excel-xlsx';
import Link from 'next/link';

const ExcelData = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white p-4 shadow flex justify-between">
        <div>
        <Link href="/">
          <h1 className="text-lg font-sans">Platform Demo (Pandas AI)</h1>
        </Link>
        </div>
        <div>
        <Link href="/excel">
          <h3 className="text-lg font-sans">Excel Data</h3>
        </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex pt-24 items-center justify-center">
        <div className="w-full max-w-screen-lg  min-h-screen  p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Excel Data</h2>
          <ExcelUploader />
        </div>
      </div>
    </div>
  );
};

export default ExcelData;
