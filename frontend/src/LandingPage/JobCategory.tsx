import { Carousel } from '@mantine/carousel';
import { jobCategory } from "../Data/Data";

function JobCategory() {
  return (
    <div className="pb-5 mt-20">
      <div className="text-center text-4xl font-semibold mb-10 text-mine-shaft-100">
        Browse<span className="text-bright-sun-400"> Jobs </span>Category
      </div>
      <div className="text-lg mb-10 text-mine-shaft-300 text-center w-1/2 mx-auto">
        Explore amazing job opportunities tailored to your skills. Start your Journey today.
      </div>
      <Carousel slideSize="22%" slideGap="md" loop>
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            <div className="flex flex-col items-center w-64 gap-2 border p-5 rounded-xl hover:cursor-pointer hover:shadow-xl border-bright-sun-400">
              <div className="p-2 bg-bright-sun-300 rounded-full">
                <img
                  className="h-8 w-8"
                  src={`/Category/${category.name}.png`}
                  alt={`${category.name}`}
                />
              </div>
              <div className="text-mine-shaft-300 text-xl font-semibold">{category.name}</div>
              <div className="text-sm text-center text-mine-shaft-300">{category.desc}</div>
              <div className="text-bright-sun-300 text-lg">{category.jobs}</div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default JobCategory;
