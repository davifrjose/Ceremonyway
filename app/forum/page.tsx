import { ForumHeader } from "./header";

export default function Forum() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ForumHeader />
      <hr className="my-4" />
      <section>
        <div>
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  <a href="#" className="hover:underline">
                    Ana
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  <a href="#" className="hover:underline">
                    December 9 at 11:43 AM
                  </a>
                </p>
              </div>
            </div>
            <button>Ver respostas</button>
          </div>

          <div>
            <p className="mt-2 text-sm">
            Boa noite. Gostaria de saber, mais ou menos quanto tempo demora a noiva para se preparar..cabelo make vestir etc. Obrigada desde já
            </p>
          </div>
        </div>

        <div className="px-8 mt-8">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://avatars.githubusercontent.com/u/59426856?v=4"
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                <a href="#" className="hover:underline">
                  João Amadeu
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a href="#" className="hover:underline">
                  December 9 at 11:43 AM
                </a>
              </p>
            </div>
          </div>

          <p className="mt-2 text-sm px-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            voluptatem deserunt ab reiciendis! Perferendis sit delectus neque
            magnam, nisi accusantium consectetur corporis labore repellendus
            aliquid incidunt, aspernatur iure. Provident, esse?
          </p>
        </div>

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
      </section>
    </div>
  );
}
