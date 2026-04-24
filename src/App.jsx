import { scaleLinear, scaleBand } from "d3";

const width = 750; // كان 650
const height = 500; // كان 350

// زدنا الهوامش قليلاً لتتناسب مع الحجم الجديد
const margin = { top: 100, right: 60, bottom: 60, left: 40 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];

function App() {
  // المقاييس (Scales)
  const xScale = scaleLinear().domain([0, 55]).range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map((d) => d.name))
    .range([innerHeight, 0]) // من الأسفل للأعلى
    .padding(0.3);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "#f8f9fa", // خلفية هادئة للصفحة
      }}
    >
      <svg
        width={width}
        height={height}
        style={{
          background: "white",
          // borderRadius: "12px",
          // boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        }}
      >
        {/* الحاوية الرئيسية (إزاحة بمقدار الهوامش) */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* العنوان الرئيسي: محاذاة لليسار مع بداية الرسم */}
          {/* 1. الخط الأحمر: يبدأ من 0 (يعني محاذي لبداية التايتل والبارات) */}
          <line
            x1={0}
            y1={-80} // رفعه للأعلى فوق التايتل
            x2={540} // الطول اللي طلبته
            y2={-80}
            stroke="#e74c3c"
            strokeWidth={1}
          />

          {/* 2. المستطيل الأحمر: يبدأ من نفس الـ x والـ y */}
          <rect x={0} y={-80} width={36} height={10} fill="#e74c3c" />
          <text
            x={0}
            y={-50}
            textAnchor="start"
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fill: "#000000",
            }}
          >
            Escape artists
          </text>

          {/* العنوان الفرعي */}
          <text
            x={0}
            y={-30}
            textAnchor="start"
            style={{
              fontSize: "14px",
              fontFamily: "sans-serif",
              fill: "#000000",
            }}
          >
            Number of laboratory-acquired infections, 1970-2021
          </text>
          <text
            x={0}
            y={innerHeight + 10}
            textAnchor="start"
            style={{
              fontSize: "11px",
              fontFamily: "sans-serif",
              fill: "#7f8c8d",
            }}
          >
            <tspan x={0} dy="0">
              Sources: Laboratory-Acquired Infection Database; American
              Biological Safety Association
            </tspan>
            <tspan x={0} dy="1.2em">
              The Economist
            </tspan>
            {/* dy تعني إزاحة عمودية بالنسبة للسطر السابق */}
          </text>

          {/* رسم خطوط الشبكة (Grid) والأرقام */}
          {xScale.ticks(11).map((tick) => (
            <g key={tick}>
              <line
                x1={xScale(tick)}
                x2={xScale(tick)}
                y1={0}
                y2={innerHeight}
                stroke={tick === 0 ? "#2c3e50" : "#ececec"}
                // strokeWidth={tick === 0 ? 2 : 1}
              />
              <text
                x={xScale(tick)}
                y={-8}
                textAnchor="middle"
                style={{
                  fontSize: "12px",
                  fill: "#95a5a6",
                  fontFamily: "sans-serif",
                  // fontWeight: "bold",
                }}
              >
                {tick}
              </text>
            </g>
          ))}

          {/* رسم الأعمدة (Bars) والأسماء */}
          {data.map((d, i) => {
            const barWidth = xScale(d.count);
            const textSpace = 100; // المساحة التقريبية للنص
            const isTooShort = barWidth < textSpace;

            return (
              <g key={i}>
                <rect
                  x={0}
                  y={yScale(d.name)}
                  width={barWidth}
                  height={yScale.bandwidth()}
                  fill="#076fa2"
                  // rx={3} // حواف ناعمة
                  // style={{ transition: "all 0.3s" }}
                />
                <text
                  x={isTooShort ? barWidth + 8 : 8}
                  y={yScale(d.name) + yScale.bandwidth() / 2}
                  fill={isTooShort ? "#076fa2" : "white"}
                  alignmentBaseline="central"
                  style={{
                    fontSize: "12px",
                    // fontWeight: "600",
                    pointerEvents: "none",
                    fontFamily: "sans-serif",
                  }}
                >
                  {d.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default App;
