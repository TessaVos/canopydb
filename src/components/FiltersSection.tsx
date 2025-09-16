import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Manufacturer } from '../types';

interface FiltersSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedManufacturer: string;
  setSelectedManufacturer: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showOnlyCurrentProduction: boolean;
  setShowOnlyCurrentProduction: (checked: boolean) => void;
  showOnlySafeCanopies: boolean;
  setShowOnlySafeCanopies: (checked: boolean) => void;
  manufacturersData: Manufacturer[];
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedManufacturer,
  setSelectedManufacturer,
  selectedCategory,
  setSelectedCategory,
  showOnlyCurrentProduction,
  setShowOnlyCurrentProduction,
  showOnlySafeCanopies,
  setShowOnlySafeCanopies,
  manufacturersData
}) => {
  const categoryLabels = {
    '1': 'Category 1 (Beginner)',
    '2': 'Category 2 (Novice)',
    '3': 'Category 3 (Intermediate)',
    '4': 'Category 4 (Advanced)',
    '5': 'Category 5 (Expert)',
    '6': 'Category 6 (Elite)',
    '7': 'Category 7 (Pro)'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <Filter className="w-5 h-5 inline mr-2" />
        Filters
      </h3>
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Canopies
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or manufacturer..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Manufacturer Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manufacturer
          </label>
          <select
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Manufacturers</option>
            {manufacturersData
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(manufacturer => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
          </select>
        </div>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Level Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {/* Production Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="currentProduction"
            checked={showOnlyCurrentProduction}
            onChange={(e) => setShowOnlyCurrentProduction(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="currentProduction" className="ml-2 text-sm text-gray-700">
            Current production only
          </label>
        </div>
        {/* Safety Guidelines */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="safeCanopies"
            checked={showOnlySafeCanopies}
            onChange={(e) => setShowOnlySafeCanopies(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="safeCanopies" className="ml-2 text-sm text-gray-700">
            Show only canopies that meet safety guidelines
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
