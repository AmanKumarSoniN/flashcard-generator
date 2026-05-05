import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFlashcard } from "../redux/flashcardSlice";


import FlashcardForm from "../components/FlashcardForm/FlashcardForm";
import TermForm from "../components/TermForm/TermForm";

const FlashcardSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  terms: Yup.array().of(
    Yup.object().shape({
      term: Yup.string().required("Required"),
      definition: Yup.string().required("Required"),
    })
  ),
});

const CreateFlashcard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Create Flashcard</h1>

      <Formik
        initialValues={{
          title: "",
          description: "",
          image: null,
          terms: [{ id: uuidv4(), term: "", definition: "", image: null }],
        }}
        validationSchema={FlashcardSchema}
        onSubmit={(values) => {
          dispatch(addFlashcard({ ...values, id: uuidv4() }));
          navigate("/my-flashcards");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">

            <FlashcardForm setFieldValue={setFieldValue} values={values} />

            <div className="bg-white p-6 shadow-md rounded-md">
              <FieldArray name="terms">
                {({ push, remove }) => (
                  <div>
                    {values.terms.map((term, index) => (
                      <TermForm
                        key={term.id}
                        index={index}
                        remove={remove}
                        showDelete={values.terms.length > 1}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ id: uuidv4(), term: "", definition: "", image: null })}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      + Add More
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="flex justify-center pb-10">
              <button type="submit" className="bg-red-600 text-white px-10 py-2 rounded-md font-bold hover:bg-red-700">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFlashcard;