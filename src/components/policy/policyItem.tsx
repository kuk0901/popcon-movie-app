import { PolicyData } from "@/types/policy";
import style from "./policy-item.module.scss";

export default function PolicyItem(item: Readonly<PolicyData>) {
  const processedContent = Object.entries(item.content).map(([key, value]) => ({
    key,
    value,
    isNumeric: !isNaN(parseInt(key))
  }));

  return (
    <li className={style.policy_item}>
      <h3>{item.title}</h3>
      <ul className={style.policy_list}>
        {processedContent.map((item, index) => (
          <li key={index} className={style.policy_list_item}>
            - {!item.isNumeric && <span>{item.key}: </span>}
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
