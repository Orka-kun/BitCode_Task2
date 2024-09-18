import "../index.css";
import { useState } from 'react';
import axios from 'axios';
import logo from '/src/assets/Bit-Code-Technologies-FZ-LLC.png'

const ReportGenerator = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const generateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/generate-report');
      setReport(response.data);
    } catch (err) {
      setError('Error generating report');
    }
  };

  return (
    <div className=''>
    <div className="font-serif flex flex-col">
    <img className="w-52 mx-auto py-8" src={logo}/>
    <h1 className="text-5xl flex justify-center">Bit Code Technologies</h1>

    <h1 className="text-3xl flex justify-center py-2">Task 2 : (Report Database Table)</h1>
      <button className="bg-red-950 text-lg text-white p-3 rounded-md mx-auto my-5" onClick={generateReport}>Generate Report</button>
    </div>
      {error && <p>{error}</p>}
      {report && (
        <div className="flex justify-center items-center py-10 px-56">
  <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-bold  text-red-950 uppercase tracking-wider">Product Name</th>
        <th className="px-6 py-3 text-left text-sm font-bold text-red-950 uppercase tracking-wider">Customer Name</th>
        <th className="px-6 py-3 text-left text-sm font-bold text-red-950 uppercase tracking-wider">Quantity</th>
        <th className="px-6 py-3 text-left text-sm font-bold text-red-950 uppercase tracking-wider">Price</th>
        <th className="px-6 py-3 text-left text-sm font-bold text-red-950 uppercase tracking-wider">Total</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {report.data.map((row, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">{row['Product Name']}</td>
          <td className="px-6 py-4 whitespace-nowrap">{row['Customer Name']}</td>
          <td className="px-6 py-4 whitespace-nowrap">{row.Quantity}</td>
          <td className="px-6 py-4 whitespace-nowrap">{row.Price}</td>
          <td className="px-6 py-4 whitespace-nowrap">{row.Total}</td>
        </tr>
      ))}
    </tbody>
    <tfoot className="bg-gray-100">
      <tr>
        <td colSpan="2" className="px-6 py-3 text-base- text-left font-bold text-red-950">Gross Total:</td>
        <td className="px-6 py-3 ">{report.totals.quantity}</td>
        <td className="px-6 py-3 ">{report.totals.price}</td>
        <td className="px-6 py-3 ">{report.totals.grossTotal}</td>
      </tr>
    </tfoot>
  </table>
</div>

      )}
    </div>
  );
};

export default ReportGenerator;
