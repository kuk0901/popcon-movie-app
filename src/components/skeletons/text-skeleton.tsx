import style from "./skeleton.module.scss";

export default function TextSkeleton() {
  return <div className={`${style.skeleton} ${style.text_skeleton}`}></div>;
}
