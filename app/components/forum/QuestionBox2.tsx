const QuestionBox2 = () => {
  return (
    <>
      <hr className="my-4 mx-8" />
      <div className="flex flex-col gap-3 px-8 mt-4">
        <textarea
          title="add new forum"
          name="message"
          id="message"
          rows={4}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
        <div>
          <button
            type="submit"
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Responder
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionBox2;
