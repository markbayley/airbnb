import Image from "next/image";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export default function ChatPropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[280px]">
      {/* Image */}
      <div className="relative h-40 w-full">
        <Image
          src={property.img[0]}
          alt={property.title}
          fill
          className="object-cover"
          sizes="280px"
        />
        {property.petsAllowed === "yes" && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            🐾 Pet Friendly
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Location & Rating */}
        <div className="flex items-start justify-between mb-1">
          <p className="text-xs text-gray-500 font-medium">{property.location}</p>
          <div className="flex items-center space-x-1">
            <StarIcon className="h-3 w-3 text-red-500" />
            <span className="text-xs font-semibold">{property.star}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
          {property.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-2 line-clamp-1">
          {property.description}
        </p>

        {/* Price & Features */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-sm font-bold text-gray-900">${property.price}</span>
            <span className="text-xs text-gray-500"> / night</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            {property.freeCancelation === "yes" && (
              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded">
                Free cancel
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => {
            // Navigate to search page with this property's location
            window.location.href = `/search?city=${property.location}`;
          }}
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
