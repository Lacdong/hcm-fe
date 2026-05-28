import { galleryData } from "../../data/galleryData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function GallerySection() {
  return (
    <section id="gallery" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label="Gallery"
          title="Hình ảnh tư liệu"
          description="Không gian trưng bày các hình ảnh tiêu biểu về cuộc đời, hành trình, hoạt động cách mạng và di sản của Chủ tịch Hồ Chí Minh."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {galleryData.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-[#fffaf0] p-0">
              <div className="aspect-[4/3] overflow-hidden bg-red-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="rounded-full bg-yellow-700/10 px-3 py-1 text-xs font-semibold text-yellow-800">
                  {item.category}
                </span>

                <h3 className="mt-4 text-xl font-bold text-red-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
