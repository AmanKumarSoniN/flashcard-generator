import React from "react"; 
import { Field, ErrorMessage } from "formik";

const FlashcardForm = ({ setFieldValue, values }) => {
  return (<div className="bg-white p-4 md:p-6 shadow-md rounded-md mb-8"> <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="font-medium text-gray-600 mb-1">Create Group*</label>
      <Field name="title" placeholder="Enter Group Name" className="border-2 border-gray-200 p-2 rounded focus:border-blue-500 outline-none" />
      <ErrorMessage name="title" component="span" className="text-red-500 text-sm" />
    </div>
    <div className="flex flex-col">
      <label className="font-medium text-gray-600 mb-1">Upload Image</label>
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files[0]; if (file) {
          const reader = new FileReader();
          reader.onload = () => setFieldValue("image", reader.result); reader.readAsDataURL(file);
        }
      }} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
    </div>
  </div>
    <div className="mt-4 flex flex-col">
      <label className="font-medium text-gray-600 mb-1">Add Description</label>
      <Field as="textarea" name="description" rows="3" placeholder="Describe the deck..." className="border-2 border-gray-200 p-2 rounded outline-none focus:border-blue-500" />
      <ErrorMessage name="description" component="span" className="text-red-500 text-sm" />
    </div> </div>);
};

export default FlashcardForm;