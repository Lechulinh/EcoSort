import data from "../../assets/data.json";

export default function Home() {
  return (
    <main className="menuScreen">
      <a className="homeBtn" href="/"> Quay lại</a>
      <div className="menuLevel">
      <ul>
        {data.map((level) => {
          return (
            <li key={level.level}>
              <a href={`/play/${level.level}`}>LV {level.level}</a>
            </li>
          );
        })}
      </ul>
      </div>
    </main>
  );
}
