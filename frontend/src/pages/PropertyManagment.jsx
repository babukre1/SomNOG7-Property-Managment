import React from "react";

const PropertyManagment = () => {
  return (
    <div>
      <div className="w-full my-8">
        <div className="w-[650px] bg-white h-screen m-auto">
          <div className="flex justify-between w-full">
            <h1>Add User</h1>
          </div>
          {/* Subjects and Marks */}
          <table className="w-full text-sm mt-8">
            <thead>
              <tr>
                <th className="p-1 text-base border border-black">Serial</th>
                <th className="p-1 text-base border border-black w-[30%] text-left">
                  Subjects
                </th>
                <th className="p-1 text-base border border-black">Monthly 1</th>
                <th className="p-1 text-base border border-black">Midterm</th>
                <th className="p-1 text-base border border-black">Monthly 2</th>
                <th className="p-1 text-base border border-black">Final</th>
                <th className="p-1 text-base border border-black">Marks</th>
              </tr>
            </thead>
            <tbody className="text-center text-base">
              {marks.map((subject, index) => (
                <tr key={index}>
                  <td className="p-3 border border-black">{index + 1}</td>
                  <td className="p-3 border border-black text-left">
                    {subject.name}
                  </td>
                  <td className="p-3 border border-black">
                    {subject.monthly1}
                  </td>
                  <td className="p-3 border border-black">{subject.midterm}</td>
                  <td className="p-3 border border-black">
                    {subject.monthly2}
                  </td>
                  <td className="p-3 border border-black">{subject.final}</td>
                  <td className="p-3 border border-black">
                    {subject.monthly1 +
                      subject.midterm +
                      subject.monthly2 +
                      subject.final}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagment;
