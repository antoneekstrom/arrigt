import { DataPrivacyAgreement } from "arrigt-backend/src/model/privacypolicy";
import { useFormContext, UseFormRegister, useFormState } from "react-hook-form";
import { agreementTemplate } from "../privacypolicy/template";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";
import { getInputStateIntent, useInputStateIntent } from "./InputField";

export type PrivacyPolicyProps = {
  agreement: DataPrivacyAgreement;
};

export function PrivacyPolicy({ agreement }: PrivacyPolicyProps) {
  const { register } = useFormContext();
  const intent = useInputStateIntent("gdpr");

  return (
    <Card classNameInFront="p-6" className={`${intent}`}>
      <h1 className="text-md font-medium">Data privacy agreement</h1>
      <div className="mt-2 flex flex-col gap-2">
        {agreementTemplate(agreement)
          .filter((paragraph) => paragraph.length > 0)
          .map((paragraph) => (
            <p className="text-sm">{paragraph}</p>
          ))}
      </div>
      <div className="mt-6">
        <Checkbox
          {...register("gdpr", {
            required: {
              value: true,
              message: "Du måste acceptera data integritets avtalet.",
            },
          })}>
          I accept the agreement
        </Checkbox>
      </div>
    </Card>
  );
}
