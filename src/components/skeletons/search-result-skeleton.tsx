import ImageSkeleton from "./image-skeleton";
import style from "./skeleton.module.scss";
import TextSkeleton from "./text-skeleton";

export default function SearchResultSkeleton() {
  return (
    <ul className={style.search_result_list}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li key={idx} className={style.search_result_item}>
          <ImageSkeleton />
          <TextSkeleton />
        </li>
      ))}
    </ul>
  );
}
