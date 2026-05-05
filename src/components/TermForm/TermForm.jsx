import React from "react";
import { Field, ErrorMessage } from "formik";
import { MdDeleteOutline } from "react-icons/md";

const TermForm = ({ index, remove, showDelete }) => (
  <div className="flex flex-col md:flex-row gap-4 items-start mb-6 border-b pb-4 relative">
    <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mt-2">{index + 1}</span>
    <div className="flex-1">
      <Field name={`terms.${index}.term`} placeholder="Term*" className="border-b-2 p-2 w-full outline-none" />
      <ErrorMessage name={`terms.${index}.term`} component="span" className="text-red-500 text-xs" />
    </div>
    <div className="flex-1">
      <Field name={`terms.${index}.definition`} placeholder="Definition*" className="border-b-2 p-2 w-full outline-none" />
      <ErrorMessage name={`terms.${index}.definition`} component="span" className="text-red-500 text-xs" />
    </div>
    {showDelete && (
      <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500 text-2xl">
        <MdDeleteOutline />
      </button>
    )}
  </div>
);

export default TermForm;