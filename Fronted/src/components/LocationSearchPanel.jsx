import React from "react";

const LocationSearchPanel = ({
  suggestions,
  isLoadingSuggestions,
  activeField,
  onSuggestionSelect,
}) => {
  if (isLoadingSuggestions) {
    return (
      <div className="py-4 text-center text-sm text-gray-500">
        Searching {activeField} suggestions...
      </div>
    );
  }

  if (!suggestions.length) {
    return (
      <div className="py-4 text-center text-sm text-gray-500">
        Type at least 3 letters to get location suggestions.
      </div>
    );
  }

  return (
    <div>
      {suggestions.map(function (elem, idx) {
        return (
          <div
            key={elem.place_id || idx}
            onClick={() => {
              onSuggestionSelect(elem.description);
            }}
            className="flex gap-4 border-2 p-3  border-gray-50 active:border-black rounded-xl  my-2  items-center justify-start"
          >
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-line "></i>
            </h2>
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;

// import React from "react";

// const LocationSearchPanel = ({ suggestions = [], loading, onSelect }) => {
//   return (
//     <div>
//       {loading && (
//         <p className="text-center text-gray-400 py-4 text-sm">Searching...</p>
//       )}

//       {!loading && suggestions.length === 0 && (
//         <p className="text-center text-gray-400 py-4 text-sm">
//           Start typing to see suggestions
//         </p>
//       )}

//       {suggestions.map((elem, idx) => (
//         <div
//           key={idx}
//           onClick={() => onSelect(elem)}
//           className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start cursor-pointer"
//         >
//           <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
//             <i className="ri-map-pin-line"></i>
//           </h2>
//           <h4 className="font-medium">{elem}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocationSearchPanel;
