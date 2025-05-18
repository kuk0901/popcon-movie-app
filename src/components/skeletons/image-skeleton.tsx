import style from "./skeleton.module.scss";

export default function ImageSkeleton() {
  return <div className={`${style.skeleton} ${style.image_skeleton}`}></div>;
}
