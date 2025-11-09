import React, { useState, useMemo } from 'react';
import { Business, Category } from './types';
import { Header } from './Header';
import { CategoryFilter } from './CategoryFilter';
import { BusinessCard } from './BusinessCard';
import { PlusIcon } from './PlusIcon';

// --- Delete Confirmation Modal Component ---
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  businessName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  businessName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-white mb-4">Confirm Deletion</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <span className="font-semibold text-indigo-400">{businessName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Add Business Modal Component ---
interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newBusiness: Omit<Business, 'id'>) => void;
}

const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>(Category.RESTAURANT);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCancel = () => {
    setName('');
    setCategory(Category.RESTAURANT);
    setLocation('');
    setDescription('');
    setPhone('');
    setWebsite('');
    setError('');
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim() || !location.trim() || !description.trim()) {
      setError('Name, location, and description are required fields.');
      return;
    }
    onAdd({ 
        name, 
        category, 
        location, 
        description, 
        phone: phone.trim() || undefined,
        website: website.trim() || undefined
    });
    handleCancel();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-white mb-6">Add New Business</h2>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 p-2 rounded-md">{error}</p>}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Business Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
             <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number (Optional)</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
             <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">Website URL (Optional)</label>
              <input type="url" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">Add Business</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Initial Data ---
const initialBusinesses: Business[] = [
  {
    id: 1,
    name: 'Gourmet Grove',
    category: Category.RESTAURANT,
    location: '123 Culinary Lane, Foodville, FV 54321',
    description: 'A modern eatery offering the best farm-to-table dishes in a cozy atmosphere.',
    phone: '555-0101',
    website: 'https://gourmetgrove.example.com'
  },
  {
    id: 2,
    name: 'The Artisan Shelf',
    category: Category.RETAIL,
    location: '456 Market St, Shopsville, SV 67890',
    description: 'Curated collection of handcrafted goods and unique gifts from local artisans.',
    website: 'https://artisanshelf.example.com'
  },
  {
    id: 3,
    name: 'Innovate Solutions',
    category: Category.SERVICE,
    location: '789 Tech Park, Silicon City, SC 10111',
    description: 'Cutting-edge software development and IT consulting services for businesses.',
    phone: '555-0103',
    website: 'https://innovatesolutions.example.com'
  },
  {
    id: 4,
    name: 'Sunrise Cafe',
    category: Category.RESTAURANT,
    location: '101 Morning Ave, Dawn City, DC 12131',
    description: 'The perfect spot for breakfast and brunch, serving classic dishes with a twist.',
    phone: '555-0104',
  },
  {
    id: 5,
    name: 'City Threads',
    category: Category.RETAIL,
    location: '212 Fashion Blvd, Metroburg, MB 14151',
    description: 'Trendy apparel and accessories for the modern urbanite. Style that speaks.',
  },
  {
    id: 6,
    name: 'QuickFix Auto',
    category: Category.SERVICE,
    location: '313 Mechanic Rd, Gear Town, GT 16171',
    description: 'Reliable and efficient auto repair services. We get you back on the road fast.',
    phone: '555-0106',
    website: 'https://quickfixauto.example.com'
  },
];

// --- Main App Component ---
const App: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [businessToDelete, setBusinessToDelete] = useState<Business | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDeleteRequest = (business: Business) => {
    setBusinessToDelete(business);
  };

  const handleConfirmDelete = () => {
    if (businessToDelete) {
      setBusinesses(prev => prev.filter(business => business.id !== businessToDelete.id));
      setBusinessToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setBusinessToDelete(null);
  };
  
  const handleAddBusiness = (newBusinessData: Omit<Business, 'id'>) => {
    const newBusiness: Business = {
      id: Date.now(), // Use timestamp for a simple unique ID
      ...newBusinessData
    };
    setBusinesses(prev => [newBusiness, ...prev]);
  };

  const filteredBusinesses = useMemo(() => {
    if (activeCategory === 'all') {
      return businesses;
    }
    return businesses.filter(business => business.category === activeCategory);
  }, [businesses, activeCategory]);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Business Directory</h1>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
                <PlusIcon className="w-5 h-5" />
                Add Business
            </button>
        </div>
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          onFilterChange={setActiveCategory} 
        />

        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredBusinesses.map(business => (
              <BusinessCard 
                key={business.id} 
                business={business} 
                onDeleteRequest={handleDeleteRequest} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No businesses found in this category.</p>
          </div>
        )}
      </main>

      <DeleteConfirmationModal 
        isOpen={!!businessToDelete}
        businessName={businessToDelete?.name || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBusiness}
      />
    </div>
  );
};

export default App;
