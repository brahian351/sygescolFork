"use client";
import Select from "react-select";

const Forder = () => {
  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div
              className="
     max-w-[525px]
     mx-auto
     text-center
     bg-white
     rounded-lg
     relative
     overflow-hidden
     py-16
     px-10
     sm:px-12
     md:px-[60px]
     "
            >
              <form>
                <div className="mb-6">
                  <p>Grados</p>
                  <Select />
                </div>
                <div className="mb-6">
                  <p>Asignaturas</p>

                  <Select />
                </div>
                <div className="mb-6">
                  <p>Periodo</p>

                  <Select />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forder;
