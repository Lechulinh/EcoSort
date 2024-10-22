import Image from "next/image";
import data from "../../../assets/data.json";
export default function Home({ params }) {
  const lv = data.find((lv) => Number(lv.level) === Number(params.id));
  return (
    <main className="playScreen">
      <Image src={require(`../../../assets/images/objects/${lv?.image}`)} alt={lv.item} width={80} height={120} />
      <br />
      {
        lv.trashbin.map((trash)=>{
            return <div key={trash}>{trash}</div>
        })
      }
    </main>
  );
}
