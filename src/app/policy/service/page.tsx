import PolicyItem from "@/components/policy/policyItem";
import termOfServiceRaw from "@/data/termsOfService.json";
import { PolicyData } from "@/types/policy";
import style from "../policy.module.scss";

const termOfService = termOfServiceRaw as PolicyData[];

export default function Page() {
  return (
    <section className={style.policy_section}>
      <h2 className={style.title}>서비스 이용 약관</h2>

      <ol className={style.policy_list}>
        {termOfService.map((item) => (
          <PolicyItem key={item.id} {...item} />
        ))}
      </ol>
    </section>
  );
}
