<div className="relative z-10 w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
  {/* Central Line */}
  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700 rounded-full z-0"></div>

  {educationItems.map((item, index) => (
    <div
      key={item.id}
      onClick={() => setSelectedItem(item)}
      className={`relative flex flex-col sm:flex-row cursor-pointer
                  ${index === educationItems.length - 1 ? "mb-0" : "mb-12 sm:mb-16"}`}
    >
      {/* Year */}
      <div
        className={`absolute top-0 z-20 
          ${index % 2 === 0 ? "left-[calc(50%+1.5rem)] text-left" : "right-[calc(50%+1.5rem)] text-right"}`}
      >
        <span className="text-orange-300 text-xs sm:text-sm font-semibold whitespace-nowrap px-2 py-0.5 bg-black/70 rounded">
          {item.year}
        </span>
      </div>

      {/* Dot */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 
                   rounded-full bg-orange-500 border-2 border-orange-300 z-10 flex items-center justify-center"
      >
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse"></div>
      </div>

      {/* Card */}
      <div
        className={`relative w-[80%] sm:w-[42%] p-4 sm:p-6 rounded-lg bg-black/40 border border-gray-700 
                    shadow-lg hover:shadow-orange-500/20 transition-all duration-300 mt-10 sm:mt-0
                    ${index % 2 === 0 ? "ml-auto sm:ml-[55%]" : "mr-auto sm:mr-[55%]"}`}
      >
        <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-1">
          {item.degree}
        </h3>
        {item.subject && (
          <p className="text-gray-200 text-sm sm:text-base mb-1">{item.subject}</p>
        )}
        <p className="text-gray-200 text-sm sm:text-base mb-1">{item.institute}</p>
        <p className="text-gray-400 text-xs sm:text-sm italic">{item.address}</p>
      </div>
    </div>
  ))}
</div>
