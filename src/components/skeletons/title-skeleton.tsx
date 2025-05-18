import style from "./skeleton.module.scss";

export default function TitleSkeleton() {
  return <div className={`${style.skeleton} ${style.title_skeleton}`}></div>;
}
