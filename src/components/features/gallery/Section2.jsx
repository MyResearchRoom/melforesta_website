import React from 'react'
import { G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, G11, G12} from "../../../assets/gallery/index"
const galleryData = [
  { id: 1, src: G1, alt: "Gallery 1" },
  { id: 2, src: G2, alt: "Gallery 2",  },
  { id: 3, src: G3, alt: "Gallery 3",  },
  { id: 4, src: G4, alt: "Gallery 4",  },
  { id: 5, src: G5, alt: "Gallery 5",  },
  { id: 6, src: G6, alt: "Gallery 6",  },
  { id: 7, src: G7, alt: "Gallery 7",  },
  { id: 8, src: G8, alt: "Gallery 8",  },
  { id: 9, src: G9, alt: "Gallery 9",  },
  { id: 10, src: G10, alt: "Gallery 10", },
  { id: 11, src: G11, alt: "Gallery 11", },
  { id: 12, src: G12, alt: "Gallery 12", },
];
export default function Section2  () {
  return (
    <section>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {galleryData.map((item) => (
        <div key={item.id} className={`overflow-hidden rounded-lg md:col-span-1`}>
          <img 
            src={item.src} 
            alt={item.alt} 
            className="w-full h-64 object-cover hover:opacity-90 transition-opacity" 
          />
        </div>
      ))}
    </div>
    </section>
  )
}

