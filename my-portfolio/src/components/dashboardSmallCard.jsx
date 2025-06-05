function dashboardSmallCard({ icon, bg_color, title, number, col_span = 1 }) {
  const bg_color_lowercase = bg_color.toLowerCase();
  return (
    <div className={`card shadow-xl rounded bg-white p-3 col-span-${col_span}`}>
      <div className="card-header mb-8">
        <div
          className={`rounded-full bg-${bg_color_lowercase}-300 w-[50px] h-[50px] flex items-center justify-center text-slate-800`}
        >
          {icon}
        </div>
      </div>
      <div className="card-body">
        <h2 className="text-gray-400">{title}</h2>
        <p className="text-2xl">{number}</p>
      </div>
    </div>
  );
}

export default dashboardSmallCard;
