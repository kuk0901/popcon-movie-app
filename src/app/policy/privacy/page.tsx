import PolicyItem from "@/components/policy/policyItem";
import { PolicyData } from "@/types/policy";
import privacyPolicyRaw from "@/data/privacyPolicy.json";
import style from "../policy.module.scss";

const privacyPolicy = privacyPolicyRaw as PolicyData[];

export default function Page() {
  return (
    <>
      <h2 className={style.title}>개인정보 처리방침</h2>

      <ol className={style.policy_list}>
        {privacyPolicy.map((item) => (
          <PolicyItem key={item.id} {...item} />
        ))}
      </ol>
    </>
  );
}
