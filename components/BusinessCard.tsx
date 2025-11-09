import React from 'react';
import { Business, Category } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { TrashIcon } from './icons/TrashIcon';

interface BusinessCardProps {
  business: Business;
  onDeleteRequest: (business: Business) => void;
}

const categoryColors: Record<Category, string> = {
  [Category.RESTAURANT]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  [Category.RETAIL]: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  [Category.SERVICE]: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onDeleteRequest }) => {
  const { name, category, location, description } = business;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/40 hover:-translate-y-1 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[category]}`}>
            {category}
          </span>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-indigo-400 mb-4 group/link"
        >
          <LocationMarkerIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="underline decoration-dotted underline-offset-2 group-hover/link:no-underline">{location}</span>
        </a>
        
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="bg-gray-700/20 px-5 py-3 flex justify-end items-center border-t border-gray-700/50">
          <button
              onClick={() => onDeleteRequest(business)}
              className="transition-colors duration-300 flex items-center gap-2 text-sm text-gray-500 hover:text-red-400"
              aria-label={`Delete ${name}`}
          >
              <TrashIcon className="w-4 h-4"/>
              Delete
          </button>
      </div>
    </div>
  );
};